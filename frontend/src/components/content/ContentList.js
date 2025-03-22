import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getContent, getContentByStrand } from '../../store/actions/contentActions';

const ContentList = ({ 
  content: { content, loading },
  getContent,
  getContentByStrand
}) => {
  const location = useLocation();
  const [currentStrand, setCurrentStrand] = useState('all');
  
  useEffect(() => {
    // Check if there's a strand parameter in the URL
    const params = new URLSearchParams(location.search);
    const strandParam = params.get('strand');
    
    if (strandParam) {
      setCurrentStrand(strandParam);
      getContentByStrand(strandParam);
    } else {
      getContent();
    }
  }, [getContent, getContentByStrand, location]);

  const handleStrandChange = (strand) => {
    setCurrentStrand(strand);
    if (strand === 'all') {
      getContent();
    } else {
      getContentByStrand(strand);
    }
  };

  return (
    <section className="container">
      <div className="content-list-page">
        <div className="page-header">
          <h1 className="large text-primary">
            <i className="fas fa-book-open"></i> Math Topics
          </h1>
          <p className="lead">Explore exciting mathematics topics and start learning!</p>
        </div>

        <div className="strand-filter">
          <div className="filter-header">
            <h2>Choose a Category</h2>
          </div>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${currentStrand === 'all' ? 'active' : ''}`}
              onClick={() => handleStrandChange('all')}
            >
              <img src="/images/all-topics.png" alt="All Topics" className="filter-icon" />
              <span>All Topics</span>
            </button>
            <button 
              className={`filter-btn ${currentStrand === 'Number and Algebra' ? 'active' : ''}`}
              onClick={() => handleStrandChange('Number and Algebra')}
            >
              <img src="/images/number-category.png" alt="Number and Algebra" className="filter-icon" />
              <span>Number and Algebra</span>
            </button>
            <button 
              className={`filter-btn ${currentStrand === 'Measurement and Geometry' ? 'active' : ''}`}
              onClick={() => handleStrandChange('Measurement and Geometry')}
            >
              <img src="/images/geometry-category.png" alt="Measurement and Geometry" className="filter-icon" />
              <span>Measurement and Geometry</span>
            </button>
            <button 
              className={`filter-btn ${currentStrand === 'Statistics and Probability' ? 'active' : ''}`}
              onClick={() => handleStrandChange('Statistics and Probability')}
            >
              <img src="/images/statistics-category.png" alt="Statistics and Probability" className="filter-icon" />
              <span>Statistics and Probability</span>
            </button>
          </div>
        </div>

        <div className="content-grid">
          {loading ? (
            <div className="loading-container">
              <img src="/images/loading-math.gif" alt="Loading" className="loading-animation" />
              <p>Loading exciting math topics...</p>
            </div>
          ) : content && content.length > 0 ? (
            content.map((item, index) => (
              <div key={index} className={`content-card ${item.strand.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="content-icon">
                  {item.strand === 'Number and Algebra' && (
                    <img src={`/images/number-icon-${index % 5 + 1}.png`} alt="Number" />
                  )}
                  {item.strand === 'Measurement and Geometry' && (
                    <img src={`/images/geometry-icon-${index % 5 + 1}.png`} alt="Geometry" />
                  )}
                  {item.strand === 'Statistics and Probability' && (
                    <img src={`/images/statistics-icon-${index % 5 + 1}.png`} alt="Statistics" />
                  )}
                </div>
                <div className="content-info">
                  <h3>{item.title}</h3>
                  <div className="content-meta">
                    <span className="strand-tag">{item.strand}</span>
                    <span className="difficulty">
                      {Array(item.difficulty).fill().map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                      {Array(5 - item.difficulty).fill().map((_, i) => (
                        <i key={i} className="far fa-star"></i>
                      ))}
                    </span>
                  </div>
                  <p>{item.instructions.substring(0, 100)}...</p>
                  <Link to={`/content/${item._id}`} className="btn btn-primary">
                    Start Learning
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-content">
              <img src="/images/no-content.png" alt="No Content" className="empty-image" />
              <p>No topics found for this category. Try selecting a different category!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

ContentList.propTypes = {
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired,
  getContentByStrand: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  content: state.content
});

export default connect(mapStateToProps, { getContent, getContentByStrand })(ContentList);
