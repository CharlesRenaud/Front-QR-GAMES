import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import LogoutButton from "../components/Logout";
import QrChecker from "../components/QrChecker";
import MayaInfos from "../components/infos/MayaInfos";
import RandomWinner from "../components/RandomWinner";
import BurgerMenu from '../components/BurgerMenu';
import Rgpd from '../components/Rgpd';
import Legals from '../components/Legals';
import MayaRules from '../components/infos/MayaRules';

const Rooting = () => {

    const apiUrl = "https://jeuqr.fr/api";

    const [isAuth, setIsAuth] = useState(Boolean);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [loginError, setLoginError] = useState(null);

    const [currentUser, setCurrentUser] = useState();
    const [currentUserRole, setCurrentUserRole] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [redirectUrl, setRedirectUrl] = useState(null)

    const [gameName, setGameName] = useState(null);
    const [scriptLinked, setScriptLinked] = useState(null);
    const [qrFind, setQrFind] = useState(null);

    const [name, setName] = useState(null);
    const [yearDate, setYearDate] = useState(null);

    const [notBack, setNotBack] = useState(false);

    // Render de l'état initial de l'application
    const initialRender = useRef(true);

    const [currentGame, setCurrentGame] = useState(
        {
            _id: "",
            name: "",
            qrNumber: null,
            startDate: null,
            endDate: null,
            userId: null,
            type: null,
            scriptLinked: null,
            reward: null,
            customer: null,
            contactCustomer: null,
            qrImages: [],
            playersTermines: [],
            players: [],
        }
    )


    const CheckAuth = async (token) => {
        // console.log(token + "  token")
        setIsLoading(true); // Ajout pour afficher l'état de chargement
        try {
            const res = await axios.get(`${apiUrl}/auth/verifyToken`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                // console.log(res)
                setIsAuth(true)
                setIsLoading(false);
                setCurrentUser(res.data.user)
            }
        } catch (error) {
            setIsAuth(false)
            setIsLoading(false)
        }
    };

    const props = {
        currentUserRole: currentUserRole,
        setCurrentUserRole: setCurrentUserRole,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        isAuth: isAuth,
        setIsAuth: setIsAuth,
        email: email,
        setEmail: setEmail,
        password: password,
        setPassword: setPassword,
        error: error,
        setError: setError,
        token: token,
        setToken: setToken,
        loginError: loginError,
        setLoginError: setLoginError,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        userId: userId,
        setUserId: setUserId,
        apiUrl: apiUrl,
        redirectUrl: redirectUrl,
        setRedirectUrl: setRedirectUrl,
        scriptLinked: scriptLinked,
        setScriptLinked: setScriptLinked,
        gameName: gameName,
        setGameName: setGameName,
        currentGame: currentGame,
        setCurrentGame: setCurrentGame,
        qrFind: qrFind,
        setQrFind: setQrFind,
        yearDate: yearDate,
        setYearDate: setYearDate,
        name : name,
        setName: setName,
        notBack: notBack,
        setNotBack: setNotBack
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            // console.log(isAuth)
            CheckAuth(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialRender]);


    return (
        <div className='App'>
            {isAuth ? <BurgerMenu props={props} /> : null}
            <Routes>
                <Route exact path="/" element={isLoading ? <Loading /> :  <Home props={props} />} />

                <Route path="/register" element={isAuth ? <Home props={props} /> : <Register props={props} />} />

                <Route path="/login" element={isAuth ? <Home props={props} /> : <Login props={props} />} />

                <Route path="/qr-checker" element={(isAuth ? <QrChecker props={props} /> : <Register props={props} />)} />

                <Route path="/maya-infos" element={<MayaInfos props={props} />} />

                <Route path="/random-winner" element={<RandomWinner props={props} />} />
                
                <Route path="/rgpd" element={<Rgpd props={props} />} />

                <Route path="/legals" element={<Legals props={props} />} />

                <Route path="/maya-rules" element={<MayaRules props={props} />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
};

export default Rooting;
