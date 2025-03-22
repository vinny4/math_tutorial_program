import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getContent } from '../../store/actions/contentActions';

const AdminDashboard = ({ 
  auth: { user }, 
  content: { content, loading },
  getContent
}) => {
  useEffect(() => {
    getContent();
  }, [getContent]);

  return (
    <section className="container">
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1 className="large text-primary">
            <img src="/images/admin-avatar.png" alt="Admin Avatar" className="dashboard-avatar" />
            Admin Dashboard
          </h1>
          <p className="lead">Manage content, users, and system settings</p>
        </div>

        <div className="dashboard-cards">
          <div className="card">
            <div className="card-header">
              <h2>
                <i className="fas fa-users"></i> User Management
              </h2>
            </div>
            <div className="card-body">
              <div className="admin-actions">
                <Link to="/admin/users" className="btn btn-primary">
                  <i className="fas fa-user-cog"></i> Manage Users
                </Link>
                <Link to="/admin/users/new" className="btn btn-secondary">
                  <i className="fas fa-user-plus"></i> Add New User
                </Link>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>
                <i className="fas fa-book"></i> Content Management
              </h2>
            </div>
            <div className="card-body">
              <div className="admin-actions">
                <Link to="/admin/content" className="btn btn-primary">
                  <i className="fas fa-edit"></i> Manage Content
                </Link>
                <Link to="/admin/content/new" className="btn btn-secondary">
                  <i className="fas fa-plus-circle"></i> Add New Content
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="content-overview">
          <h2 className="section-title">
            <i className="fas fa-chart-bar"></i> Content Overview
          </h2>
          
          {loading ? (
            <div className="loading-spinner">
              <img src="/images/loading-math.gif" alt="Loading" />
            </div>
          ) : content ? (
            <div className="content-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <img src="/images/number-category.png" alt="Number and Algebra" />
                </div>
                <div className="stat-info">
                  <h3>Number and Algebra</h3>
                  <div className="stat-count">{content.filter(item => item.strand === 'Number and Algebra').length}</div>
                  <p>topics</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <img src="/images/geometry-category.png" alt="Measurement and Geometry" />
                </div>
                <div className="stat-info">
                  <h3>Measurement and Geometry</h3>
                  <div className="stat-count">{content.filter(item => item.strand === 'Measurement and Geometry').length}</div>
                  <p>topics</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <img src="/images/statistics-category.png" alt="Statistics and Probability" />
                </div>
                <div className="stat-info">
                  <h3>Statistics and Probability</h3>
                  <div className="stat-count">{content.filter(item => item.strand === 'Statistics and Probability').length}</div>
                  <p>topics</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <img src="/images/total-content.png" alt="Total Content" />
                </div>
                <div className="stat-info">
                  <h3>Total Content</h3>
                  <div className="stat-count">{content.length}</div>
                  <p>topics</p>
                </div>
              </div>
            </div>
          ) : (
            <p>No content available.</p>
          )}
        </div>

        <div className="system-settings">
          <h2 className="section-title">
            <i className="fas fa-cogs"></i> System Settings
          </h2>
          <div className="settings-cards">
            <div className="settings-card">
              <div className="settings-icon">
                <img src="/images/term-settings.png" alt="Term Settings" />
              </div>
              <h3>Term Settings</h3>
              <p>Configure term dates and default topics</p>
              <Link to="/admin/terms" className="btn btn-settings">
                Manage Terms
              </Link>
            </div>

            <div className="settings-card">
              <div className="settings-icon">
                <img src="/images/content-update.png" alt="Content Updates" />
              </div>
              <h3>Content Updates</h3>
              <p>Schedule and manage content updates</p>
              <Link to="/admin/updates" className="btn btn-settings">
                Manage Updates
              </Link>
            </div>

            <div className="settings-card">
              <div className="settings-icon">
                <img src="/images/backup-restore.png" alt="Backup & Restore" />
              </div>
              <h3>Backup & Restore</h3>
              <p>Manage system backups and restoration</p>
              <Link to="/admin/backup" className="btn btn-settings">
                Backup System
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  content: state.content
});

export default connect(mapStateToProps, { getContent })(AdminDashboard);
