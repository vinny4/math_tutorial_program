import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getContent } from '../../store/actions/contentActions';
import { getProgress, getSuggestions } from '../../store/actions/progressActions';

const StudentDashboard = ({ 
  auth: { user }, 
  content: { content, loading: contentLoading },
  progress: { progress, suggestions, loading: progressLoading },
  getContent,
  getProgress,
  getSuggestions
}) => {
  useEffect(() => {
    getContent();
    if (user) {
      getProgress(user._id);
      getSuggestions(user._id);
    }
  }, [getContent, getProgress, getSuggestions, user]);

  return (
    <section className="container">
      <div className="student-dashboard">
        <div className="dashboard-header">
          <h1 className="large text-primary">
            <img src="/images/student-avatar.png" alt="Student Avatar" className="dashboard-avatar" />
            Hello, {user && user.firstName}!
          </h1>
          <p className="lead">Welcome to your Math Adventure Dashboard</p>
        </div>

        <div className="dashboard-cards">
          <div className="card">
            <div className="card-header">
              <h2>
                <i className="fas fa-star"></i> Your Progress
              </h2>
            </div>
            <div className="card-body">
              {progressLoading ? (
                <div className="loading-spinner">
                  <img src="/images/loading-math.gif" alt="Loading" />
                </div>
              ) : progress && progress.length > 0 ? (
                <div className="progress-stats">
                  <div className="progress-item">
                    <span className="progress-label">Completed:</span>
                    <span className="progress-value">
                      {progress.filter(item => item.completed).length} / {progress.length}
                    </span>
                  </div>
                  <div className="progress-item">
                    <span className="progress-label">Average Score:</span>
                    <span className="progress-value">
                      {Math.round(
                        progress.reduce((sum, item) => sum + item.score, 0) / progress.length
                      )}%
                    </span>
                  </div>
                </div>
              ) : (
                <p>You haven't started any lessons yet. Let's begin!</p>
              )}
              <Link to={`/progress/${user && user._id}`} className="btn btn-primary">
                View Detailed Progress
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>
                <i className="fas fa-lightbulb"></i> Suggested Next Steps
              </h2>
            </div>
            <div className="card-body">
              {progressLoading ? (
                <div className="loading-spinner">
                  <img src="/images/loading-math.gif" alt="Loading" />
                </div>
              ) : suggestions && suggestions.nextSteps && suggestions.nextSteps.length > 0 ? (
                <ul className="suggestion-list">
                  {suggestions.nextSteps.map((suggestion, index) => (
                    <li key={index} className="suggestion-item">
                      <div className="suggestion-icon">
                        {suggestion.strand === 'Number and Algebra' && (
                          <img src="/images/number-icon.png" alt="Number" />
                        )}
                        {suggestion.strand === 'Measurement and Geometry' && (
                          <img src="/images/geometry-icon.png" alt="Geometry" />
                        )}
                        {suggestion.strand === 'Statistics and Probability' && (
                          <img src="/images/statistics-icon.png" alt="Statistics" />
                        )}
                      </div>
                      <div className="suggestion-content">
                        <h3>{suggestion.title}</h3>
                        <p>{suggestion.message}</p>
                        <Link to={`/content/${suggestion.contentId}`} className="btn btn-sm">
                          Start Lesson
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="empty-suggestions">
                  <img src="/images/start-journey.png" alt="Start Your Journey" />
                  <p>Ready to start your math adventure? Choose a topic below!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="content-categories">
          <h2 className="section-title">
            <i className="fas fa-book"></i> Math Topics
          </h2>
          <div className="category-cards">
            <div className="category-card number-algebra">
              <div className="category-icon">
                <img src="/images/number-category.png" alt="Number and Algebra" />
              </div>
              <h3>Number and Algebra</h3>
              <p>Explore numbers, operations, patterns and more!</p>
              <Link to="/content?strand=Number and Algebra" className="btn btn-category">
                Start Learning
              </Link>
            </div>

            <div className="category-card measurement-geometry">
              <div className="category-icon">
                <img src="/images/geometry-category.png" alt="Measurement and Geometry" />
              </div>
              <h3>Measurement and Geometry</h3>
              <p>Discover shapes, measurements, and spatial reasoning!</p>
              <Link to="/content?strand=Measurement and Geometry" className="btn btn-category">
                Start Learning
              </Link>
            </div>

            <div className="category-card statistics-probability">
              <div className="category-icon">
                <img src="/images/statistics-category.png" alt="Statistics and Probability" />
              </div>
              <h3>Statistics and Probability</h3>
              <p>Learn about data, chance, and making predictions!</p>
              <Link to="/content?strand=Statistics and Probability" className="btn btn-category">
                Start Learning
              </Link>
            </div>
          </div>
        </div>

        <div className="achievements-section">
          <h2 className="section-title">
            <i className="fas fa-trophy"></i> Your Achievements
          </h2>
          <div className="achievements-display">
            {progressLoading ? (
              <div className="loading-spinner">
                <img src="/images/loading-math.gif" alt="Loading" />
              </div>
            ) : progress && progress.filter(item => item.completed && item.score >= 80).length > 0 ? (
              <div className="badges-container">
                {progress.filter(item => item.completed && item.score >= 90).length > 0 && (
                  <div className="badge">
                    <img src="/images/star-badge.png" alt="Star Achiever" />
                    <span>Star Achiever</span>
                  </div>
                )}
                {progress.filter(item => 
                  item.completed && 
                  item.contentId.strand === 'Number and Algebra'
                ).length >= 3 && (
                  <div className="badge">
                    <img src="/images/number-master.png" alt="Number Master" />
                    <span>Number Master</span>
                  </div>
                )}
                {progress.filter(item => 
                  item.completed && 
                  item.contentId.strand === 'Measurement and Geometry'
                ).length >= 3 && (
                  <div className="badge">
                    <img src="/images/geometry-wizard.png" alt="Geometry Wizard" />
                    <span>Geometry Wizard</span>
                  </div>
                )}
                {progress.filter(item => 
                  item.completed && 
                  item.contentId.strand === 'Statistics and Probability'
                ).length >= 3 && (
                  <div className="badge">
                    <img src="/images/data-detective.png" alt="Data Detective" />
                    <span>Data Detective</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-achievements">
                <img src="/images/earn-badges.png" alt="Earn Badges" />
                <p>Complete lessons with high scores to earn achievement badges!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

StudentDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  progress: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired,
  getProgress: PropTypes.func.isRequired,
  getSuggestions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  content: state.content,
  progress: state.progress
});

export default connect(mapStateToProps, { getContent, getProgress, getSuggestions })(StudentDashboard);
