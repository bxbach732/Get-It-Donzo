import React from 'react';
import { useContext } from 'react';
import authContext from './authContext';

const LandingPage = () => {
    const [user, setUser] = useContext(authContext);
    return <h1>Hello {user? user.name : ""}</h1>
}

export default LandingPage;