import React from 'react';
import { useParams } from 'react-router-dom';

const ProfileTest: React.FC = () => {
    let { userId } = useParams<{ userId: string }>();

    return (
        <div>
            <h2>User Profile</h2>
            <p>Profile ID: {userId}</p>
            {/* Display user information based on userId */}
        </div>
    );
}

export default ProfileTest;
