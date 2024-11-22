import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersReferralList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchUsersWithReferrals = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:8000/api/auth/alllist', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        
        setUsers(response.data.data);
        
        // setError('Failed to load users');
      
      } finally {
        setLoading(false);
      }
    };

    fetchUsersWithReferrals();
  }, []); 
  const renderReferrals = (referrals) => {
    if (referrals.length === 0) return <p>No referrals.</p>;

    return (
      <ul>
        {referrals.map((referral, index) => (
          <li key={index}>
            <strong>{referral.username}</strong> ({referral.email})
            <div style={{ marginLeft: '20px' }}>
              {renderReferrals(referral.referrals)}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Users and their Referrals</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <h3>{user.username}</h3>
              <p>Email: {user.email}</p>
              <div>
                <h4>Referrals:</h4>
                {renderReferrals(user.referrals)} 
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersReferralList;
