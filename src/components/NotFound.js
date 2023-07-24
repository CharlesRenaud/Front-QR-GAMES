import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = (props) => {

    return (
        <div>
            <h1>404 <br /> <Link to="/">Retour à l'accueil</Link></h1>
        </div>
    );
};

export default NotFound;