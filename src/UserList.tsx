import React from 'react';
import { Link } from 'react-router-dom';

const UserList: React.FC = () => {
    const users = [1, 2, 3]; // Example user IDs, replace with real data later

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(userId => (
                    <li key={userId}>
                        <Link to={`/profile/${userId}`}>User {userId}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
