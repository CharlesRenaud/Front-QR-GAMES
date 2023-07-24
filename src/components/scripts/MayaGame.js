import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Talisman1 from '../../images/maya/Talisman1.png'
import Talisman2 from '../../images/maya/Talisman2.png'
import Talisman3 from '../../images/maya/Talisman3.png'
import Talisman4 from '../../images/maya/Talisman4.png'
import Talisman1Carre from '../../images/maya/Talisman1Carre.png'
import Talisman2Carre from '../../images/maya/Talisman2Carre.png'
import Talisman3Carre from '../../images/maya/Talisman3Carre.png'
import Talisman4Carre from '../../images/maya/Talisman4Carre.png'
import FondTalisman from '../../images/maya/FondTalisman.png'
import LogoMaya from '../../images/maya/logo.png'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import MayaRules from '../infos/MayaRules'

/* QR SCANNER  */

function MayaGame(props) {
  const {notBack, setNotBack, apiUrl, currentGame, setQrFind, setCurrentUser, qrFind, userId, token, currentUser } = props.props.props;

  const [gameMessage, setGameMessage] = useState(null);
  const [gameSuccess, setGameSuccess] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(true);
  const [nbrQrFinds, setNbrQrFinds] = useState(null);
  const [dialogue, setDialogue] = useState([
    "Bravo, plus que 3 pièces à trouver !",
    "Chouette, une pièce de plus, plus que 2 !",
    "Tu n'as jamais été aussi proche du but. Encore une pièce et le talisman sera à toi !",
    "La chasse au trésor n'a plus de secrets pour toi, tu es un véritable aventurier !",
  ]);
  const [endMessage, setShowEndMessage] = useState(null);
  const [triggerFinalAnimation, setTriggerFinalAnimation] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const initialRender = useRef(true);


  useEffect(() => {
    const handleQrCodeScan = () => {
      // console.log(isGameStarted, currentGame._id, userId, qrFind, 'handleqrSCAN')

      if (isGameStarted && currentGame._id && userId && qrFind) {
        if (initialRender.current) {
          // console.log('requete HANDLE QR SCAN ');
          initialRender.current = false;
          axios
            .put(
              `${apiUrl}/auth/updateUserGameInfo`,
              {
                gameId: currentGame._id,
                userId: userId,
                qrCode: qrFind,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              // console.log(res.data.user);
              setCurrentUser(res.data.user);
              setGameMessage("Nouveau Qr ajouté")
              setGameSuccess(true)

              if (res.data.user.qrcodesFind.length === 4) {
                setShowEndMessage(true)
              }

            })
            .catch((error) => {
              if (error.response && error.response.data) {
                // console.log(error.response.data.error);
                setGameMessage(error.response.data.error)
              } else {
                // console.log(error);
              }
            });
        }
      };
    }

    /*setIsGameStarted(currentGame.startDate && new Date(currentGame.startDate) < new Date());*/

    if (isGameStarted) {
      handleQrCodeScan();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGame, isGameStarted, apiUrl, setCurrentUser, userId, token, qrFind]);

  const [qr1, setQr1] = useState(false)
  const [qr2, setQr2] = useState(false)
  const [qr3, setQr3] = useState(false)
  const [qr4, setQr4] = useState(false)

  useEffect(() => {
    const triggerAnimations = (qrFind) => {
       // console.log(qrFind)
      if (currentUser) {
        // console.log(currentUser)
        // Supposons que vous ayez récupéré les données de l'utilisateur dans une variable user
        const game = currentUser.games.find(game => game.id === currentGame._id);

        if (game) {
          // console.log(game)
          // console.log(game.qrcodesFind); // Exemple : afficher la liste des codes QR trouvés pour ce jeu
          setNbrQrFinds(game.qrcodesFind.length)
          if (game.qrcodesFind.length === 4) {
            setShowEndMessage(true)
          }
          if (qrFind === 1 || game.qrcodesFind.includes('1')) {
            setQr1(true)
          }
          if (qrFind === 2 || game.qrcodesFind.includes('2')) {
            setQr2(true)
          }
          if (qrFind === 3 || game.qrcodesFind.includes('3')) {
            setQr3(true)
          }
          if (qrFind === 4 || game.qrcodesFind.includes('4')) {
            setQr4(true)
          }
        } else {
          // Aucun jeu trouvé avec l'identifiant donné
          // console.log("Aucun jeu trouvé avec l'identifiant " + currentGame._id);
        }
      };
    }
    if (gameMessage) {
      // ne rien faire
    } else {
      triggerAnimations(qrFind)
    }
  }, [currentUser, currentGame, qrFind, gameMessage]);





  /*
  const videoRef = useRef(null);
  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      // La permission a été accordée
      setShowScanner(true);
    } catch (error) {
      // La permission a été refusée ou une erreur s'est produite
      console.error("Erreur lors de la demande de permission de la caméra :", error);
    }
  };
  
  useEffect(() => {
    if (videoRef.current !== null && showScanner) {
      const qrScanner = new QrScanner(videoRef.current, result => {
        // le code QR a été scanné avec succès
        console.log(result);
        window.location.href = result;
      });
      QrScanner.listCameras().then(devices => {
        const rearCamera = devices.find(device => device.label.includes('back'));
        qrScanner.setCamera(rearCamera.deviceId);
      });
      const playVideo = () => {
        videoRef.current.play().catch(error => {
          console.error("Erreur lors de la lecture de la vidéo :", error);
          setTimeout(() => {
            playVideo();
          }, 500);
        });
      };
      qrScanner.start();
      videoRef.current.addEventListener("canplaythrough", () => {
        playVideo();
      });
      return () => {
        qrScanner.stop();
        videoRef.current.removeEventListener("canplaythrough", () => {
          playVideo();
        });
      };
    }    
  }, [showScanner]);

            { showScanner &&
            <div className="status-modal">
              <video ref={videoRef} />
              <button onClick={() => setShowScanner(false)}>Fermer</button>
            </div>
          }
          
          <button onClick={() => {requestCameraPermission(); setShowScanner(true)}}>Scanner un QR code</button>
          
  */


          setTimeout(() => {
            if(notBack === true){
              setNotBack(false)
              setGameMessage(null)
            }
          }, "500");

  return (
    <div className="MayaGame">
      {!isGameStarted ? (
        <div>  L'événement commence bientôt.</div>
      ) : (
        <div>
          <img className="logo-maya" src={LogoMaya} alt="logo-maya" />
          {gameMessage && !notBack ?
            <div>
              <div className="status-modal">
                {gameSuccess ? <div className="messageStatus">Bravo !</div> : <div className="messageStatus">Dommage</div>}
                {gameSuccess ? <div className="subMessageStatus">Une pièce manquante trouvée</div> : <div className="subMessageStatus">La pièce a déjà été trouvée</div>}
                <div className="img-wrapper-modal">
                  <img alt='fragment-mediallon' className={qrFind === "1" ? "talisman-modal find-modal" : "talisman-modal"} src={Talisman1Carre} />
                  <img alt='fragment-mediallon' className={qrFind === "2" ? "talisman-modal find-modal" : "talisman-modal"} src={Talisman2Carre} />
                  <img alt='fragment-mediallon' className={qrFind === "3" ? "talisman-modal find-modal" : "talisman-modal"} src={Talisman3Carre} />
                  <img alt='fragment-mediallon' className={qrFind === "4" ? "talisman-modal find-modal" : "talisman-modal"} src={Talisman4Carre} />
                </div>
                <button className="button-2" onClick={() => setGameMessage(null)}>Continue</button>
                <p className="intitule-1 sub">en scannant d'autres codes</p>
              </div>
              <div className="overlay" />
            </div> :
            (endMessage) ?
              <div>
                <div className="status-modal">
                  <div className="subMessageStatus fix">Félicitations, vous avez retrouvé toutes les pièces du talisman perdu ! <br /> <br /> Vous êtes inscrit pour le tirage au sort ! <br />Les gagnants seront contactés par email. <br /> <br /> Merci de votre participation.</div>
                  <button className="button-2 final" onClick={() => { setGameMessage(null); setShowEndMessage(null); setTriggerFinalAnimation(true) }}>Fermer</button>
                </div>
                <div className="overlay" />
              </div>
              :
              null
          }


          {!triggerFinalAnimation ?
            <div className="talismanBox">
              <img alt='fragment-mediallon' className="fond-talisman" src={FondTalisman} />
              <img alt='fragment-mediallon' className={qr1 ? "talisman find" : "talisman"} src={Talisman1} />
              <img alt='fragment-mediallon' className={qr2 ? "talisman find" : "talisman"} src={Talisman2} />
              <img alt='fragment-mediallon' className={qr3 ? "talisman find" : "talisman"} src={Talisman3} />
              <img alt='fragment-mediallon' className={qr4 ? "talisman find" : "talisman"} src={Talisman4} />
            </div>
            :
            <div className="talismanBox-final">
              <img alt='fragment-mediallon' className="fond-talisman-final" src={FondTalisman} />
              <img alt='fragment-mediallon' className={qr1 ? "talisman find final-1" : "talisman"} src={Talisman1} />
              <img alt='fragment-mediallon' className={qr2 ? "talisman find final-2" : "talisman"} src={Talisman2} />
              <img alt='fragment-mediallon' className={qr3 ? "talisman find final-3" : "talisman"} src={Talisman3} />
              <img alt='fragment-mediallon' className={qr4 ? "talisman find final-4" : "talisman"} src={Talisman4} />
            </div>
          }
          <div>
            <p className="gameInfosText">{nbrQrFinds} / 4</p>
            <p className="gameInfosText">Pièces du talisman collectées</p>
            <p className="subGameInfos">{dialogue[nbrQrFinds - 1]}</p>
            <Link onClick={() => setNotBack(true)} className='link indexTop button-2 ' to="/maya-infos">Présentation du jeu</Link>
          </div>
        </div>
      )
      }

    </div >
  )

}

export default MayaGame;
