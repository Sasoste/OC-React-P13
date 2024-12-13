import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '@redux/authSlice';
import { RootState, AppDispatch } from '@redux/store';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import './SignInForm.scss';

const SignInForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const authError = useSelector((state: RootState) => state.auth.error);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email: username, password }));
    };

    React.useEffect(() => {
        if (authStatus === 'succeeded' && window.location.pathname !== '/user') {
            navigate('/user');
        }
    }, [authStatus, navigate]);

    return (
        <section className="sign-in-content">
            <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    className="input-wrapper"
                    htmlFor="username"
                    type="text"
                    id="username"
                    text="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    className="input-wrapper"
                    htmlFor="password"
                    type="password"
                    id="password"
                    text="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    className="input-remember"
                    htmlFor="remember-me"
                    type="checkbox"
                    id="remember-me"
                    text="Remember me"
                />
                <Button className="sign-in-button" text="Sign In" />
            </form>
            {authError && <p className="error-message">{authError}</p>}
        </section>
    );
};

export default SignInForm;
