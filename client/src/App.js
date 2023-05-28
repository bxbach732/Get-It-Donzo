import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'; 
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import authContext from './components/authContext';

const App = () => {
    const [user, setUser] = useState(null);
    const padding = {
        padding: 5
    }

    return (
        <authContext.Provider value={[user, setUser]}>
        <div className='App'>
            <Router>
                <div>
                    <Link style={padding} to="/">home</Link>
                    <Link style={padding} to="/login">login</Link>
                    {!user && <Link style={padding} to="/register">register</Link>}
                </div>
                <Routes>
                    <Route path="/" element={<LandingPage/>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Routes>
            </Router>
        </div>
        </authContext.Provider>
    )
}
export default App