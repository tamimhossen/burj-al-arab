import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Tamim from './Components/Tamim/Tamim';
import Book from './Components/Book/Book';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    email: '',
    name: '',
    error: '',
    success: false,
    isActive: false,
    password: ''
  });
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {loggedInUser.success && <p>Name: {loggedInUser.name}</p>}
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/tamim">
          <Tamim></Tamim>
        </Route>
        <PrivateRoute path="/book/:bedType">
          <Book></Book>
        </PrivateRoute>
        <Route exact path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;