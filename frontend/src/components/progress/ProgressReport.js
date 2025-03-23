import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getStudentProgress } from '../../store/actions/progressActions';
import { Line } from 'react-chartjs-2';

const ProgressReport = ({ getStudentProgress, progress, loading, auth }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      getStudentProgress(auth.user.id);
    }
  }, [getStudentProgress, auth]);

  useEffect(() => {
    if (progress.studentProgress && progress.studentProgress.length > 0) {
      prepareChartData();
    }
  }, [progress]);

  const prepareChartData = () => {
    const labels = progress.studentProgress.map(item => item.date);
    
    // Data for Number and Algebra
    const numberAlgebraData = progress.studentProgress.map(
      item => item.scores.numberAlgebra || 0
    );
    
    // Data for Measurement and Geometry
    const measurementGeometryData = progress.studentProgress.map(
      item => item.scores.measurementGeometry || 0
    );
    
    // Data for Statistics and Probability
    const statisticsProbabilityData = progress.studentProgress.map(
      item => item.scores.statisticsProbability || 0
    );

    setChartData({
      labels,
      datasets: [
        {
          label: 'Number and Algebra',
          data: numberAlgebraData,
          fill: false,
          backgroundColor: 'rgb(78, 115, 223)',
          borderColor: 'rgba(78, 115, 223, 0.8)',
        },
        {
          label: 'Measurement and Geometry',
          data: measurementGeometryData,
          fill: false,
          backgroundColor: 'rgb(246, 194, 62)',
          borderColor: 'rgba(246, 194, 62, 0.8)',
        },
        {
          label: 'Statistics and Probability',
          data: statisticsProbabilityData,
          fill: false,
          backgroundColor: 'rgb(54, 185, 204)',
          borderColor: 'rgba(54, 185, 204, 0.8)',
        }
      ]
    });
  };

  const calculateOverallProgress = () => {
    if (!progress.studentProgress || progress.studentProgress.length === 0) {
      return 0;
    }

    const latestProgress = progress.studentProgress[progress.studentProgress.length - 1];
    const scores = latestProgress.scores;
    
    const numberAlgebra = scores.numberAlgebra || 0;
    const measurementGeometry = scores.measurementGeometry || 0;
    const statisticsProbability = scores.statisticsProbability || 0;
    
    return Math.round((numberAlgebra + measurementGeometry + statisticsProbability) / 3);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return '#1cc88a'; // Green
    if (percentage >= 60) return '#4e73df'; // Blue
    if (percentage >= 40) return '#f6c23e'; // Yellow
    return '#e74a3b'; // Red
  };

  if (loading) {
    return <div className="card"><div className="card-body">Loading progress data...</div></div>;
  }

  const overallProgress = calculateOverallProgress();

  return (
    <div className="progress-report">
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="card-title">Overall Progress</h3>
        </div>
        <div className="card-body">
          <div className="overall-progress">
            <div className="progress-percentage">
              <h2 style={{ color: getProgressColor(overallProgress) }}>{overallProgress}%</h2>
            </div>
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${overallProgress}%`,
                  backgroundColor: getProgressColor(overallProgress)
                }}
              ></div>
            </div>
          </div>
          
          <div className="progress-summary mt-4">
            <p>
              {overallProgress >= 80 ? 'Excellent progress! Keep up the great work!' :
               overallProgress >= 60 ? 'Good progress! Continue practicing to improve further.' :
               overallProgress >= 40 ? 'Making progress! Focus on the challenging areas.' :
               'Just getting started. Regular practice will help improve your skills.'}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Progress Over Time</h3>
        </div>
        <div className="card-body">
          {progress.studentProgress && progress.studentProgress.length > 0 ? (
            <div className="chart-container">
              <Line 
                data={chartData} 
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      title: {
                        display: true,
                        text: 'Score (%)'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Date'
                      }
                    }
                  }
                }}
              />
            </div>
          ) : (
            <p>No progress data available yet. Complete some activities to see your progress!</p>
          )}
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Recommendations</h3>
        </div>
        <div className="card-body">
          <ul className="recommendations-list">
            {progress.recommendations && progress.recommendations.map((recommendation, index) => (
              <li key={index} className="recommendation-item">
                <div className="recommendation-icon">📚</div>
                <div className="recommendation-content">
                  <h4>{recommendation.title}</h4>
                  <p>{recommendation.description}</p>
                  <a href={`#${recommendation.link}`} className="btn btn-primary btn-sm">
                    Start Activity
                  </a>
                </div>
              </li>
            ))}
            {(!progress.recommendations || progress.recommendations.length === 0) && (
              <li>Complete more activities to receive personalized recommendations.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  progress: state.progress,
  loading: state.progress.loading,
  auth: state.auth
});

export default connect(mapStateToProps, { getStudentProgress })(ProgressReport);
