import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProgress } from '../../store/actions/progressActions';

const MultipleChoiceQuestion = ({ 
  question, 
  index, 
  handleAnswerChange, 
  userAnswer, 
  showResults,
  correctAnswer
}) => {
  return (
    <div className="question-card multiple-choice-question">
      <div className="question-number">
        <span>Question {index + 1}</span>
      </div>
      <div className="question-content">
        <h3>{question.question}</h3>
        
        {question.image && (
          <div className="question-image">
            <img src={question.image} alt={`Question ${index + 1}`} />
          </div>
        )}
        
        <div className="multiple-choice">
          {question.options.map((option, optIndex) => (
            <div key={optIndex} className="option">
              <input
                type="radio"
                id={`q${index}-opt${optIndex}`}
                name={`question-${index}`}
                value={option}
                checked={userAnswer === option}
                onChange={() => handleAnswerChange(option)}
                disabled={showResults}
              />
              <label htmlFor={`q${index}-opt${optIndex}`} className={
                showResults ? 
                  (option === correctAnswer ? 'correct-option' : 
                   userAnswer === option && option !== correctAnswer ? 'incorrect-option' : '') 
                : ''
              }>
                {option}
                {showResults && option === correctAnswer && (
                  <span className="correct-mark">✓</span>
                )}
                {showResults && userAnswer === option && option !== correctAnswer && (
                  <span className="incorrect-mark">✗</span>
                )}
              </label>
            </div>
          ))}
        </div>
        
        {showResults && question.explanation && (
          <div className="explanation">
            <h4>Explanation:</h4>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FillInQuestion = ({ 
  question, 
  index, 
  handleAnswerChange, 
  userAnswer, 
  showResults,
  correctAnswer
}) => {
  return (
    <div className="question-card fill-in-question">
      <div className="question-number">
        <span>Question {index + 1}</span>
      </div>
      <div className="question-content">
        <h3>{question.question}</h3>
        
        {question.image && (
          <div className="question-image">
            <img src={question.image} alt={`Question ${index + 1}`} />
          </div>
        )}
        
        <div className="fill-in">
          <input
            type="text"
            value={userAnswer || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your answer here"
            disabled={showResults}
            className={
              showResults ? 
                (userAnswer === correctAnswer ? 'correct-input' : 'incorrect-input') 
              : ''
            }
          />
          {showResults && (
            <div className={userAnswer === correctAnswer ? 'correct-answer' : 'incorrect-answer'}>
              {userAnswer === correctAnswer ? (
                <div className="feedback-correct">
                  <img src="/images/correct-answer.png" alt="Correct!" />
                  <span>Great job! That's correct!</span>
                </div>
              ) : (
                <div className="feedback-incorrect">
                  <img src="/images/incorrect-answer.png" alt="Incorrect" />
                  <span>The correct answer is: {correctAnswer}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {showResults && question.explanation && (
          <div className="explanation">
            <h4>Explanation:</h4>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TrueFalseQuestion = ({ 
  question, 
  index, 
  handleAnswerChange, 
  userAnswer, 
  showResults,
  correctAnswer
}) => {
  return (
    <div className="question-card true-false-question">
      <div className="question-number">
        <span>Question {index + 1}</span>
      </div>
      <div className="question-content">
        <h3>{question.question}</h3>
        
        {question.image && (
          <div className="question-image">
            <img src={question.image} alt={`Question ${index + 1}`} />
          </div>
        )}
        
        <div className="true-false">
          <div className="option">
            <input
              type="radio"
              id={`q${index}-true`}
              name={`question-${index}`}
              value="true"
              checked={userAnswer === "true"}
              onChange={() => handleAnswerChange("true")}
              disabled={showResults}
            />
            <label htmlFor={`q${index}-true`} className={
              showResults ? 
                (correctAnswer === "true" ? 'correct-option' : 
                 userAnswer === "true" && correctAnswer !== "true" ? 'incorrect-option' : '') 
              : ''
            }>
              True
              {showResults && correctAnswer === "true" && (
                <span className="correct-mark">✓</span>
              )}
              {showResults && userAnswer === "true" && correctAnswer !== "true" && (
                <span className="incorrect-mark">✗</span>
              )}
            </label>
          </div>
          <div className="option">
            <input
              type="radio"
              id={`q${index}-false`}
              name={`question-${index}`}
              value="false"
              checked={userAnswer === "false"}
              onChange={() => handleAnswerChange("false")}
              disabled={showResults}
            />
            <label htmlFor={`q${index}-false`} className={
              showResults ? 
                (correctAnswer === "false" ? 'correct-option' : 
                 userAnswer === "false" && correctAnswer !== "false" ? 'incorrect-option' : '') 
              : ''
            }>
              False
              {showResults && correctAnswer === "false" && (
                <span className="correct-mark">✓</span>
              )}
              {showResults && userAnswer === "false" && correctAnswer !== "false" && (
                <span className="incorrect-mark">✗</span>
              )}
            </label>
          </div>
        </div>
        
        {showResults && question.explanation && (
          <div className="explanation">
            <h4>Explanation:</h4>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MatchingQuestion = ({ 
  question, 
  index, 
  handleAnswerChange, 
  userAnswer, 
  showResults,
  correctAnswer
}) => {
  const [matches, setMatches] = useState({});
  
  useEffect(() => {
    if (userAnswer) {
      setMatches(JSON.parse(userAnswer));
    } else {
      const initialMatches = {};
      question.items.forEach(item => {
        initialMatches[item.id] = '';
      });
      setMatches(initialMatches);
      handleAnswerChange(JSON.stringify(initialMatches));
    }
  }, [question, userAnswer, handleAnswerChange]);
  
  const updateMatch = (itemId, matchId) => {
    const updatedMatches = {
      ...matches,
      [itemId]: matchId
    };
    setMatches(updatedMatches);
    handleAnswerChange(JSON.stringify(updatedMatches));
  };
  
  const isCorrectMatch = (itemId, matchId) => {
    const correctMatches = JSON.parse(correctAnswer);
    return correctMatches[itemId] === matchId;
  };
  
  return (
    <div className="question-card matching-question">
      <div className="question-number">
        <span>Question {index + 1}</span>
      </div>
      <div className="question-content">
        <h3>{question.question}</h3>
        
        {question.image && (
          <div className="question-image">
            <img src={question.image} alt={`Question ${index + 1}`} />
          </div>
        )}
        
        <div className="matching-container">
          <div className="matching-items">
            {question.items.map((item, itemIndex) => (
              <div key={itemIndex} className="matching-item">
                <div className="item-text">{item.text}</div>
                <div className="item-matches">
                  <select 
                    value={matches[item.id] || ''}
                    onChange={(e) => updateMatch(item.id, e.target.value)}
                    disabled={showResults}
                    className={
                      showResults && matches[item.id] ? 
                        (isCorrectMatch(item.id, matches[item.id]) ? 'correct-select' : 'incorrect-select') 
                      : ''
                    }
                  >
                    <option value="">-- Select a match --</option>
                    {question.matches.map((match, matchIndex) => (
                      <option key={matchIndex} value={match.id}>
                        {match.text}
                      </option>
                    ))}
                  </select>
                  {showResults && matches[item.id] && (
                    isCorrectMatch(item.id, matches[item.id]) ? (
                      <span className="correct-mark">✓</span>
                    ) : (
                      <span className="incorrect-mark">✗</span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {showResults && question.explanation && (
          <div className="explanation">
            <h4>Explanation:</h4>
            <p>{question.explanation}</p>
            <div className="correct-matches">
              <h5>Correct Matches:</h5>
              <ul>
                {question.items.map((item, itemIndex) => {
                  const correctMatches = JSON.parse(correctAnswer);
                  const correctMatchId = correctMatches[item.id];
                  const correctMatch = question.matches.find(m => m.id === correctMatchId);
                  
                  return (
                    <li key={itemIndex}>
                      <strong>{item.text}</strong> → {correctMatch ? correctMatch.text : 'No match'}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DragDropQuestion = ({ 
  question, 
  index, 
  handleAnswerChange, 
  userAnswer, 
  showResults,
  correctAnswer
}) => {
  const [dragItems, setDragItems] = useState([]);
  const [dropZones, setDropZones] = useState([]);
  
  useEffect(() => {
    if (userAnswer) {
      setDropZones(JSON.parse(userAnswer));
    } else {
      // Initialize empty drop zones
      const initialDropZones = question.dropZones.map(zone => ({
        ...zone,
        itemId: null
      }));
      setDropZones(initialDropZones);
      handleAnswerChange(JSON.stringify(initialDropZones));
    }
    
    // Initialize drag items
    setDragItems(question.dragItems);
  }, [question, userAnswer, handleAnswerChange]);
  
  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData('itemId', itemId);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    
    // Update drop zones
    const updatedDropZones = dropZones.map(zone => {
      // If this is the target zone, add the item
      if (zone.id === zoneId) {
        return { ...zone, itemId };
      }
      // If the item was in another zone, remove it
      if (zone.itemId === itemId) {
        return { ...zone, itemId: null };
      }
      return zone;
    });
    
    setDropZones(updatedDropZones);
    handleAnswerChange(JSON.stringify(updatedDropZones));
  };
  
  const isCorrectDrop = (zoneId, itemId) => {
    if (!correctAnswer || !itemId) return false;
    
    const correctDropZones = JSON.parse(correctAnswer);
    const correctZone = correctDropZones.find(zone => zone.id === zoneId);
    return correctZone && correctZone.itemId === itemId;
  };
  
  return (
    <div className="question-card drag-drop-question">
      <div className="question-number">
        <span>Question {index + 1}</span>
      </div>
      <div className="question-content">
        <h3>{question.question}</h3>
        
        {question.image && (
          <div className="question-image">
            <img src={question.image} alt={`Question ${index + 1}`} />
          </div>
        )}
        
        <div className="drag-drop-container">
          <div className="drag-items">
            {dragItems.map((item, itemIndex) => {
              // Check if item is already in a drop zone
              const isPlaced = dropZones.some(zone => zone.itemId === item.id);
              
              return !isPlaced || showResults ? (
                <div 
                  key={itemIndex}
                  className="drag-item"
                  draggable={!showResults}
                  onDragStart={(e) => handleDragStart(e, item.id)}
                >
                  {item.text}
                </div>
              ) : null;
            })}
          </div>
          
          <div className="drop-zones">
            {dropZones.map((zone, zoneIndex) => {
              const placedItem = zone.itemId ? 
                dragItems.find(item => item.id === zone.itemId) : null;
              
              return (
                <div 
                  key={zoneIndex}
                  className={`drop-zone ${
                    showResults ? 
                      (placedItem && isCorrectDrop(zone.id, zone.itemId) ? 'correct-drop' : 
                       placedItem ? 'incorrect-drop' : '') 
                    : ''
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, zone.id)}
                >
                  <div className="zone-label">{zone.label}</div>
                  {placedItem && (
                    <div className="placed-item">
                      {placedItem.text}
                      {showResults && (
                        isCorrectDrop(zone.id, zone.itemId) ? (
                          <span className="correct-mark">✓</span>
                        ) : (
                          <span className="incorrect-mark">✗</span>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {showResults && question.explanation && (
          <div className="explanation">
            <h4>Explanation:</h4>
            <p>{question.explanation}</p>
            <div className="correct-placements">
              <h5>Correct Placements:</h5>
              <ul>
                {question.dropZones.map((zone, zoneIndex) => {
                  const correctDropZones = JSON.parse(correctAnswer);
                  const correctZone = correctDropZones.find(z => z.id === zone.id);
                  const correctItem = correctZone && correctZone.itemId ? 
                    dragItems.find(item => item.id === correctZone.itemId) : null;
                  
                  return (
                    <li key={zoneIndex}>
                      <strong>{zone.label}</strong> → {correctItem ? correctItem.text : 'No item'}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OrderingQuestion = ({ 
  question, 
  index, 
  handleAnswerChange, 
  userAnswer, 
  showResults,
  correctAnswer
}) => {
  const [orderedItems, setOrderedItems] = useState([]);
  
  useEffect(() => {
    if (userAnswer) {
      setOrderedItems(JSON.parse(userAnswer));
    } else {
      // Initialize with shuffled items
      const shuffled = [...question.items].sort(() => Math.random() - 0.5);
      setOrderedItems(shuffled);
      handleAnswerChange(JSON.stringify(shuffled));
    }
  }, [question, userAnswer, handleAnswerChange]);
  
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...orderedItems];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    
    setOrderedItems(updatedItems);
    handleAnswerChange(JSON.stringify(updatedItems));
  };
  
  const isCorrectOrder = () => {
    if (!correctAnswer) return false;
    
    const correctOrder = JSON.parse(correctAnswer);
    return JSON.stringify(orderedItems) === JSON.stringify(correctOrder);
  };
  
  return (
    <div className="question-card ordering-question">
      <div className="question-number">
        <span>Question {index + 1}</span>
      </div>
      <div className="question-content">
        <h3>{question.question}</h3>
        
        {question.image && (
          <div className="question-image">
            <img src={question.image} alt={`Question ${index + 1}`} />
          </div>
        )}
        
        <div className="ordering-container">
          <div className="ordered-items">
            {orderedItems.map((item, itemIndex) => (
              <div key={itemIndex} className="ordered-item">
                <div className="item-text">{item.text}</div>
                <div className="item-controls">
                  {!showResults && (
                    <>
                      <button 
                        className="move-up" 
                        disabled={itemIndex === 0}
                        onClick={() => moveItem(itemIndex, itemIndex - 1)}
                      >
                        <i className="fas fa-arrow-up"></i>
                      </button>
                      <button 
                        className="move-down" 
                        disabled={itemIndex === orderedItems.length - 1}
                        onClick={() => moveItem(itemIndex, itemIndex + 1)}
                      >
                        <i className="fas fa-arrow-down"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {showResults && (
          <div className="ordering-result">
            {isCorrectOrder() ? (
              <div className="feedback-correct">
                <img src="/images/correct-order.png" alt="Correct Order!" />
                <span>Perfect! You got the order right!</span>
              </div>
            ) : (
              <div className="feedback-incorrect">
                <img src="/images/incorrect-order.png" alt="Incorrect Order" />
                <span>Not quite right. Here's the correct order:</span>
                <div className="correct-order">
                  {JSON.parse(correctAnswer).map((item, itemIndex) => (
                    <div key={itemIndex} className="correct-item">
                      <span className="item-number">{itemIndex + 1}.</span>
                      <span className="item-text">{item.text}</span>
                    </div>
                  ))}
                </div>
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
  );
};

const DrawingQuestion = ({ 
  question, 
  index, 
  handleAnswerChange, 
  userAnswer, 
  showResults
}) => {
  const [drawing, setDrawing] = useState(null);
  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas properties
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000000';
      
      setContext(ctx);
      
      // Load existing drawing if available
      if (userAnswer) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = userAnswer;
        setDrawing(userAnswer);
      }
    }
  }, [canvasRef, userAnswer]);
  
  const startDrawing = (e) => {
    if (showResults) return;
    
    const { offsetX, offsetY } = getCoordinates(e);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  
  const draw = (e) => {
    if (!isDrawing || showResults) return;
    
    const { offsetX, offsetY } = getCoordinates(e);
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };
  
  const stopDrawing = () => {
    if (!isDrawing || showResults) return;
    
    context.closePath();
    setIsDrawing(false);
    
    // Save the drawing
    const dataUrl = canvasRef.current.toDataURL();
    setDrawing(dataUrl);
    handleAnswerChange(dataUrl);
  };
  
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // For mouse events
    if (e.offsetX && e.offsetY) {
      return { offsetX: e.offsetX, offsetY: e.offsetY };
    }
    
    // For touch events
    const touch = e.touches[0] || e.changedTouches[0];
    return {
      offsetX: touch.clientX - rect.left,
      offsetY: touch.clientY - rect.top
    };
  };
  
  const clearCanvas = () => {
    if (showResults) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawing(null);
    handleAnswerChange(null);
  };
  
  return (
    <div className="question-card drawing-question">
      <div className="question-number">
        <span>Question {index + 1}</span>
      </div>
      <div className="question-content">
        <h3>{question.question}</h3>
        
        {question.image && (
          <div className="question-image">
            <img src={question.image} alt={`Question ${index + 1}`} />
          </div>
        )}
        
        <div className="drawing-container">
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className={showResults ? 'canvas-disabled' : ''}
          />
          
          {!showResults && (
            <div className="drawing-controls">
              <button className="clear-button" onClick={clearCanvas}>
                Clear Drawing
              </button>
            </div>
          )}
        </div>
        
        {showResults && question.explanation && (
          <div className="explanation">
            <h4>Explanation:</h4>
            <p>{question.explanation}</p>
            {question.sampleAnswer && (
              <div className="sample-answer">
                <h5>Sample Answer:</h5>
                <img src={question.sampleAnswer} alt="Sample Answer" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Assessment = ({ 
  questions, 
  contentId, 
  updateProgress,
  onComplete
}) => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  
  useEffect(() => {
    setStartTime(Date.now());
  }, []);
  
  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };
  
  const calculateScore = () => {
    let correctCount = 0;
    let totalQuestions = 0;
    
    questions.forEach(question => {
      if (question.questionType === 'drawing') {
        // Drawing questions are manually graded or self-assessed
        return;
      }
      
      totalQuestions++;
      
      if (question.questionType === 'matching') {
        const userMatches = answers[question._id] ? JSON.parse(answers[question._id]) : {};
        const correctMatches = JSON.parse(question.correctAnswer);
        
        let allCorrect = true;
        for (const itemId in correctMatches) {
          if (userMatches[itemId] !== correctMatches[itemId]) {
            allCorrect = false;
            break;
          }
        }
        
        if (allCorrect) correctCount++;
      } else if (question.questionType === 'drag-drop') {
        const userDrops = answers[question._id] ? JSON.parse(answers[question._id]) : [];
        const correctDrops = JSON.parse(question.correctAnswer);
        
        let allCorrect = true;
        for (let i = 0; i < correctDrops.length; i++) {
          const correctZone = correctDrops[i];
          const userZone = userDrops.find(zone => zone.id === correctZone.id);
          
          if (!userZone || userZone.itemId !== correctZone.itemId) {
            allCorrect = false;
            break;
          }
        }
        
        if (allCorrect) correctCount++;
      } else if (question.questionType === 'ordering') {
        const userOrder = answers[question._id] ? JSON.parse(answers[question._id]) : [];
        const correctOrder = JSON.parse(question.correctAnswer);
        
        if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
          correctCount++;
        }
      } else {
        // Multiple choice, fill-in, true-false
        if (answers[question._id] === question.correctAnswer) {
          correctCount++;
        }
      }
    });
    
    return totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  };
  
  const handleSubmit = () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setShowResults(true);
    
    // Calculate time spent in seconds
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    // Update progress in the database
    updateProgress(contentId, true, calculatedScore, timeSpent);
    
    // Notify parent component
    if (onComplete) {
      onComplete(calculatedScore);
    }
  };
  
  const renderQuestion = (question, index) => {
    const props = {
      question,
      index,
      handleAnswerChange: (answer) => handleAnswerChange(question._id, answer),
      userAnswer: answers[question._id],
      showResults,
      correctAnswer: question.correctAnswer
    };
    
    switch (question.questionType) {
      case 'multiple-choice':
        return <MultipleChoiceQuestion {...props} />;
      case 'fill-in':
        return <FillInQuestion {...props} />;
      case 'true-false':
        return <TrueFalseQuestion {...props} />;
      case 'matching':
        return <MatchingQuestion {...props} />;
      case 'drag-drop':
        return <DragDropQuestion {...props} />;
      case 'ordering':
        return <OrderingQuestion {...props} />;
      case 'drawing':
        return <DrawingQuestion {...props} />;
      default:
        return <MultipleChoiceQuestion {...props} />;
    }
  };
  
  return (
    <div className="assessment-component">
      <div className="assessment-header">
        <h2>Let's Test Your Knowledge!</h2>
        <p>Answer these questions to show what you've learned.</p>
        <div className="assessment-mascot">
          <img src="/images/quiz-buddy.png" alt="Quiz Buddy" />
        </div>
      </div>
      
      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={index} className="question-wrapper">
            {renderQuestion(question, index)}
          </div>
        ))}
      </div>
      
      {!showResults ? (
        <div className="assessment-actions">
          <button 
            className="btn btn-primary btn-lg" 
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
          >
            Submit Answers
          </button>
          {Object.keys(answers).length < questions.length && (
            <p className="answer-reminder">
              Please answer all questions before submitting.
            </p>
          )}
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
          </div>
        </div>
      )}
    </div>
  );
};

Assessment.propTypes = {
  questions: PropTypes.array.isRequired,
  contentId: PropTypes.string.isRequired,
  updateProgress: PropTypes.func.isRequired,
  onComplete: PropTypes.func
};

export default connect(null, { updateProgress })(Assessment);
