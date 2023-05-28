import React from 'react';
import { useState, useContext } from 'react';
import authService from '../services/auth';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';
import authContext from './authContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useContext(authContext);
    const visibleCheck = visible ? "text" : "password";

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await authService.login({
                email, password,
            });
            setUser(user);
            setEmail('');
            setPassword('');
            navigate("/");
        } catch(error) {
            setErrorMessage('Logging in failed. Please try again');
              setTimeout(() => {
                setErrorMessage(null);
            }, 4000);
            console.log(error);
        }
    }

    return (
        <div>
            <Notification message={errorMessage} type={"error"}/>
            <h1>Login</h1>
            <form>
                <input 
                    placeholder='email' 
                    value={email} onChange={(event) => setEmail(event.target.value)}
                /> <br/>
                <input 
                    type={visibleCheck}
                    placeholder='password'
                    value={password} onChange={(event) => setPassword(event.target.value)}
                /> <br/>
                Show password
                <input 
                    type="checkbox" onClick={() => setVisible(!visible)} 
                /> <br/>
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default LoginPage;