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
    const [visible, setVisible] = useState(false);
    const visibleCheck = visible ? "text" : "password";

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
            <div>
                <h1>Register</h1>
                <form className='form'>
                    <input 
                        placeholder='username' 
                        value={name} onChange={(event) => setName(event.target.value)}
                    /> <br />
                    <input 
                        placeholder='email' 
                        value={email} onChange={(event) => setEmail(event.target.value)}
                    /> <br />
                    <input 
                        type={visibleCheck}
                        placeholder='password'
                        value={password} onChange={(event) => setPassword(event.target.value)}
                    /> <br />
                    <label className={"checkbox-label"}>
                        <input 
                            type="checkbox" className={"checkbox-input"}
                            onClick={() => setVisible(!visible)} 
                        />
                        Show password 
                    </label> <br/>
                    <button onClick={handleRegister}>Register</button>
                </form>
            </div>
            <Notification message={errorMessage} type={"error"}/>
        </div>
    )
}

export default RegisterPage;