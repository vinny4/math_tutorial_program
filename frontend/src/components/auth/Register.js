import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../store/actions/alertActions';
import { register } from '../../store/actions/authActions';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    role: 'student',
    parentId: ''
  });

  const { firstName, lastName, username, email, password, password2, role, parentId } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ firstName, lastName, username, email, password, role, parentId });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container">
      <div className="register-container">
        <h1 className="large text-primary">Join the Math Adventure!</h1>
        <p className="lead">
          <i className="fas fa-user-plus"></i> Create Your Account
        </p>
        <div className="register-mascots">
          <img src="/images/welcome-buddy.png" alt="Welcome Buddy" className="register-mascot" />
        </div>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="form-group">
            <select name="role" value={role} onChange={e => onChange(e)}>
              <option value="student">I am a Student</option>
              <option value="parent">I am a Parent</option>
            </select>
          </div>
          {role === 'student' && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Parent ID (if you have one)"
                name="parentId"
                value={parentId}
                onChange={e => onChange(e)}
              />
              <small className="form-text">
                If your parent already has an account, enter their ID here
              </small>
            </div>
          )}
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
