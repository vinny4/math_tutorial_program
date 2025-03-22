import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../store/actions/authActions';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      {user && user.role === 'student' && (
        <li>
          <Link to="/student-dashboard">Dashboard</Link>
        </li>
      )}
      {user && user.role === 'parent' && (
        <li>
          <Link to="/parent-dashboard">Dashboard</Link>
        </li>
      )}
      {user && user.role === 'admin' && (
        <li>
          <Link to="/admin-dashboard">Dashboard</Link>
        </li>
      )}
      <li>
        <Link to="/content">Content</Link>
      </li>
      <li>
        <Link to="/progress">Progress</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className="fas fa-calculator"></i> Math Tutorial
        </Link>
      </h1>
      {!loading && (
        <React.Fragment>{isAuthenticated ? authLinks : guestLinks}</React.Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
