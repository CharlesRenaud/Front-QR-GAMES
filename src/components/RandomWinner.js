import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';

const RandomWinner = (props) => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');
    const [winner, setWinner] = useState('');
    const [winnersList, setWinnersList] = useState([]);
    const [numDisplayedWinners, setNumDisplayedWinners] = useState(20);

    const { apiUrl, token } = props.props

    useEffect(() => {
        // Récupération de la liste de tous les jeux
        axios.get(`${apiUrl}/game`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => setGames(response.data))
            .catch(error => console.error(error));
    }, [apiUrl, token]);


    const handleSelectChange = event => {
        setSelectedGame(event.target.value);
    };
    const handleDrawWinner = () => {
        // Envoi de la requête POST pour tirer un gagnant
        axios.post(`${apiUrl}/game/${selectedGame}/random/winner`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setWinner(response.data.winners);
                setWinnersList(response.data.playersRandomWinner)
               // console.log(response.data.winners);
               // console.log(response.data.playersRandomWinner);
            })

            .catch(error =>  console.error(error));
    };

    const handleShowAllWinners = () => {
        setNumDisplayedWinners(-1);
    };


    return (
        <div>
            <h1>Tirage au sort d'un gagnant</h1>
            <select value={selectedGame} onChange={handleSelectChange}>
                <option value="">Sélectionnez un jeu</option>
                {games.map(game => (
                    <option key={game._id} value={game._id}>{game.name}</option>
                ))}
            </select>
            <button disabled={!selectedGame} onClick={handleDrawWinner}>Tirer un gagnant</button>
            {winner && (
                <p>Le gagnant est : {winner[winner.length - 1].email}</p>
            )}
            {
                winner
                    ?
                    <div>
                        <h2>Liste des tirages</h2>
                        <h3>tirage n° {winner.length} </h3>
                        <div className='liste-tirage'>

                            {
                                numDisplayedWinners === -1 ?
                                    winner.slice(numDisplayedWinners === -1 ? 0 : winner.length >= numDisplayedWinners ? winner.length - numDisplayedWinners : 0, numDisplayedWinners === -1 ? winner.length : numDisplayedWinners + winner.length).map((w, index) => (
                                        <div>
                                            {console.log('+20')}
                                            <p key={index}><span>{(winnersList.length > 20) ? (winnersList.length - ((numDisplayedWinners - 1) - index)) : (index + 1)} - </span>{w.email}</p>
                                            <p>{moment.tz(winnersList[(index) + (winnersList.length -20) ].date, 'Europe/Paris').format('DD/MM/YYYY HH:mm:ss')}</p>
                                        </div>
                                    ))
                                    :
                                    winner.slice(numDisplayedWinners === -1).map((w, index) => (
                                        <div>
                                            {console.log('-20')}
                                            <p key={index}><span>{index + 1} - </span>{w.email}</p>
                                            <p>{moment.tz(winnersList[index].date, 'Europe/Paris').format('DD/MM/YYYY HH:mm:ss')}</p>
                                        </div>
                                    ))
                            }
                        </div>
                        {numDisplayedWinners !== -1 && numDisplayedWinners < winner.length &&
                            <button onClick={handleShowAllWinners}>Afficher tous les gagnants</button>
                        }
                    </div>

                    :
                    null
            }
        </div>
    );
};

export default RandomWinner;
