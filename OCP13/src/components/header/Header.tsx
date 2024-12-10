import './Header.scss'; import { Link } from 'react-router-dom';
import Logo from '@assets/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@redux/authSlice';
import { RootState } from '@redux/store';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.profile.data);
    const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

    const handleLogout = () => {
        dispatch(logout());
        if (isAuthenticated) {
            navigate('/');
        }
    };

    return (
        <header className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img src={Logo} alt="Argent Bank Logo" className="main-nav-logo-image" />
            </Link>
            <h1 className="sr-only">Argent Bank</h1>
            {isAuthenticated ? (
                <div>
                    <Link to="/user" className="main-nav-user">
                        <FontAwesomeIcon icon={faUserCircle} />
                        {user?.firstName}
                    </Link>
                    <button onClick={handleLogout} className="main-nav-button">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Sign Out
                    </button>
                </div>
            ) : (
                <Link className="main-nav-item" to="/login">
                    <FontAwesomeIcon icon={faUserCircle} />
                    Sign In
                </Link>
            )}
        </header>
    );
};

export default Header;
