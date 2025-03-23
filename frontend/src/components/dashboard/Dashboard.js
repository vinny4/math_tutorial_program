import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate  } from 'react-router-dom';
import PropTypes from 'prop-types';

const Dashboard = ({ auth: { user, loading, isAuthenticated } }) => {
  if (!isAuthenticated) {
    return <Navigate  to="/login" />;
  }

  // Redirect to appropriate dashboard based on user role
  if (user && !loading) {
    if (user.role === 'student') {
      return <Navigate  to="/student-dashboard" />;
    } else if (user.role === 'parent') {
      return <Navigate  to="/parent-dashboard" />;
    } else if (user.role === 'admin') {
      return <Navigate  to="/admin-dashboard" />;
    }
  }

  return (
    <div className="container">
      <h1>Loading your dashboard...</h1>
      <div className="loading-animation">
        <img src="/images/loading-numbers.gif" alt="Loading" />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
