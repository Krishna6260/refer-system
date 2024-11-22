import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';

const Main = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState('');
    const [link, setLink] = useState('');

    const logout = () => {
        localStorage.removeItem('token');
        if (!localStorage.getItem('token')) {
            navigate("/");
        }
    };

    const getDetails = () => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:8000/api/auth/mydetails', {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                setLink(`/register?referralCode=${response.data.referralCode}`);
                setDetails(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div className="container my-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Welcome, {details.username || "User"}!</h2>
                </div>
                <div className="card-body">
                    <h4 className="card-title">Your Details</h4>
                    <ul className="list-group mb-4">
                        <li className="list-group-item">
                            <strong>Email:</strong> {details.email || "N/A"}
                        </li>
                        <li className="list-group-item">
                            <strong>Referral Code:</strong> {details.referralCode || "N/A"}
                        </li>
                    </ul>
                    <div>
                        <h4>Your Referral Link</h4>
                        <p>
                            Share this link with your friends:{" "}
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                Referral Link
                            </a>
                        </p>
                    </div>
                    <h5>Referrals</h5>
                    {details.referrals?.length > 0 ? (
                        <ul className="list-group">
                            {details.referrals.map((item, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>{item.username}</strong> - {item.email}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No referrals yet.</p>
                    )}
                </div>
                <div className="card-footer text-center">
                    <button
                        className="btn btn-danger btn-lg"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Main;
