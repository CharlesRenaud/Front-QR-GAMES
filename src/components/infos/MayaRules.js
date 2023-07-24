import React from "react";

import { Link, useLocation } from "react-router-dom";


const MayaRules = (props) => {
  const location = useLocation();
  const {notBack, setNotBack} = props.props

  return (
    <div className="game-rules">
      <div>
        <Link className="remove-link"  to={location.state?.from || "/"}>
          <button className="button-1 final back">Retour</button>
        </Link>
        <h1>RÈGLEMENT DU JEU "LE TALISMAN PERDU"</h1>
        <h2>1. Organisation du jeu</h2>
        <p>L'ASSOCIATION DES COMMERCANTS DE LA POTERIE A MAULEON (ci-après "l'organisateur ») dont le siège social est situé à rue Rue de la Poterie - 79700 MAULEON organise du samedi 1er avril 2023 au dimanche 2 avril 2023 jeu gratuit et un tirage au sort sans obligation d’achat intitulé : « LE TALISMAN PERDU » (ci-après dénommé « le Jeu »), selon les modalités décrites dans le présent règlement.</p>
        <p>Cette opération n’est ni organisée, ni parrainée par une autre entreprise.</p>
        <h2>2. Conditions de participation</h2>
        <p>Ce jeu gratuit est ouvert à toute personne physique âgée de plus de 18 ans, disposant d’un smartphone permettant la lecture des QR Code, un accès à internet ainsi que d’une adresse électronique valide, et résidant en France métropolitaine, à l’exception des personnels de la société organisatrice et de leurs familles, ainsi que de toutes personnes ayant participé à l’élaboration du jeu.</p>
        <p>Le jeu est soumis à la réglementation de la loi française applicable aux jeux et concours.</p>
        <p>Le seul fait de participer à ce jeu implique l'acceptation pure et simple, sans réserve, du présent règlement.</p>
        <p>En acceptant le règlement du jeu concours, les participants acceptent de recevoir une information complémentaire de la part de l'organisateur à des fins d'information ou de promotion dans le respect des conditions RGPD disponibles sur demande et dans le cadre du jeu.</p>
        <h2>3. Modalités de participation</h2>
        <p>Ce jeu se déroule exclusivement sur le lieu de l'évènement aux dates indiquées dans l’article 1.</p>
        <p>La participation au jeu s’effectue en scannant des QR codes à l'aide d'un terminal mobile permettant cette fonctionnalité. Chaque QR code scanné donne une information permettant au joueur de continuer son action jusqu'à l'achèvement complet du jeu. Une fois le jeu terminé, le joueur est automatiquement inscrit dans la liste des sélectionnés pour le tirage au sort.</p>
        <h2>4. Désignation des gagnants</h2>
        <p>La désignation des gagnants des gains s'effectue par tirage au sort. Celle-ci aura lieu le dimanche 2 avril entre 17h et 19h sur le lieu de l'évènement. Les gagnants seront nommés lors du tirage au sort ou contactés dans un délai de 7 jours si ils ne sont pas présents à l'évènement lors du tirage au sort. Si les gagnants ne donnent pas de réponse dans un délai de 15 jours à compter de l’envoi d’avis de son gain, ils seront réputés renoncer à celui-ci et lelot ne sera pas attribué.</p>

        <h2>5. Dotations</h2>
        <p>Le tirage au sort détermine 3 gagnants de bons d'achat SUPER U : 2 bons d'achat de 50€ et 1 bon d'achat de 100€.</p>
        <h2>6. Identification du gagnant et élimination de la participation</h2>
        <p>Les participants autorisent la vérification de leur identité. Le non respect du présent règlement ainsi que toute fraude ou tentative de tricherie, quelles que soient ses modalités, entraînera l’élimination pure et simple de la participation de son auteur.</p>
        <h2>7. Décharges et responsabilités</h2>
        <p>La responsabilité des organisateurs ne peut être recherchée :</p>
        <ul>
          <li>en cas d’utilisation, par les participants, de coordonnées de personnes non consentantes.</li>
          <li>concernant la véracité et la légalité des justificatifs présentés par les gagnants.</li>
          <li>concernant tous les incidents qui pourraient survenir du fait de l’utilisation du prix offert.</li>
          <li>du retard et/ou perte du lot du fait des services postaux ou de prestataires spécialisés, ou de grèves ou de leur destruction totale ou partielle pour autre cas fortuit.</li>
        </ul>
        <p>Il est expressément rappelé que l’Internet n’est pas un réseau sécurisé. Les organisateurs ne sauraient donc être tenus pour responsables de la contamination par d’éventuels virus ou de l’intrusion d’un tiers dans le système du terminal des participants au Jeu Concours et déclinent toute responsabilité quant aux conséquences de la connexion des participants au réseau via le site.</p>
        <p>« Les organisateurs » ne pourront être tenus pour responsables en cas de dysfonctionnements du réseau Internet, dus notamment à des actes de malveillance externe, qui empêcheraient le bon déroulement du concours et l’information des participants. Les participants qui tenteraient de participer par des moyens tels qu’automates de participation, programmes élaborés pour des participations automatisées, utilisation d’informations, email, numéros de clients autres que ceux correspondant à leur identité et adresse et plus généralement par tous moyens non conformes au respect de l’égalité des chances entre les participants en cours de concours seraient automatiquement éliminés. Seront notamment exclus ceux qui, par quelque procédé que ce soit, tenteraient de modifier les dispositifs de jeu proposés, notamment afin d'en modifier les résultats.</p>
        <p>Plus particulièrement, « les organisateurs » ne sauraient être tenus pour responsables d’un quelconque dommage causé aux participants, à leurs équipements informatiques et aux données qui y sont stockées, ainsi que des conséquences pouvant en découler sur leur activité personnelle ou professionnelle. Les organisateurs ne sauraient davantage être tenus pour responsables au cas où un ou plusieurs participants ne pourraient parvenir à se connecter au site du jeu concours ou à y jouer du fait de tout problème ou défaut technique lié aux serveurs ou hébergeurs du site.</p>

        <p>Les organisateurs se réservent le droit d’arrêter, annuler, reporter ou proroger ce jeu concours à tout moment, pour cause de force majeure ou tout autre raison de nature commerciale, information étant faite sur le site de participation, sans qu’une quelconque indemnité ne soit exigible par les participants. Leur responsabilité ne saurait être engagée du fait de ces modifications (consultation, page consultée, date et heure du clic, lieu du clic…).</p>
        <h2>8. RGPD</h2>
        <p>La fourniture d’informations nominatives (par exemple : nom, prénom, adresse) concernant le participant est nécessaire à la bonne exécution du présent concours. Celle-ci s'effectue dans le respect du RGPD (norme européenne pur le respect des données personnelles). Les informations nominatives récoltées pourront également être communiquées à des partenaires commerciaux de la Société, notamment pour des opérations de marketing direct.</p>
        <p>Conformément à la loi Informatique et Liberté n° 78-17 du 6 janvier 1978, le participant dispose d’un droit d’accès, de modification et de suppression en s’adressant par courrier à l'organisateur.</p>
        <p>Afin de personnaliser le site, de faciliter l'accès aux rubriques et de maintenir le niveau atteint, un cookie pourra être implanté sur le disque dur de l'ordinateur du participant au Jeu. Ce cookie a pour objet exclusif d'enregistrer les informations relatives à la navigation sur le site et notamment sur chacun des écrans permettant de jouer et de conserver des informations sur la participation du joueur (date et heure de la consultation, page consultée, date et heure du clic, lieu du clic…).</p>
        <h2>9. Règles diverses</h2>
        <p>La participation au concours implique l’acceptation pleine et entière du présent règlement, des règles de déontologie en vigueur sur Internet ainsi que des lois, règlements (notamment fiscaux) et autres textes applicables en France.</p>
        <p>Toute contestation relative au tirage au sort devra obligatoirement être formulée par écrit auprès de l'organisateur, dans un délai maximum de sept (7) jours à compter de la date de clôture du concours. Aucune réclamation n’étant recevable passé ce délai.</p>
        <h2>10. Territorialité</h2>
        <p>Le présent concours est organisé selon la loi française.</p>
      </div>
    </div>
  );
};

export default MayaRules;
