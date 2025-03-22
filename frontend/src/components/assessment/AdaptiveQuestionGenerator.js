import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdaptiveQuestionGenerator = ({ 
  contentId, 
  strand, 
  topic, 
  difficulty, 
  previousPerformance,
  onQuestionsGenerated
}) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Sample question templates for different strands and difficulty levels
  const questionTemplates = {
    'Number and Algebra': {
      'easy': [
        {
          type: 'multiple-choice',
          template: 'What is VALUE1 + VALUE2?',
          generateValues: () => {
            const value1 = Math.floor(Math.random() * 50) + 1;
            const value2 = Math.floor(Math.random() * 50) + 1;
            return { 
              VALUE1: value1, 
              VALUE2: value2,
              ANSWER: value1 + value2,
              OPTIONS: [
                value1 + value2,
                value1 + value2 + Math.floor(Math.random() * 5) + 1,
                value1 + value2 - Math.floor(Math.random() * 5) - 1,
                value1 + value2 + 10
              ].sort(() => Math.random() - 0.5)
            };
          }
        },
        {
          type: 'fill-in',
          template: 'Fill in the missing number: VALUE1 + ___ = RESULT',
          generateValues: () => {
            const value1 = Math.floor(Math.random() * 50) + 1;
            const value2 = Math.floor(Math.random() * 50) + 1;
            return { 
              VALUE1: value1, 
              RESULT: value1 + value2,
              ANSWER: value2.toString()
            };
          }
        }
      ],
      'medium': [
        {
          type: 'multiple-choice',
          template: 'What is VALUE1 × VALUE2?',
          generateValues: () => {
            const value1 = Math.floor(Math.random() * 12) + 1;
            const value2 = Math.floor(Math.random() * 12) + 1;
            return { 
              VALUE1: value1, 
              VALUE2: value2,
              ANSWER: value1 * value2,
              OPTIONS: [
                value1 * value2,
                value1 * value2 + Math.floor(Math.random() * 5) + 1,
                value1 * value2 - Math.floor(Math.random() * 5) - 1,
                value1 * (value2 + 1)
              ].sort(() => Math.random() - 0.5)
            };
          }
        },
        {
          type: 'ordering',
          template: 'Arrange these numbers from smallest to largest:',
          generateValues: () => {
            const baseValue = Math.floor(Math.random() * 50) + 1;
            const values = [
              baseValue,
              baseValue + Math.floor(Math.random() * 10) + 5,
              baseValue + Math.floor(Math.random() * 20) + 15,
              baseValue + Math.floor(Math.random() * 30) + 25
            ];
            const shuffled = [...values].sort(() => Math.random() - 0.5);
            return { 
              ITEMS: shuffled.map(value => ({ id: `num-${value}`, text: value.toString() })),
              ANSWER: values.map(value => ({ id: `num-${value}`, text: value.toString() }))
            };
          }
        }
      ],
      'hard': [
        {
          type: 'multiple-choice',
          template: 'If VALUE1 ÷ VALUE2 = RESULT with a remainder of REMAINDER, what is the value of VALUE1?',
          generateValues: () => {
            const value2 = Math.floor(Math.random() * 10) + 2;
            const quotient = Math.floor(Math.random() * 10) + 1;
            const remainder = Math.floor(Math.random() * value2);
            const value1 = quotient * value2 + remainder;
            return { 
              VALUE2: value2, 
              RESULT: quotient,
              REMAINDER: remainder,
              ANSWER: value1,
              OPTIONS: [
                value1,
                value1 + 1,
                value1 - 1,
                value1 + value2
              ].sort(() => Math.random() - 0.5)
            };
          }
        },
        {
          type: 'matching',
          template: 'Match each equation with its correct answer:',
          generateValues: () => {
            const equations = [
              { id: 'eq1', text: `${Math.floor(Math.random() * 10) + 1} × ${Math.floor(Math.random() * 10) + 1}`, answer: null },
              { id: 'eq2', text: `${Math.floor(Math.random() * 50) + 20} - ${Math.floor(Math.random() * 20) + 1}`, answer: null },
              { id: 'eq3', text: `${Math.floor(Math.random() * 10) + 1} × ${Math.floor(Math.random() * 10) + 1} + ${Math.floor(Math.random() * 10) + 1}`, answer: null },
              { id: 'eq4', text: `${Math.floor(Math.random() * 100) + 50} ÷ ${Math.floor(Math.random() * 10) + 2}`, answer: null }
            ];
            
            // Calculate answers
            equations.forEach(eq => {
              eq.answer = Math.round(eval(eq.text.replace('×', '*').replace('÷', '/')));
            });
            
            return { 
              ITEMS: equations.map(eq => ({ id: eq.id, text: eq.text })),
              MATCHES: equations.map(eq => ({ id: `ans-${eq.id}`, text: eq.answer.toString() })).sort(() => Math.random() - 0.5),
              ANSWER: equations.reduce((obj, eq) => {
                obj[eq.id] = `ans-${eq.id}`;
                return obj;
              }, {})
            };
          }
        }
      ]
    },
    'Measurement and Geometry': {
      'easy': [
        {
          type: 'multiple-choice',
          template: 'Which shape has SIDES sides?',
          generateValues: () => {
            const shapes = [
              { sides: 3, name: 'Triangle' },
              { sides: 4, name: 'Square' },
              { sides: 5, name: 'Pentagon' },
              { sides: 6, name: 'Hexagon' },
              { sides: 8, name: 'Octagon' }
            ];
            const selectedShape = shapes[Math.floor(Math.random() * shapes.length)];
            const options = shapes.map(shape => shape.name).sort(() => Math.random() - 0.5);
            
            return { 
              SIDES: selectedShape.sides,
              ANSWER: selectedShape.name,
              OPTIONS: options
            };
          }
        },
        {
          type: 'true-false',
          template: 'A SHAPE has SIDES sides.',
          generateValues: () => {
            const shapes = [
              { name: 'Triangle', sides: 3 },
              { name: 'Square', sides: 4 },
              { name: 'Rectangle', sides: 4 },
              { name: 'Pentagon', sides: 5 },
              { name: 'Hexagon', sides: 6 }
            ];
            
            const selectedShape = shapes[Math.floor(Math.random() * shapes.length)];
            const isTrue = Math.random() > 0.5;
            const sides = isTrue ? selectedShape.sides : selectedShape.sides + (Math.random() > 0.5 ? 1 : -1);
            
            return { 
              SHAPE: selectedShape.name,
              SIDES: sides,
              ANSWER: isTrue ? "true" : "false"
            };
          }
        }
      ],
      'medium': [
        {
          type: 'multiple-choice',
          template: 'What is the perimeter of a rectangle with length LENGTH cm and width WIDTH cm?',
          generateValues: () => {
            const length = Math.floor(Math.random() * 10) + 5;
            const width = Math.floor(Math.random() * 5) + 3;
            const perimeter = 2 * (length + width);
            
            return { 
              LENGTH: length,
              WIDTH: width,
              ANSWER: perimeter,
              OPTIONS: [
                perimeter,
                length * width,
                perimeter + 2,
                perimeter - 2
              ].sort(() => Math.random() - 0.5)
            };
          }
        },
        {
          type: 'drag-drop',
          template: 'Drag each shape to its correct category:',
          generateValues: () => {
            const shapes = [
              { id: 'shape1', text: 'Square', category: '2D Shapes' },
              { id: 'shape2', text: 'Circle', category: '2D Shapes' },
              { id: 'shape3', text: 'Triangle', category: '2D Shapes' },
              { id: 'shape4', text: 'Cube', category: '3D Shapes' },
              { id: 'shape5', text: 'Sphere', category: '3D Shapes' },
              { id: 'shape6', text: 'Cylinder', category: '3D Shapes' }
            ];
            
            return { 
              DRAG_ITEMS: shapes.map(shape => ({ id: shape.id, text: shape.text })),
              DROP_ZONES: [
                { id: 'zone1', label: '2D Shapes' },
                { id: 'zone2', label: '3D Shapes' }
              ],
              ANSWER: shapes.map(shape => ({
                id: shape.category === '2D Shapes' ? 'zone1' : 'zone2',
                itemId: shape.id
              }))
            };
          }
        }
      ],
      'hard': [
        {
          type: 'fill-in',
          template: 'A rectangular prism has length LENGTH cm, width WIDTH cm, and height HEIGHT cm. What is its volume in cubic centimeters?',
          generateValues: () => {
            const length = Math.floor(Math.random() * 5) + 3;
            const width = Math.floor(Math.random() * 5) + 3;
            const height = Math.floor(Math.random() * 5) + 3;
            const volume = length * width * height;
            
            return { 
              LENGTH: length,
              WIDTH: width,
              HEIGHT: height,
              ANSWER: volume.toString()
            };
          }
        },
        {
          type: 'drawing',
          template: 'Draw a SHAPE with SIDES sides.',
          generateValues: () => {
            const shapes = [
              { name: 'triangle', sides: 3 },
              { name: 'square', sides: 4 },
              { name: 'pentagon', sides: 5 },
              { name: 'hexagon', sides: 6 }
            ];
            
            const selectedShape = shapes[Math.floor(Math.random() * shapes.length)];
            
            return { 
              SHAPE: selectedShape.name,
              SIDES: selectedShape.sides,
              SAMPLE_ANSWER: `/images/sample-${selectedShape.name}.png`
            };
          }
        }
      ]
    },
    'Statistics and Probability': {
      'easy': [
        {
          type: 'multiple-choice',
          template: 'Which event is most likely to happen?',
          generateValues: () => {
            const events = [
              { text: 'Getting heads when flipping a coin', probability: 'Equally likely' },
              { text: 'Rolling a 6 on a standard die', probability: 'Unlikely' },
              { text: 'Drawing a red card from a standard deck', probability: 'Equally likely' },
              { text: 'It will rain tomorrow', probability: 'Uncertain' }
            ];
            
            const options = events.map(event => event.text);
            const answer = events[0].text; // Coin flip is most predictable
            
            return { 
              OPTIONS: options,
              ANSWER: answer
            };
          }
        },
        {
          type: 'true-false',
          template: 'When rolling a standard six-sided die, you are more likely to roll an even number than an odd number.',
          generateValues: () => {
            return { 
              ANSWER: "false" // Equal probability: 3 even, 3 odd
            };
          }
        }
      ],
      'medium': [
        {
          type: 'multiple-choice',
          template: 'In a bag with RED red marbles and BLUE blue marbles, what is the probability of drawing a red marble?',
          generateValues: () => {
            const red = Math.floor(Math.random() * 5) + 1;
            const blue = Math.floor(Math.random() * 5) + 1;
            const total = red + blue;
            const probability = `${red}/${total}`;
            
            return { 
              RED: red,
              BLUE: blue,
              ANSWER: probability,
              OPTIONS: [
                probability,
                `${blue}/${total}`,
                `${red}/${red}`,
                `${blue}/${blue}`
              ].sort(() => Math.random() - 0.5)
            };
          }
        },
        {
          type: 'matching',
          template: 'Match each event with its probability:',
          generateValues: () => {
            const events = [
              { id: 'event1', text: 'Rolling a number less than 7 on a standard die', probability: 'Certain' },
              { id: 'event2', text: 'Drawing a king from a standard deck of cards', probability: 'Unlikely' },
              { id: 'event3', text: 'Flipping a coin and getting either heads or tails', probability: 'Certain' },
              { id: 'event4', text: 'Rolling a 3 on a standard die', probability: 'Unlikely' }
            ];
            
            return { 
              ITEMS: events.map(event => ({ id: event.id, text: event.text })),
              MATCHES: [
                { id: 'prob1', text: 'Certain' },
                { id: 'prob2', text: 'Likely' },
                { id: 'prob3', text: 'Equally likely' },
                { id: 'prob4', text: 'Unlikely' },
                { id: 'prob5', text: 'Impossible' }
              ],
              ANSWER: {
                'event1': 'prob1',
                'event2': 'prob4',
                'event3': 'prob1',
                'event4': 'prob4'
              }
            };
          }
        }
      ],
      'hard': [
        {
          type: 'multiple-choice',
          template: 'The following data shows the number of pets owned by students in a class: DATA. What is the mode of this data set?',
          generateValues: () => {
            const dataPoints = 10;
            const maxPets = 4;
            const data = [];
            
            // Generate random data with a clear mode
            const mode = Math.floor(Math.random() * maxPets) + 1;
            const modeFrequency = Math.floor(Math.random() * 3) + 3; // Mode appears 3-5 times
            
            for (let i = 0; i < modeFrequency; i++) {
              data.push(mode);
            }
            
            while (data.length < dataPoints) {
              const value = Math.floor(Math.random() * maxPets) + 1;
              if (value !== mode || Math.random() > 0.7) { // Occasionally allow duplicates of mode
                data.push(value);
              }
            }
            
            // Shuffle the data
            data.sort(() => Math.random() - 0.5);
            
            return { 
              DATA: data.join(', '),
              ANSWER: mode,
              OPTIONS: [
                mode,
                Math.round(data.reduce((sum, val) => sum + val, 0) / data.length), // mean
                data.sort((a, b) => a - b)[Math.floor(data.length / 2)], // median
                mode + 1
              ].sort(() => Math.random() - 0.5)
            };
          }
        },
        {
          type: 'ordering',
          template: 'Arrange these events from least likely to most likely:',
          generateValues: () => {
            const events = [
              { id: 'event1', text: 'Rolling a 6 on a standard die', likelihood: 1 },
              { id: 'event2', text: 'Drawing a heart from a standard deck of cards', likelihood: 2 },
              { id: 'event3', text: 'Flipping a coin and getting heads', likelihood: 3 },
              { id: 'event4', text: 'Rolling an even number on a standard die', likelihood: 4 }
            ];
            
            const ordered = [...events].sort((a, b) => a.likelihood - b.likelihood);
            const shuffled = [...events].sort(() => Math.random() - 0.5);
            
            return { 
              ITEMS: shuffled.map(event => ({ id: event.id, text: event.text })),
              ANSWER: ordered.map(event => ({ id: event.id, text: event.text }))
            };
          }
        }
      ]
    }
  };
  
  // Function to generate a question from a template
  const generateQuestion = (template, values) => {
    let question = template;
    
    // Replace placeholders with values
    for (const key in values) {
      if (key !== 'ANSWER' && key !== 'OPTIONS' && key !== 'ITEMS' && 
          key !== 'MATCHES' && key !== 'DRAG_ITEMS' && key !== 'DROP_ZONES' &&
          key !== 'SAMPLE_ANSWER') {
        question = question.replace(new RegExp(key, 'g'), values[key]);
      }
    }
    
    // Create question object based on type
    switch (template.type) {
      case 'multiple-choice':
        return {
          questionType: 'multiple-choice',
          question: question,
          options: values.OPTIONS,
          correctAnswer: values.ANSWER.toString(),
          explanation: `The correct answer is ${values.ANSWER}.`
        };
      
      case 'fill-in':
        return {
          questionType: 'fill-in',
          question: question,
          correctAnswer: values.ANSWER,
          explanation: `The correct answer is ${values.ANSWER}.`
        };
      
      case 'true-false':
        return {
          questionType: 'true-false',
          question: question,
          correctAnswer: values.ANSWER,
          explanation: `This statement is ${values.ANSWER === 'true' ? 'true' : 'false'}.`
        };
      
      case 'matching':
        return {
          questionType: 'matching',
          question: question,
          items: values.ITEMS,
          matches: values.MATCHES,
          correctAnswer: JSON.stringify(values.ANSWER),
          explanation: 'Match each item with its corresponding value.'
        };
      
      case 'drag-drop':
        return {
          questionType: 'drag-drop',
          question: question,
          dragItems: values.DRAG_ITEMS,
          dropZones: values.DROP_ZONES,
          correctAnswer: JSON.stringify(values.ANSWER),
          explanation: 'Drag each item to its correct category.'
        };
      
      case 'ordering':
        return {
          questionType: 'ordering',
          question: question,
          items: values.ITEMS,
          correctAnswer: JSON.stringify(values.ANSWER),
          explanation: 'The correct order is shown above.'
        };
      
      case 'drawing':
        return {
          questionType: 'drawing',
          question: question,
          sampleAnswer: values.SAMPLE_ANSWER,
          explanation: `Try to draw a ${values.SHAPE} with ${values.SIDES} sides.`
        };
      
      default:
        return {
          questionType: 'multiple-choice',
          question: question,
          options: values.OPTIONS,
          correctAnswer: values.ANSWER.toString(),
          explanation: `The correct answer is ${values.ANSWER}.`
        };
    }
  };
  
  // Function to determine difficulty based on previous performance
  const determineDifficulty = (baseDifficulty, previousPerformance) => {
    if (!previousPerformance || previousPerformance.length === 0) {
      return baseDifficulty;
    }
    
    // Calculate average score from previous performance
    const avgScore = previousPerformance.reduce((sum, perf) => sum + perf.score, 0) / previousPerformance.length;
    
    // Adjust difficulty based on average score
    if (avgScore >= 90) {
      return 'hard';
    } else if (avgScore >= 70) {
      return 'medium';
    } else {
      return 'easy';
    }
  };
  
  useEffect(() => {
    try {
      setLoading(true);
      
      // Determine appropriate difficulty
      const adaptiveDifficulty = determineDifficulty(
        difficulty || 'medium', 
        previousPerformance
      );
      
      // Get templates for the strand and difficulty
      const templates = questionTemplates[strand] && 
                        questionTemplates[strand][adaptiveDifficulty];
      
      if (!templates) {
        throw new Error(`No templates available for ${strand} at ${adaptiveDifficulty} difficulty`);
      }
      
      // Generate 5 questions
      const generatedQuestions = [];
      const usedTemplates = new Set();
      
      while (generatedQuestions.length < 5 && usedTemplates.size < templates.length) {
        // Select a random template that hasn't been used yet
        let templateIndex;
        do {
          templateIndex = Math.floor(Math.random() * templates.length);
        } while (usedTemplates.has(templateIndex) && usedTemplates.size < templates.length);
        
        usedTemplates.add(templateIndex);
        const template = templates[templateIndex];
        
        // Generate values for the template
        const values = template.generateValues();
        
        // Create question from template and values
        const question = generateQuestion(template, values);
        
        // Add content ID and unique ID to question
        question._id = `${contentId}-q${generatedQuestions.length + 1}`;
        question.contentId = contentId;
        
        generatedQuestions.push(question);
      }
      
      setQuestions(generatedQuestions);
      
      // Notify parent component
      if (onQuestionsGenerated) {
        onQuestionsGenerated(generatedQuestions);
      }
    } catch (err) {
      console.error('Error generating questions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [contentId, strand, topic, difficulty, previousPerformance, onQuestionsGenerated]);
  
  if (loading) {
    return (
      <div className="question-generator-loading">
        <img src="/images/loading-math.gif" alt="Generating questions..." />
        <p>Creating fun questions just for you...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="question-generator-error">
        <p>Oops! Something went wrong: {error}</p>
      </div>
    );
  }
  
  return null; // This component doesn't render anything itself
};

AdaptiveQuestionGenerator.propTypes = {
  contentId: PropTypes.string.isRequired,
  strand: PropTypes.string.isRequired,
  topic: PropTypes.string,
  difficulty: PropTypes.string,
  previousPerformance: PropTypes.array,
  onQuestionsGenerated: PropTypes.func.isRequired
};

export default connect()(AdaptiveQuestionGenerator);
