import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'; 
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import authContext from './components/authContext';
import Todos from './components/Todos';
import todoService from './services/todos';

const App = () => {
    const [user, setUser] = useState(null);
    const padding = {
        padding: 5
    }

    useEffect(() => {
        const loggedTodoUser = window.localStorage.getItem('loggedTodoUser')
        if (loggedTodoUser) {
          const user = JSON.parse(loggedTodoUser)
          setUser(user)
          todoService.setToken(user.token)
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('loggedTodoUser');
    }

    return (
        <authContext.Provider value={[user, setUser]}>
        <div className='App'>
            <Router>
                <div>
                    <Link style={padding} to="/">home</Link>
                    {!user && <Link style={padding} to="/login">login</Link>}
                    {!user && <Link style={padding} to="/register">register</Link>}
                    {user && <Link style={padding} onClick={handleLogout} >logout</Link>}
                    {user && <div> {user.name} logged in</div> }
                </div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Routes>
            </Router>
            {user && <Todos />}
        </div>
        </authContext.Provider>
    )
}
export default App