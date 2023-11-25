import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ProfileTest from './ProfileTest';
import UserList from './UserList'; // Import UserList component

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/login">Login</Link> |
                    <Link to="/signup">Signup</Link> |
                    <Link to="/users">User List</Link> {/* Link to User List */}
                </nav>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile/:userId" element={<ProfileTest />} />
                    <Route path="/users" element={<UserList />} /> {/* User List route */}
                    {/* other routes */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
