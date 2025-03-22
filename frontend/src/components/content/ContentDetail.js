import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getContentById, getQuestions, clearContent } from '../../store/actions/contentActions';
import { updateProgress } from '../../store/actions/progressActions';

const ContentDetail = ({
  auth: { user },
  content: { currentContent, questions, loading },
  getContentById,
  getQuestions,
  clearContent,
  updateProgress
}) => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    getContentById(id);
    getQuestions(id);
    setStartTime(Date.now());

    return () => {
      clearContent();
    };
  }, [getContentById, getQuestions, clearContent, id]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    
    questions.forEach(question => {
      if (answers[question._id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(calculatedScore);
    setCompleted(true);
    setShowResults(true);

    // Calculate time spent in seconds
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    // Update progress in the database
    updateProgress(id, true, calculatedScore, timeSpent);
  };

  const renderContent = () => {
    if (!currentContent || !currentContent.content) return null;

    return (
      <div className="content-lesson">
        <div className="lesson-header">
          <div className="lesson-icon">
            {currentContent.strand === 'Number and Algebra' && (
              <img src="/images/number-lesson.png" alt="Number and Algebra" />
            )}
            {currentContent.strand === 'Measurement and Geometry' && (
              <img src="/images/geometry-lesson.png" alt="Measurement and Geometry" />
            )}
            {currentContent.strand === 'Statistics and Probability' && (
              <img src="/images/statistics-lesson.png" alt="Statistics and Probability" />
            )}
          </div>
          <div className="lesson-title">
            <h2>{currentContent.title}</h2>
            <div className="lesson-meta">
              <span className="strand-tag">{currentContent.strand}</span>
              <span className="topic-tag">{currentContent.topic}</span>
              <span className="difficulty">
                {Array(currentContent.difficulty).fill().map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
                {Array(5 - currentContent.difficulty).fill().map((_, i) => (
                  <i key={i} className="far fa-star"></i>
                ))}
              </span>
            </div>
          </div>
        </div>

        <div className="lesson-content">
          <div className="lesson-instructions">
            <h3>Instructions</h3>
            <p>{currentContent.instructions}</p>
          </div>

          <div className="lesson-body">
            {typeof currentContent.content === 'object' ? (
              Object.entries(currentContent.content).map(([key, value], index) => (
                <div key={index} className="content-section">
                  <h3>{key}</h3>
                  <div className="section-content">
                    {typeof value === 'string' ? (
                      <p>{value}</p>
                    ) : (
                      <pre>{JSON.stringify(value, null, 2)}</pre>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>{currentContent.content}</p>
            )}
          </div>

          {currentContent.examples && currentContent.examples.length > 0 && (
            <div className="lesson-examples">
              <h3>Examples</h3>
              {currentContent.examples.map((example, index) => (
                <div key={index} className="example-card">
                  <div className="example-header">
                    <h4>Example {index + 1}</h4>
                  </div>
                  <div className="example-content">
                    {typeof example === 'object' ? (
                      Object.entries(example).map(([key, value], i) => (
                        <div key={i} className="example-item">
                          <strong>{key}:</strong> {typeof value === 'string' ? value : JSON.stringify(value)}
                        </div>
                      ))
                    ) : (
                      <p>{example}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderQuestions = () => {
    if (!questions || questions.length === 0) return null;

    return (
      <div className="content-assessment">
        <div className="assessment-header">
          <h2>Let's Test Your Knowledge!</h2>
          <p>Answer these questions to show what you've learned.</p>
          <div className="assessment-mascot">
            <img src="/images/quiz-buddy.png" alt="Quiz Buddy" />
          </div>
        </div>

        <div className="questions-container">
          {questions.map((question, index) => (
            <div key={index} className="question-card">
              <div className="question-number">
                <span>Question {index + 1}</span>
              </div>
              <div className="question-content">
                <h3>{question.question}</h3>
                
                {question.questionType === 'multiple-choice' && (
                  <div className="multiple-choice">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="option">
                        <input
                          type="radio"
                          id={`q${index}-opt${optIndex}`}
                          name={`question-${index}`}
                          value={option}
                          checked={answers[question._id] === option}
                          onChange={() => handleAnswerChange(question._id, option)}
                          disabled={showResults}
                        />
                        <label htmlFor={`q${index}-opt${optIndex}`}>
                          {option}
                        </label>
                        {showResults && answers[question._id] === option && (
                          <span className={option === question.correctAnswer ? 'correct' : 'incorrect'}>
                            {option === question.correctAnswer ? '✓' : '✗'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {question.questionType === 'fill-in' && (
                  <div className="fill-in">
                    <input
                      type="text"
                      value={answers[question._id] || ''}
                      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      placeholder="Type your answer here"
                      disabled={showResults}
                    />
                    {showResults && (
                      <div className={answers[question._id] === question.correctAnswer ? 'correct-answer' : 'incorrect-answer'}>
                        {answers[question._id] === question.correctAnswer ? (
                          <span>✓ Correct!</span>
                        ) : (
                          <span>✗ The correct answer is: {question.correctAnswer}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {question.questionType === 'true-false' && (
                  <div className="true-false">
                    <div className="option">
                      <input
                        type="radio"
                        id={`q${index}-true`}
                        name={`question-${index}`}
                        value="true"
                        checked={answers[question._id] === "true"}
                        onChange={() => handleAnswerChange(question._id, "true")}
                        disabled={showResults}
                      />
                      <label htmlFor={`q${index}-true`}>True</label>
                    </div>
                    <div className="option">
                      <input
                        type="radio"
                        id={`q${index}-false`}
                        name={`question-${index}`}
                        value="false"
                        checked={answers[question._id] === "false"}
                        onChange={() => handleAnswerChange(question._id, "false")}
                        disabled={showResults}
                      />
                      <label htmlFor={`q${index}-false`}>False</label>
                    </div>
                    {showResults && (
                      <div className={answers[question._id] === question.correctAnswer ? 'correct-answer' : 'incorrect-answer'}>
                        {answers[question._id] === question.correctAnswer ? (
                          <span>✓ Correct!</span>
                        ) : (
                          <span>✗ The correct answer is: {question.correctAnswer}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {showResults && question.explanation && (
                  <div className="explanation">
                    <h4>Explanation:</h4>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {!showResults ? (
          <div className="assessment-actions">
            <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
              Submit Answers
            </button>
          </div>
        ) : (
          <div className="results-container">
            <div className="results-header">
              <h2>Your Results</h2>
            </div>
            <div className="results-content">
              <div className="score-display">
                <div className="score-circle">
                  <span className="score-value">{score}%</span>
                </div>
                <div className="score-message">
                  {score >= 80 ? (
                    <>
                      <h3>Excellent Work!</h3>
                      <img src="/images/celebration.png" alt="Celebration" className="result-image" />
                      <p>You've mastered this topic!</p>
                    </>
                  ) : score >= 60 ? (
                    <>
                      <h3>Good Job!</h3>
                      <img src="/images/good-job.png" alt="Good Job" className="result-image" />
                      <p>You're doing well, but could use a little more practice.</p>
                    </>
                  ) : (
                    <>
                      <h3>Keep Practicing!</h3>
                      <img src="/images/keep-trying.png" alt="Keep Trying" className="result-image" />
                      <p>Let's review this topic again to improve your understanding.</p>
                    </>
                  )}
                </div>
              </div>
              <div className="results-actions">
                <Link to="/content" className="btn btn-secondary">
                  Back to Topics
                </Link>
                {score < 80 && (
                  <button className="btn btn-primary" onClick={() => {
                    setAnswers({});
                    setShowResults(false);
                    setStartTime(Date.now());
                  }}>
                    Try Again
                  </button>
                )}
                <Link to="/student-dashboard" className="btn btn-success">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const steps = [
    { name: 'Learn', component: renderContent },
    { name: 'Practice', component: renderQuestions }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <img src="/images/loading-math.gif" alt="Loading" className="loading-animation" />
        <p>Loading your lesson...</p>
      </div>
    );
  }

  if (!currentContent) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Content Not Found</h2>
          <p>The lesson you're looking for doesn't exist.</p>
          <Link to="/content" className="btn btn-primary">
            Back to Topics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="container">
      <div className="content-detail-page">
        <div className="content-navigation">
          <div className="breadcrumb">
            <Link to="/content">Topics</Link> &gt; 
            <Link to={`/content?strand=${currentContent.strand}`}>{currentContent.strand}</Link> &gt; 
            <span>{currentContent.title}</span>
          </div>
          <div className="step-tabs">
            {steps.map((step, index) => (
              <button
                key={index}
                className={`step-tab ${currentStep === index ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              >
                {index === 0 && <i className="fas fa-book"></i>}
                {index === 1 && <i className="fas fa-pencil-alt"></i>}
                {step.name}
              </button>
            ))}
          </div>
        </div>

        <div className="content-main">
          {steps[currentStep].component()}
        </div>

        <div className="content-footer">
          <div className="navigation-buttons">
            {currentStep > 0 && (
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <i className="fas fa-arrow-left"></i> Back to {steps[currentStep - 1].name}
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Continue to {steps[currentStep + 1].name} <i className="fas fa-arrow-right"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

ContentDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  getContentById: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  clearContent: PropTypes.func.isRequired,
  updateProgress: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  content: state.content
});

export default connect(
  mapStateToProps,
  { getContentById, getQuestions, clearContent, updateProgress }
)(ContentDetail);
