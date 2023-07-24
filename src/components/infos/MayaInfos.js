import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";
import { Link } from 'react-router-dom';
import Logo from "../../images/maya/logo.png"
import Banner from "../../images/maya/banner.png"

const MayaInfos = (props) => {
    const { qrFind, currentGame, apiUrl, isAuth } = props.props;

    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            // Requête HTTP pour incrémenter la source
            axios.post(`${apiUrl}/game/${currentGame._id}/source/tracker/increment`, {
                sourceName: qrFind,
            });

            initialRender.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qrFind, currentGame]);


    moment.locale("fr"); // définir la langue en français
    const startDate = moment(currentGame.startDate);
    const endDate = moment(currentGame.endDate);
    const startMonth = startDate.format("MMMM");
    const endMonth = endDate.format("MMMM");

    let dateText = `Du ${startDate.format("D")} au ${endDate.format("D")} ${endMonth} ${endDate.format("YYYY")}`;

    if (startMonth !== endMonth) {
        dateText = `Du ${startDate.format("D")} ${startMonth} au ${endDate.format("D")} ${endMonth} ${endDate.format("YYYY")}`;
    }


    return (
        <div className="MayaGame infos">
            <img className="logo-maya" src={Logo} alt="logo-maya" />
            <p className="date-bold">{dateText}</p>
            <p>
                Pendant le week-end des portes ouvertes de la zone commerciale de la Poterie à Mauléon,
                venez participer à notre jeu gratuit, et tentez de gagner des bons d'achat
                <span className="bold"> Super U d'une valeur de 50€ à 100€</span>
            </p>
            <p>
            C'est un vrai jeu d'enfant : explorez la zone commerciale et retrouvez-les quatre animaux gardiens qui cachent des QR code. Flashez les pour
            <span className="bold"> reconstituer le talisman perdu.</span>
            </p>
            <img className="logo-maya" src={Banner} alt="logo-maya" />
            <p>
                Une fois le talisman complet, vous participez automatiquement au tirage au sort.
            </p>

            <p><span className="bold"> Alors flashez votre premier QR code et débutez l'aventure !</span></p>
            <p className="petit-texte">*Pour consulter le réglement du jeu, <Link className='link' to="/maya-rules">Cliquer ici !</Link></p>
            {
                !isAuth ?
                <Link className='button-1 final link' to="/register">S'inscrire !</Link>
                :
                <p className="bold">Scan un des gardiens pour commencer l'aventure</p>
            }
        </div>
    );
};

export default MayaInfos;
