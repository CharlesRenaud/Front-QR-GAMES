import React, { useState } from 'react';
import LogoutButton from './Logout';
import { useNavigate } from 'react-router-dom';

function BurgerMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const {notBack, setNotBack} = props.props

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  }

  const navigate = useNavigate();


  return (
    <div onClick={() => setNotBack(true)} className="burger-menu">
      <div className={`menu-bar ${isOpen ? 'open' : ''}`} onClick={handleMenuClick}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className={`menu-items ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a onClick={() => {navigate("/rgpd"); setIsOpen(false)}} className='titre-3' >Rgpd</a></li>
          <li><a onClick={() => {navigate("/legals"); setIsOpen(false)}} className='titre-3' >Mentions légales</a></li>
          <LogoutButton props={props.props} />
        </ul>
      </div>
    </div>
  );
}

export default BurgerMenu;
