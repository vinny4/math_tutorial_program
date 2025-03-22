import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProgress } from '../../store/actions/progressActions';

const GameBasedAssessment = ({ 
  contentId, 
  strand,
  difficulty,
  updateProgress,
  onComplete
}) => {
  const [gameState, setGameState] = React.useState('intro');
  const [score, setScore] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(60);
  const [startTime, setStartTime] = React.useState(null);
  const [characterPosition, setCharacterPosition] = React.useState(0);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const [isCorrect, setIsCorrect] = React.useState(false);
  
  // Generate game questions based on strand and difficulty
  React.useEffect(() => {
    generateQuestions();
  }, [strand, difficulty]);
  
  // Timer for game
  React.useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);
  
  const generateQuestions = () => {
    // Sample questions based on strand
    let gameQuestions = [];
    
    if (strand === 'Number and Algebra') {
      gameQuestions = [
        {
          question: 'What is 25 + 18?',
          options: ['43', '42', '44', '53'],
          correctAnswer: '43',
          explanation: '25 + 18 = 43'
        },
        {
          question: 'What is 7 × 6?',
          options: ['42', '36', '48', '56'],
          correctAnswer: '42',
          explanation: '7 × 6 = 42'
        },
        {
          question: 'What is 50 - 24?',
          options: ['26', '24', '28', '36'],
          correctAnswer: '26',
          explanation: '50 - 24 = 26'
        },
        {
          question: 'What is 63 ÷ 9?',
          options: ['7', '8', '9', '6'],
          correctAnswer: '7',
          explanation: '63 ÷ 9 = 7'
        },
        {
          question: 'What is the next number in the pattern: 5, 10, 15, 20, ...?',
          options: ['25', '30', '22', '24'],
          correctAnswer: '25',
          explanation: 'The pattern adds 5 each time, so 20 + 5 = 25'
        }
      ];
    } else if (strand === 'Measurement and Geometry') {
      gameQuestions = [
        {
          question: 'How many sides does a hexagon have?',
          options: ['6', '5', '7', '8'],
          correctAnswer: '6',
          explanation: 'A hexagon has 6 sides'
        },
        {
          question: 'What is the perimeter of a square with sides of 4cm?',
          options: ['16cm', '12cm', '8cm', '4cm'],
          correctAnswer: '16cm',
          explanation: 'Perimeter = 4 × side length = 4 × 4cm = 16cm'
        },
        {
          question: 'What shape has 4 equal sides and 4 right angles?',
          options: ['Square', 'Rectangle', 'Rhombus', 'Trapezoid'],
          correctAnswer: 'Square',
          explanation: 'A square has 4 equal sides and 4 right angles'
        },
        {
          question: 'How many faces does a cube have?',
          options: ['6', '8', '12', '4'],
          correctAnswer: '6',
          explanation: 'A cube has 6 faces'
        },
        {
          question: 'What is 2.5kg + 500g?',
          options: ['3kg', '2.55kg', '3.5kg', '3kg'],
          correctAnswer: '3kg',
          explanation: '2.5kg + 0.5kg = 3kg (500g = 0.5kg)'
        }
      ];
    } else if (strand === 'Statistics and Probability') {
      gameQuestions = [
        {
          question: 'What is more likely: rolling a 6 on a die OR flipping heads on a coin?',
          options: ['Flipping heads', 'Rolling a 6', 'Both equally likely', 'Neither'],
          correctAnswer: 'Flipping heads',
          explanation: 'Flipping heads has a 1/2 chance, rolling a 6 has a 1/6 chance'
        },
        {
          question: 'What is the mode of this data: 3, 4, 5, 5, 6, 7, 5, 8?',
          options: ['5', '4', '6', '3'],
          correctAnswer: '5',
          explanation: 'The mode is the most frequent value, which is 5 (appears 3 times)'
        },
        {
          question: 'If you roll a standard die, what is the probability of rolling an even number?',
          options: ['1/2', '1/3', '2/3', '1/6'],
          correctAnswer: '1/2',
          explanation: 'There are 3 even numbers (2, 4, 6) out of 6 possible outcomes, so 3/6 = 1/2'
        },
        {
          question: 'What is the median of: 12, 15, 18, 20, 25?',
          options: ['18', '15', '20', '19'],
          correctAnswer: '18',
          explanation: 'The median is the middle value when arranged in order, which is 18'
        },
        {
          question: 'What is impossible when rolling a standard die?',
          options: ['Rolling a 7', 'Rolling an even number', 'Rolling a 1', 'Rolling a number less than 6'],
          correctAnswer: 'Rolling a 7',
          explanation: 'A standard die only has numbers 1-6, so rolling a 7 is impossible'
        }
      ];
    }
    
    // Shuffle questions
    const shuffled = [...gameQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
  };
  
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCurrentQuestion(0);
    setTimeLeft(60);
    setStartTime(Date.now());
    setCharacterPosition(0);
  };
  
  const endGame = () => {
    setGameState('end');
    
    // Calculate time spent in seconds
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    // Calculate percentage score
    const percentScore = Math.round((score / questions.length) * 100);
    
    // Update progress
    updateProgress(contentId, true, percentScore, timeSpent);
    
    // Notify parent component
    if (onComplete) {
      onComplete(percentScore);
    }
  };
  
  const handleAnswer = (selectedAnswer) => {
    const currentQ = questions[currentQuestion];
    const correct = selectedAnswer === currentQ.correctAnswer;
    
    // Show feedback
    setShowFeedback(true);
    setIsCorrect(correct);
    setFeedbackMessage(correct ? 
      'Great job! That\'s correct!' : 
      `Not quite. ${currentQ.explanation}`
    );
    
    // Update score and character position if correct
    if (correct) {
      setScore(score + 1);
      setCharacterPosition(characterPosition + 20);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      setShowFeedback(false);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        endGame();
      }
    }, 2000);
  };
  
  const renderIntro = () => (
    <div className="game-intro">
      <h2>Math Adventure Challenge</h2>
      <div className="game-character">
        <img src="/images/game-character.png" alt="Math Explorer" />
      </div>
      <p>Help our Math Explorer solve problems and reach the treasure!</p>
      <p>You have 60 seconds to answer as many questions as you can.</p>
      <button className="btn btn-primary btn-lg" onClick={startGame}>
        Start Adventure!
      </button>
    </div>
  );
  
  const renderGame = () => (
    <div className="game-playing">
      <div className="game-header">
        <div className="game-score">
          <span>Score: {score}</span>
        </div>
        <div className="game-timer">
          <span>Time: {timeLeft}s</span>
        </div>
        <div className="game-progress">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
        </div>
      </div>
      
      <div className="game-board">
        <div className="game-path">
          <div 
            className="game-character" 
            style={{ left: `${characterPosition}%` }}
          >
            <img src="/images/game-character.png" alt="Math Explorer" />
          </div>
          <div className="game-finish" style={{ left: '90%' }}>
            <img src="/images/treasure.png" alt="Treasure" />
          </div>
        </div>
        
        <div className="game-question">
          <h3>{questions[currentQuestion].question}</h3>
          
          <div className="game-options">
            {questions[currentQuestion].options.map((option, index) => (
              <button 
                key={index}
                className="btn btn-option"
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>
          
          {showFeedback && (
            <div className={`game-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="feedback-icon">
                <img 
                  src={isCorrect ? '/images/correct-answer.png' : '/images/incorrect-answer.png'} 
                  alt={isCorrect ? 'Correct!' : 'Incorrect'} 
                />
              </div>
              <p>{feedbackMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  const renderEnd = () => (
    <div className="game-end">
      <h2>Adventure Complete!</h2>
      
      <div className="game-results">
        <div className="result-score">
          <h3>Your Score</h3>
          <div className="score-circle">
            <span>{score} / {questions.length}</span>
          </div>
          <p>{Math.round((score / questions.length) * 100)}%</p>
        </div>
        
        <div className="result-message">
          {score === questions.length ? (
            <>
              <h3>Perfect Score!</h3>
              <img src="/images/perfect-score.png" alt="Perfect Score" />
              <p>You're a math genius! You found all the treasure!</p>
            </>
          ) : score >= Math.ceil(questions.length * 0.7) ? (
            <>
              <h3>Great Job!</h3>
              <img src="/images/great-score.png" alt="Great Score" />
              <p>You're really good at math! You found most of the treasure!</p>
            </>
          ) : score >= Math.ceil(questions.length * 0.5) ? (
            <>
              <h3>Good Effort!</h3>
              <img src="/images/good-score.png" alt="Good Score" />
              <p>You're on the right track! Keep practicing to find more treasure!</p>
            </>
          ) : (
            <>
              <h3>Keep Practicing!</h3>
              <img src="/images/practice-more.png" alt="Practice More" />
              <p>The treasure is waiting for you! Let's practice more math!</p>
            </>
          )}
        </div>
      </div>
      
      <div className="game-actions">
        <button className="btn btn-primary" onClick={startGame}>
          Play Again
        </button>
        <button className="btn btn-secondary" onClick={() => onComplete && onComplete(Math.round((score / questions.length) * 100))}>
          Back to Lesson
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="game-based-assessment">
      {gameState === 'intro' && renderIntro()}
      {gameState === 'playing' && renderGame()}
      {gameState === 'end' && renderEnd()}
    </div>
  );
};

GameBasedAssessment.propTypes = {
  contentId: PropTypes.string.isRequired,
  strand: PropTypes.string.isRequired,
  difficulty: PropTypes.string,
  updateProgress: PropTypes.func.isRequired,
  onComplete: PropTypes.func
};

export default connect(null, { updateProgress })(GameBasedAssessment);
