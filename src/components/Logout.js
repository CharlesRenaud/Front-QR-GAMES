import { useNavigate } from 'react-router-dom';

const LogoutButton = (props) => {

const {setIsAuth, setCurrentUser, setCurrentUserRole} = props.props;
  
const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuth(false);
    setCurrentUser(null);
    setCurrentUserRole(null);
    navigate('/')
  };

  return <button className='button-1 logout' onClick={handleLogout}>Déconnexion</button>;
};

export default LogoutButton;
