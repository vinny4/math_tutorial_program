import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTerms, createTerm, updateTerm, deleteTerm } from '../../store/actions/termActions';

const TermManagement = ({ getTerms, createTerm, updateTerm, deleteTerm, term: { terms, loading }, auth }) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    topics: []
  });

  const [editMode, setEditMode] = useState(false);
  const [currentTermId, setCurrentTermId] = useState(null);
  const [availableTopics, setAvailableTopics] = useState([
    // Number and Algebra topics
    { id: 'na1', name: 'Place Value and Decimals', strand: 'Number and Algebra' },
    { id: 'na2', name: 'Addition and Subtraction Strategies', strand: 'Number and Algebra' },
    { id: 'na3', name: 'Multiplication and Division', strand: 'Number and Algebra' },
    { id: 'na4', name: 'Fractions and Decimals', strand: 'Number and Algebra' },
    { id: 'na5', name: 'Money and Financial Mathematics', strand: 'Number and Algebra' },
    { id: 'na6', name: 'Patterns and Algebra', strand: 'Number and Algebra' },
    
    // Measurement and Geometry topics
    { id: 'mg1', name: 'Units of Measurement', strand: 'Measurement and Geometry' },
    { id: 'mg2', name: 'Shape Properties', strand: 'Measurement and Geometry' },
    { id: 'mg3', name: 'Location and Transformation', strand: 'Measurement and Geometry' },
    { id: 'mg4', name: 'Geometric Reasoning', strand: 'Measurement and Geometry' },
    { id: 'mg5', name: 'Perimeter and Area', strand: 'Measurement and Geometry' },
    { id: 'mg6', name: 'Time and Calendars', strand: 'Measurement and Geometry' },
    
    // Statistics and Probability topics
    { id: 'sp1', name: 'Chance Experiments', strand: 'Statistics and Probability' },
    { id: 'sp2', name: 'Data Collection', strand: 'Statistics and Probability' },
    { id: 'sp3', name: 'Data Representation', strand: 'Statistics and Probability' },
    { id: 'sp4', name: 'Data Interpretation', strand: 'Statistics and Probability' },
    { id: 'sp5', name: 'Probability Scales', strand: 'Statistics and Probability' },
    { id: 'sp6', name: 'Predicting Outcomes', strand: 'Statistics and Probability' }
  ]);

  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    getTerms();
  }, [getTerms]);

  const { name, startDate, endDate, description } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    
    const termData = {
      ...formData,
      topics: selectedTopics
    };
    
    if (editMode) {
      updateTerm(currentTermId, termData);
    } else {
      createTerm(termData);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      description: '',
      topics: []
    });
    setSelectedTopics([]);
    setEditMode(false);
    setCurrentTermId(null);
  };

  const onEdit = term => {
    setFormData({
      name: term.name,
      startDate: term.startDate.substring(0, 10),
      endDate: term.endDate.substring(0, 10),
      description: term.description
    });
    setSelectedTopics(term.topics);
    setEditMode(true);
    setCurrentTermId(term._id);
  };

  const onDelete = id => {
    if (window.confirm('Are you sure you want to delete this term?')) {
      deleteTerm(id);
    }
  };

  const handleTopicSelection = e => {
    const topicId = e.target.value;
    const topic = availableTopics.find(t => t.id === topicId);
    
    if (topic && !selectedTopics.some(t => t.id === topicId)) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const removeTopic = topicId => {
    setSelectedTopics(selectedTopics.filter(topic => topic.id !== topicId));
  };

  // Only allow admin access
  if (auth.user && auth.user.role !== 'admin') {
    return (
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">Access Denied</h2>
          <p className="text-center">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="term-management">
      <div className="card mb-4">
        <div className="card-header">
          <h2 className="card-title">{editMode ? 'Edit Term' : 'Create New Term'}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Term Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                rows="3"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="topics">Add Topics</label>
              <select
                className="form-control"
                id="topics"
                onChange={handleTopicSelection}
                value=""
              >
                <option value="" disabled>Select a topic to add</option>
                <optgroup label="Number and Algebra">
                  {availableTopics
                    .filter(topic => topic.strand === 'Number and Algebra')
                    .map(topic => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    ))
                  }
                </optgroup>
                <optgroup label="Measurement and Geometry">
                  {availableTopics
                    .filter(topic => topic.strand === 'Measurement and Geometry')
                    .map(topic => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    ))
                  }
                </optgroup>
                <optgroup label="Statistics and Probability">
                  {availableTopics
                    .filter(topic => topic.strand === 'Statistics and Probability')
                    .map(topic => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    ))
                  }
                </optgroup>
              </select>
            </div>
            
            {selectedTopics.length > 0 && (
              <div className="selected-topics mb-3">
                <h4>Selected Topics:</h4>
                <ul className="list-group">
                  {selectedTopics.map(topic => (
                    <li key={topic.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <strong>{topic.name}</strong> ({topic.strand})
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => removeTopic(topic.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-2">
                {editMode ? 'Update Term' : 'Create Term'}
              </button>
              {editMode && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Term List</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading terms...</p>
          ) : terms.length === 0 ? (
            <p>No terms found. Create a new term to get started.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Topics</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {terms.map(term => (
                    <tr key={term._id}>
                      <td>{term.name}</td>
                      <td>{new Date(term.startDate).toLocaleDateString()}</td>
                      <td>{new Date(term.endDate).toLocaleDateString()}</td>
                      <td>{term.topics.length} topics</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary mr-2"
                          onClick={() => onEdit(term)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => onDelete(term._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  term: state.term,
  auth: state.auth
});

export default connect(mapStateToProps, { getTerms, createTerm, updateTerm, deleteTerm })(TermManagement);
