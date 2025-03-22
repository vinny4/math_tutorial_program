import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProgress, getProgressReport } from '../../store/actions/progressActions';

const ProgressTracker = ({
  auth: { user },
  progress: { progress, report, loading },
  getProgress,
  getProgressReport
}) => {
  const { userId } = useParams();
  const [selectedStrand, setSelectedStrand] = useState('all');
  
  useEffect(() => {
    if (userId) {
      getProgress(userId);
      getProgressReport(userId);
    } else if (user) {
      getProgress(user._id);
      getProgressReport(user._id);
    }
  }, [getProgress, getProgressReport, userId, user]);

  const filterByStrand = (items) => {
    if (selectedStrand === 'all') return items;
    return items.filter(item => item.contentId && item.contentId.strand === selectedStrand);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <img src="/images/loading-math.gif" alt="Loading" className="loading-animation" />
        <p>Loading progress data...</p>
      </div>
    );
  }

  return (
    <section className="container">
      <div className="progress-tracker-page">
        <div className="page-header">
          <h1 className="large text-primary">
            <i className="fas fa-chart-line"></i> Progress Tracker
          </h1>
          <p className="lead">Track your learning journey and see how far you've come!</p>
        </div>

        <div className="progress-overview">
          <div className="overview-card">
            <div className="overview-icon">
              <img src="/images/progress-overview.png" alt="Progress Overview" />
            </div>
            <div className="overview-stats">
              <h2>Your Learning Journey</h2>
              {report ? (
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Topics Completed:</span>
                    <span className="stat-value">{report.completedCount}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Average Score:</span>
                    <span className="stat-value">{report.averageScore}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Time Spent:</span>
                    <span className="stat-value">{Math.floor(report.totalTimeSpent / 60)} minutes</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Badges Earned:</span>
                    <span className="stat-value">{report.badgesEarned || 0}</span>
                  </div>
                </div>
              ) : (
                <p>No progress data available yet. Start learning to see your stats!</p>
              )}
            </div>
          </div>
        </div>

        <div className="strand-filter">
          <div className="filter-header">
            <h2>Filter by Category</h2>
          </div>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${selectedStrand === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedStrand('all')}
            >
              <img src="/images/all-topics.png" alt="All Topics" className="filter-icon" />
              <span>All Topics</span>
            </button>
            <button 
              className={`filter-btn ${selectedStrand === 'Number and Algebra' ? 'active' : ''}`}
              onClick={() => setSelectedStrand('Number and Algebra')}
            >
              <img src="/images/number-category.png" alt="Number and Algebra" className="filter-icon" />
              <span>Number and Algebra</span>
            </button>
            <button 
              className={`filter-btn ${selectedStrand === 'Measurement and Geometry' ? 'active' : ''}`}
              onClick={() => setSelectedStrand('Measurement and Geometry')}
            >
              <img src="/images/geometry-category.png" alt="Measurement and Geometry" className="filter-icon" />
              <span>Measurement and Geometry</span>
            </button>
            <button 
              className={`filter-btn ${selectedStrand === 'Statistics and Probability' ? 'active' : ''}`}
              onClick={() => setSelectedStrand('Statistics and Probability')}
            >
              <img src="/images/statistics-category.png" alt="Statistics and Probability" className="filter-icon" />
              <span>Statistics and Probability</span>
            </button>
          </div>
        </div>

        <div className="progress-details">
          <h2 className="section-title">
            <i className="fas fa-tasks"></i> Topic Progress
          </h2>
          
          {progress && progress.length > 0 ? (
            <div className="progress-table">
              <div className="table-header">
                <div className="header-cell">Topic</div>
                <div className="header-cell">Category</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Score</div>
                <div className="header-cell">Time Spent</div>
                <div className="header-cell">Actions</div>
              </div>
              <div className="table-body">
                {filterByStrand(progress).map((item, index) => (
                  <div key={index} className="table-row">
                    <div className="body-cell topic-cell">
                      <div className="topic-icon">
                        {item.contentId && item.contentId.strand === 'Number and Algebra' && (
                          <img src="/images/number-icon.png" alt="Number" />
                        )}
                        {item.contentId && item.contentId.strand === 'Measurement and Geometry' && (
                          <img src="/images/geometry-icon.png" alt="Geometry" />
                        )}
                        {item.contentId && item.contentId.strand === 'Statistics and Probability' && (
                          <img src="/images/statistics-icon.png" alt="Statistics" />
                        )}
                      </div>
                      <span>{item.contentId ? item.contentId.title : 'Unknown Topic'}</span>
                    </div>
                    <div className="body-cell">{item.contentId ? item.contentId.strand : 'Unknown'}</div>
                    <div className="body-cell status-cell">
                      {item.completed ? (
                        <span className="status-complete">
                          <i className="fas fa-check-circle"></i> Completed
                        </span>
                      ) : (
                        <span className="status-incomplete">
                          <i className="fas fa-clock"></i> In Progress
                        </span>
                      )}
                    </div>
                    <div className="body-cell score-cell">
                      {item.completed ? (
                        <div className="score-display">
                          <div className="score-bar">
                            <div 
                              className="score-fill" 
                              style={{ 
                                width: `${item.score}%`,
                                backgroundColor: 
                                  item.score >= 80 ? '#4caf50' : 
                                  item.score >= 60 ? '#ff9800' : '#f44336'
                              }}
                            ></div>
                          </div>
                          <span>{item.score}%</span>
                        </div>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                    <div className="body-cell">
                      {item.timeSpent ? `${Math.floor(item.timeSpent / 60)}m ${item.timeSpent % 60}s` : '-'}
                    </div>
                    <div className="body-cell actions-cell">
                      <Link 
                        to={`/content/${item.contentId ? item.contentId._id : ''}`} 
                        className="btn btn-sm"
                      >
                        {item.completed ? 'Review' : 'Continue'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-progress">
              <img src="/images/start-learning.png" alt="Start Learning" className="empty-image" />
              <p>No progress data available yet. Start exploring topics to track your progress!</p>
              <Link to="/content" className="btn btn-primary">
                Explore Topics
              </Link>
            </div>
          )}
        </div>

        <div className="achievement-section">
          <h2 className="section-title">
            <i className="fas fa-trophy"></i> Achievements
          </h2>
          
          {report && report.achievements && report.achievements.length > 0 ? (
            <div className="achievements-grid">
              {report.achievements.map((achievement, index) => (
                <div key={index} className="achievement-card">
                  <div className="achievement-icon">
                    <img src={`/images/badge-${achievement.type}.png`} alt={achievement.name} />
                  </div>
                  <div className="achievement-info">
                    <h3>{achievement.name}</h3>
                    <p>{achievement.description}</p>
                    <span className="achievement-date">
                      Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-achievements">
              <img src="/images/unlock-achievements.png" alt="Unlock Achievements" className="empty-image" />
              <p>Complete lessons and challenges to unlock special achievements!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

ProgressTracker.propTypes = {
  auth: PropTypes.object.isRequired,
  progress: PropTypes.object.isRequired,
  getProgress: PropTypes.func.isRequired,
  getProgressReport: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  progress: state.progress
});

export default connect(
  mapStateToProps,
  { getProgress, getProgressReport }
)(ProgressTracker);
