import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const { redirectUrl, setCurrentUser, setUserId, loginError, setLoginError, setIsAuth, setToken, apiUrl } = props.props;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${apiUrl}/auth/login`, { email, password })
            .then(response => {
                // console.log(response)
                setCurrentUser(response.data.user)
                setToken(response.data.token);
                setMessage(response.data.message);
                // console.log("utilisateur connecté");
                setIsAuth(true);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                setUserId(response.data.userId);
                navigate('/')

            })
            .catch(loginError => {
                // console.log(loginError)
                if (loginError.response.status === 401) {
                    setLoginError('Email ou mot de passe incorrect');
                } else {
                    setLoginError('Erreur de connexion, veuillez réessayer plus tard.');
                }
            });
    }

    useEffect(() => {
        if (redirectUrl) {
            navigate(redirectUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [redirectUrl]);

    useEffect(() => {
        const encryptedData = new URLSearchParams(location.search).get('data');
        if (encryptedData) {
            localStorage.setItem('encryptedData', encryptedData);
            // console.log(encryptedData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='login'>
            <div className='login-wrapper'>
                <h1 className='titre-1'>Se connecter</h1>
                <h1 className='titre-2'>pour participer</h1>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        <p className='intitule-1'>Email</p>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </label>
                    <label>
                        <p className='intitule-1'>Mot de passe</p>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </label>
                    <button className='button-1' type="submit">Se connecter</button>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                </form>
                <div className='register-link-box'>
                    <p className='intitule-3'>Pas encore inscrit ? </p>
                    <Link className='intitule-4' to="/register">S'inscrire !</Link>
                </div>
            </div>
        </div>
    );
};
export default Login;