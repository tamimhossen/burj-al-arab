import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Book = () => {
    const {bedType} = useParams();
    console.log(bedType);
    return (
         <div style={{textAlign: 'center'}}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
        </div>
    );
};

export default Book;