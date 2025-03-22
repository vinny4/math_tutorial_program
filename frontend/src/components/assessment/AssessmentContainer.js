import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Assessment from './Assessment';
import AdaptiveQuestionGenerator from './AdaptiveQuestionGenerator';

const AssessmentContainer = ({
  auth: { user },
  content: { currentContent },
  progress: { progress }
}) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousPerformance, setPreviousPerformance] = useState([]);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    if (user && progress && currentContent) {
      // Filter progress for the current user and related to the same strand
      const relevantProgress = progress.filter(item => 
        item.userId === user._id && 
        item.contentId && 
        item.contentId.strand === currentContent.strand &&
        item.completed
      );
      
      setPreviousPerformance(relevantProgress);
    }
  }, [user, progress, currentContent]);
  
  const handleQuestionsGenerated = (generatedQuestions) => {
    setQuestions(generatedQuestions);
    setLoading(false);
  };
  
  const handleAssessmentComplete = (achievedScore) => {
    setAssessmentCompleted(true);
    setScore(achievedScore);
  };
  
  if (!currentContent) {
    return (
      <div className="assessment-container">
        <p>No content selected. Please select a topic first.</p>
      </div>
    );
  }
  
  return (
    <div className="assessment-container">
      {loading ? (
        <div className="assessment-loading">
          <AdaptiveQuestionGenerator 
            contentId={currentContent._id}
            strand={currentContent.strand}
            topic={currentContent.topic}
            difficulty={currentContent.difficulty}
            previousPerformance={previousPerformance}
            onQuestionsGenerated={handleQuestionsGenerated}
          />
          <div className="loading-message">
            <img src="/images/loading-math.gif" alt="Loading" className="loading-animation" />
            <p>Creating fun questions just for you...</p>
          </div>
        </div>
      ) : (
        <Assessment 
          questions={questions}
          contentId={currentContent._id}
          onComplete={handleAssessmentComplete}
        />
      )}
      
      {assessmentCompleted && score >= 80 && (
        <div className="next-steps">
          <h3>What's Next?</h3>
          <p>Great job! Here are some suggestions for what to learn next:</p>
          <div className="suggestion-cards">
            {/* These would be dynamically generated based on curriculum progression */}
            <div className="suggestion-card">
              <div className="suggestion-icon">
                <img src="/images/next-topic.png" alt="Next Topic" />
              </div>
              <h4>Continue Your Learning Journey</h4>
              <p>Ready to explore more advanced topics in {currentContent.strand}?</p>
              <button className="btn btn-suggestion">Find Next Topic</button>
            </div>
            <div className="suggestion-card">
              <div className="suggestion-icon">
                <img src="/images/practice.png" alt="Practice" />
              </div>
              <h4>Practice Makes Perfect</h4>
              <p>Want to strengthen your skills with more practice?</p>
              <button className="btn btn-suggestion">More Practice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AssessmentContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  progress: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  content: state.content,
  progress: state.progress
});

export default connect(mapStateToProps)(AssessmentContainer);
