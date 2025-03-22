import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getTerms } from '../../store/actions/termActions';
import { getContent } from '../../store/actions/contentActions';

const ParentDashboard = ({ 
  auth: { user }, 
  term: { terms, loading: termLoading },
  content: { content, loading: contentLoading },
  getTerms,
  getContent
}) => {
  useEffect(() => {
    getTerms();
    getContent();
  }, [getTerms, getContent]);

  return (
    <section className="container">
      <div className="parent-dashboard">
        <div className="dashboard-header">
          <h1 className="large text-primary">
            <img src="/images/parent-avatar.png" alt="Parent Avatar" className="dashboard-avatar" />
            Welcome, {user && user.firstName}!
          </h1>
          <p className="lead">Monitor your child's progress and manage their learning journey</p>
        </div>

        <div className="dashboard-cards">
          <div className="card">
            <div className="card-header">
              <h2>
                <i className="fas fa-child"></i> Your Children
              </h2>
            </div>
            <div className="card-body">
              {user && user.studentIds && user.studentIds.length > 0 ? (
                <div className="students-list">
                  {user.studentIds.map((studentId, index) => (
                    <div key={index} className="student-item">
                      <div className="student-avatar">
                        <img src={`/images/student-avatar-${index % 5 + 1}.png`} alt="Student" />
                      </div>
                      <div className="student-info">
                        <h3>{studentId.firstName} {studentId.lastName}</h3>
                        <Link to={`/progress/${studentId._id}`} className="btn btn-sm">
                          View Progress
                        </Link>
                      </div>
                    </div>
                  ))}
                  <div className="add-student">
                    <Link to="/register?role=student&parentId=${user._id}" className="btn btn-primary">
                      <i className="fas fa-plus"></i> Add Child
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="empty-students">
                  <img src="/images/add-child.png" alt="Add Child" />
                  <p>You haven't added any children yet. Add a child to start monitoring their progress.</p>
                  <Link to={`/register?role=student&parentId=${user && user._id}`} className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add Child
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>
                <i className="fas fa-calendar-alt"></i> Terms Management
              </h2>
            </div>
            <div className="card-body">
              {termLoading ? (
                <div className="loading-spinner">
                  <img src="/images/loading-math.gif" alt="Loading" />
                </div>
              ) : terms && terms.length > 0 ? (
                <div className="terms-list">
                  {terms.map((term, index) => (
                    <div key={index} className="term-item">
                      <h3>{term.name}</h3>
                      <p>
                        {new Date(term.startDate).toLocaleDateString()} - 
                        {new Date(term.endDate).toLocaleDateString()}
                      </p>
                      <div className="term-actions">
                        <Link to={`/terms/${term._id}`} className="btn btn-sm">
                          Edit
                        </Link>
                        <Link to={`/terms/${term._id}/topics`} className="btn btn-sm">
                          View Topics
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-terms">
                  <img src="/images/create-term.png" alt="Create Term" />
                  <p>No terms created yet. Create a term to organize your child's learning.</p>
                </div>
              )}
              <Link to="/terms/new" className="btn btn-primary">
                <i className="fas fa-plus"></i> Create New Term
              </Link>
            </div>
          </div>
        </div>

        <div className="curriculum-overview">
          <h2 className="section-title">
            <i className="fas fa-book"></i> Curriculum Overview
          </h2>
          <div className="strand-overview">
            {contentLoading ? (
              <div className="loading-spinner">
                <img src="/images/loading-math.gif" alt="Loading" />
              </div>
            ) : content ? (
              <div className="strand-cards">
                <div className="strand-card">
                  <div className="strand-icon">
                    <img src="/images/number-category.png" alt="Number and Algebra" />
                  </div>
                  <h3>Number and Algebra</h3>
                  <p>{content.filter(item => item.strand === 'Number and Algebra').length} topics</p>
                  <div className="strand-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                  <Link to="/content?strand=Number and Algebra" className="btn btn-strand">
                    View Topics
                  </Link>
                </div>

                <div className="strand-card">
                  <div className="strand-icon">
                    <img src="/images/geometry-category.png" alt="Measurement and Geometry" />
                  </div>
                  <h3>Measurement and Geometry</h3>
                  <p>{content.filter(item => item.strand === 'Measurement and Geometry').length} topics</p>
                  <div className="strand-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                  <Link to="/content?strand=Measurement and Geometry" className="btn btn-strand">
                    View Topics
                  </Link>
                </div>

                <div className="strand-card">
                  <div className="strand-icon">
                    <img src="/images/statistics-category.png" alt="Statistics and Probability" />
                  </div>
                  <h3>Statistics and Probability</h3>
                  <p>{content.filter(item => item.strand === 'Statistics and Probability').length} topics</p>
                  <div className="strand-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                  <Link to="/content?strand=Statistics and Probability" className="btn btn-strand">
                    View Topics
                  </Link>
                </div>
              </div>
            ) : (
              <p>No curriculum content available.</p>
            )}
          </div>
        </div>

        <div className="parent-resources">
          <h2 className="section-title">
            <i className="fas fa-tools"></i> Parent Resources
          </h2>
          <div className="resources-cards">
            <div className="resource-card">
              <div className="resource-icon">
                <img src="/images/guide-icon.png" alt="Parent Guide" />
              </div>
              <h3>Parent Guide</h3>
              <p>Learn how to support your child's mathematics learning journey</p>
              <a href="/resources/parent-guide.pdf" className="btn btn-resource" target="_blank">
                Download Guide
              </a>
            </div>

            <div className="resource-card">
              <div className="resource-icon">
                <img src="/images/curriculum-icon.png" alt="WA Curriculum" />
              </div>
              <h3>WA Curriculum</h3>
              <p>Understand the Year 5 mathematics curriculum requirements</p>
              <a href="https://k10outline.scsa.wa.edu.au/home/teaching/curriculum-browser/mathematics-v8/year-5" className="btn btn-resource" target="_blank">
                View Curriculum
              </a>
            </div>

            <div className="resource-card">
              <div className="resource-icon">
                <img src="/images/activities-icon.png" alt="Home Activities" />
              </div>
              <h3>Home Activities</h3>
              <p>Fun mathematics activities to do at home with your child</p>
              <a href="/resources/home-activities.pdf" className="btn btn-resource" target="_blank">
                View Activities
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ParentDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  term: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  getTerms: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  term: state.term,
  content: state.content
});

export default connect(mapStateToProps, { getTerms, getContent })(ParentDashboard);
