import React from 'react';
import { useState, useContext } from 'react';
import authService from '../services/auth';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';
import authContext from './authContext';
import todoService from '../services/todos';

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
            
            todoService.setToken(user.token);
            window.localStorage.setItem(
                'loggedTodoUser', JSON.stringify(user)
            ) 

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
            <div>
                <h1>Login</h1>
                <form className='form'>
                    <input 
                        placeholder='email' 
                        value={email} onChange={(event) => setEmail(event.target.value)}
                    /> <br/>
                    <input 
                        type={visibleCheck}
                        placeholder='password'
                        value={password} onChange={(event) => setPassword(event.target.value)}
                    /> <br/>
                    <label className={"checkbox-label"}>
                        <input 
                            type="checkbox" className={"checkbox-input"}
                            onClick={() => setVisible(!visible)} 
                        />
                        Show password 
                    </label> <br/>
                    <div>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </form>
            </div> 
            <Notification message={errorMessage} type={"error"}/>
        </div>
    )
}

export default LoginPage;