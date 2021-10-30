import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    initializeApp(firebaseConfig);
    
    const provider = new GoogleAuthProvider();
    const handleGoolgeSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const {displayName, email} = result.user;
            const signedInUser = {
                name: displayName,
                email
            }
            setLoggedInUser(signedInUser);
            history.replace(from)
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    const handleSubmit = (e) => {
        if (newUser && loggedInUser.email && loggedInUser.password) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, loggedInUser.email,loggedInUser.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const newUserInfo = {...loggedInUser};
                newUserInfo.error = '';
                newUserInfo.success = true;
                updateUserName(loggedInUser.name)
                setLoggedInUser(newUserInfo);
                console.log("Account created as : ", user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        }

        if (!newUser && loggedInUser.email && loggedInUser.password ) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, loggedInUser.email, loggedInUser.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                const newUserInfo = {...loggedInUser};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        }


        e.preventDefault();
    }


    const updateUserName = name => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: name})
            .then(() => {
            console.log("profile updated successfully");
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
           isFieldValid =  /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
            // console.log(isFieldValid);
         }

         if (isFieldValid) {
             const newUserInfo = {...loggedInUser};
             newUserInfo[e.target.name] = e.target.value;
             setLoggedInUser(newUserInfo)
         }
    }

    // console.log(loggedInUser.email, loggedInUser.password);

    // console.log(newUser);

    return (
        <div className="login">
            <h2>This is login</h2>
            <button onClick={handleGoolgeSignIn}> <GoogleIcon /> Google Sign In</button>

            <br/>
            <label htmlFor="checkbox">New User</label>
            <input type="checkbox" name="checkbox" onChange={() => setNewUser(!newUser)} id="checkbox"/>
            <form onSubmit={handleSubmit}>
                {
                    newUser && 
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" onBlur={handleBlur} placeholder="Enter Your Name"/>
                    </div>
                }
                <br/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onBlur={handleBlur} placeholder="Enter your email" required/>
                <br/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onBlur={handleBlur} id="password" placeholder="Your password" required/>
                <br/>
                <input type="submit" value="Login"/>
            </form>

            {loggedInUser.success && <p style={{color: 'green'}}>Signed In successfully</p>}

        </div>
    );
};

export default Login;