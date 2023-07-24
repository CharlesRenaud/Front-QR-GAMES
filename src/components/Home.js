import React, { useState, useEffect, useRef } from "react";
import CryptoJS from 'crypto-js';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const Home = (props) => {

    const { currentUser, isAuth, gameName, setGameName, token, apiUrl, setQrFind, scriptLinked, setScriptLinked, setCurrentGame, currentGame } = props.props;

    const location = useLocation();
    const navigate = useNavigate();

    const [decryptedData, setDecryptedData] = useState(null);

    const initialRender = useRef(true);

    function decrypt(encryptedData, password) {
        const bytes = CryptoJS.AES.decrypt(encryptedData, password);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            const encryptedData = new URLSearchParams(location.search).get('data');
            if (encryptedData) {
                localStorage.setItem('encryptedData', encryptedData);
                const decryptedData = decrypt(encryptedData, "f181dc300da38da8cc5e5fba34f06f2e");
                setDecryptedData(decryptedData);
                const args = decryptedData.split('&').map(arg => arg.split('='));
                setGameName(args[0][1]);
                // console.log('ID du jeu : ' + args[0][1]);
                setScriptLinked(args[1][1]);
                // console.log('Script du jeu : ' + args[1][1]);
                setQrFind(args[2][1]);
                // console.log('QR Scanné n° : ' + args[2][1]);
                // console.log('Arguments de l\'URL décryptée : ', args);
                // console.log('decryptedData : ', decryptedData);
                getCurrentGame(args[0][1], args[2][1]);

            } else if (localStorage.getItem('encryptedData')) {
                const lookingForData = localStorage.getItem('encryptedData');
                const decryptedData = decrypt(lookingForData, "f181dc300da38da8cc5e5fba34f06f2e");
                setDecryptedData(decryptedData);
                const args = decryptedData.split('&').map(arg => arg.split('='));
                setGameName(args[0][1]);
                // console.log('ID du jeu : ' + args[0][1]);
                setScriptLinked(args[1][1]);
                // console.log('Script du jeu : ' + args[1][1]);
                setQrFind(args[2][1]);
                // console.log('QR Scanné n° : ' + args[2][1]);
                // console.log('Arguments de l\'URL décryptée : ', args);
                // console.log('decryptedData : ', decryptedData);
                getCurrentGame(args[0][1], args[2][1])
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialRender]);


    const getCurrentGame = async (id, from) => {
        axios.get(`${apiUrl}/game/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setCurrentGame(response.data)
            // console.log(response.data, "GetCurrentGame Response")
            // console.log(id, "Identifiant")
            // console.log(from, "From Response")

            if (isNaN(from)) {
                if (from === "affiche-1" || "affiche-2" || "flyers") {
                    navigate("/maya-infos")
                } else {
                    navigate("/")
                }
            } else {
                navigate("/qr-checker")
            }
        })
            .catch(error => {
                // console.log(error, "GetCurrentGame Error")
                props.props.setError(error.response.data.message);
                return error;
            });
    }

    return (
        <div className="HomePage">
            Bienvenue sur Jeego, participez à nos jeux évenements.
        </div>
    );
}

export default Home;