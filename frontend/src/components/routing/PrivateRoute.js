import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRouteComponent = ({ 
  component: Component, 
  auth: { isAuthenticated, loading },
  role,
  ...rest 
}) => (
  <Route 
    {...rest} 
    render={props => 
      loading ? (
        <div>Loading...</div>
      ) : isAuthenticated ? (
        role && role !== 'any' ? (
          // If a specific role is required, check user role
          rest.auth.user.role === role ? (
            <Component {...props} />
          ) : (
            <Navigate to='/dashboard' />
          )
        ) : (
          // If no specific role is required, just check authentication
          <Component {...props} />
        )
      ) : (
        <Navigate to='/login' />
      )
    } 
  />
);

PrivateRouteComponent.propTypes = {
  auth: PropTypes.object.isRequired,
  role: PropTypes.string
};

PrivateRouteComponent.defaultProps = {
  role: 'any'
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouteComponent);
