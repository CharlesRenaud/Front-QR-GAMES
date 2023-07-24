import react, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = (props) => {

    const navigate = useNavigate()

    const { email, password, isAdmin, apiUrl, setUserId, setCurrentUser, setToken, setIsAuth, yearDate, setYearDate, name, setname } = props.props

    const [validationError, setValidationError] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const isValidDateInput = (value) => {
        const pattern = /^[0-9]+$/;
        return pattern.test(value);
      };
      
    const handleSubmit = (event) => {
        event.preventDefault();
        const currentYear = new Date().getFullYear();
        const year = parseInt(yearDate, 10);
        if (year < 1900 || year > currentYear || !isValidDateInput(yearDate)) {
            setValidationError(true);
        } else {
            setValidationError(false);
            axios.post(`${apiUrl}/auth/signup`, { email, password, isAdmin, name, yearDate })
                .then(response => {
                    // console.log(response);

                    setCurrentUser(response.data.user);
                    // console.log(response.data.user);

                    setToken(response.data.token);
                    // console.log(response.data.token);


                    setUserId(response.data.userId);
                    // console.log(response.data.userdIc);

                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);

                    setIsAuth(true);

                    navigate('/')
                })
                .catch(error => {
                    // console.log(error)
                    props.props.setError(error);
                });
        }
    }

    return (
        <div className="register">
            <div className='register-wrapper'>
                <h1 className='titre-1'>S'inscrire</h1>
                <h2 className='titre-2'>Pour participer</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p className='intitule-1'>Votre prénom et nom</p>
                        <p className='intitule-2'>Pour vous identifier lors du tirage au sort</p>
                        <input type="text" value={props.props.name} onChange={e => props.props.setName(e.target.value)} required />
                    </label>
                    <label>
                        <p className='intitule-1'>Votre année de naissance</p>
                        <p className='intitule-2'>18 ans minimum</p>
                        <input
                            type="text"
                            id="yearDate"
                            value={yearDate}
                            onChange={(e) => setYearDate(e.target.value)}
                            maxLength={4}
                            pattern="[0-9]*"
                            required
                        />

                    </label>
                    <label>
                        <p className='intitule-1'>Votre email</p>
                        <p className='intitule-2'>Pour vous contacter si vous êtes tiré au sort</p>
                        <input type="email"  value={props.props.email} onChange={e => props.props.setEmail(e.target.value)} required />
                    </label>
                    <label>
                        <p className='intitule-1'>Votre mot de passe</p>
                        <input type="password"  value={props.props.password} onChange={e => props.props.setPassword(e.target.value)} required />
                    </label>

                    {props.props.error && <p style={{ color: 'red' }}>{props.props.error}</p>}
                    {validationError && <p style={{ color: 'red' }}>Vérifier la date de naissance</p>}
                    <label className='rgpd-label'>
                        <input className='checkbox-rgpd intitule-2' type="checkbox" checked={acceptedTerms} onChange={() => setAcceptedTerms(!acceptedTerms)} required />
                        J'accepte les
                        <Link className='legals-link' to="/rgpd"> CGU et la politique RGPD</Link>

                    </label>

                    <button className='button-1' type="submit">S'inscrire</button>
                </form>
                <div className='login-link-box'>
                    <p className='intitule-3'>Déjà Inscrit ? </p>
                    <Link className='intitule-4' to="/login">Se connecter !</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
