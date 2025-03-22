import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Year 5 Mathematics Adventure</h1>
          <p className="lead">
            Join our friendly math characters on an exciting journey through numbers, shapes, and more!
          </p>
          <div className="math-mascots">
            <img src="/images/number-buddy.png" alt="Number Buddy" className="mascot-image" />
            <img src="/images/shape-explorer.png" alt="Shape Explorer" className="mascot-image" />
            <img src="/images/data-detective.png" alt="Data Detective" className="mascot-image" />
          </div>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Start Your Adventure
            </Link>
            <Link to="/login" className="btn btn-light">
              Continue Your Journey
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
