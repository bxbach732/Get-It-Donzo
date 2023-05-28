import React from 'react';
import { useState } from 'react';
import authService from '../services/auth'
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate();

    const handleRegister = async (event) => {
        try {
            event.preventDefault();

            const user = await authService.register({
                name, email, password,
            });
            setName('');
            setEmail('');
            setPassword('');
            navigate("/login");
        } catch(error) {
            setErrorMessage('Registration failed. Please try again!')
            setTimeout(() => {
                setErrorMessage(null);
            }, 4000)
            console.log(error);
        }
    }

    return (
        <div>
            <Notification message={errorMessage} type={"error"}/>
            <h1>Register</h1>
            <form>
                <input 
                    placeholder='username' 
                    value={name} onChange={(event) => setName(event.target.value)}
                /> <br />
                <input 
                    placeholder='email' 
                    value={email} onChange={(event) => setEmail(event.target.value)}
                /> <br />
                <input 
                    type='password'
                    placeholder='password'
                    value={password} onChange={(event) => setPassword(event.target.value)}
                /> <br />
                <button onClick={handleRegister}>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage;