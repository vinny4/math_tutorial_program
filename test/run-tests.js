// Test script for running all tests and generating a report
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Test result tracking
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  details: []
};

// Function to run a test script and capture results
function runTest(testScript) {
  console.log(`\n========== Running ${testScript} ==========\n`);
  
  try {
    // Execute the test script
    const output = execSync(`node ${testScript}`, { encoding: 'utf8' });
    console.log(output);
    
    // Parse results from output
    const lines = output.split('\n');
    let testCaseResults = [];
    
    for (const line of lines) {
      if (line.includes('Test Case') && (line.includes('PASSED') || line.includes('FAILED') || line.includes('SKIPPED'))) {
        const testCase = line.split(':')[0].trim();
        const result = line.includes('PASSED') ? 'PASSED' : line.includes('FAILED') ? 'FAILED' : 'SKIPPED';
        
        testCaseResults.push({
          testCase,
          result,
          details: line
        });
        
        // Update counts
        testResults.total++;
        if (result === 'PASSED') testResults.passed++;
        else if (result === 'FAILED') testResults.failed++;
        else if (result === 'SKIPPED') testResults.skipped++;
      }
    }
    
    // Add to overall results
    testResults.details.push({
      testScript: path.basename(testScript),
      results: testCaseResults,
      status: 'Completed',
      error: null
    });
    
    return true;
  } catch (error) {
    console.error(`Error running ${testScript}:`, error.message);
    
    // Add to overall results
    testResults.details.push({
      testScript: path.basename(testScript),
      results: [],
      status: 'Failed',
      error: error.message
    });
    
    return false;
  }
}

// Function to generate HTML test report
function generateTestReport() {
  const reportPath = path.join(__dirname, 'test-report.html');
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Year 5 Mathematics Tutorial Program - Test Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    .summary {
      background-color: #f8f9fa;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 20px;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 15px;
    }
    .summary-item {
      padding: 15px;
      border-radius: 5px;
      text-align: center;
    }
    .total {
      background-color: #e9ecef;
    }
    .passed {
      background-color: #d4edda;
      color: #155724;
    }
    .failed {
      background-color: #f8d7da;
      color: #721c24;
    }
    .skipped {
      background-color: #fff3cd;
      color: #856404;
    }
    .test-script {
      margin-bottom: 30px;
      border: 1px solid #dee2e6;
      border-radius: 5px;
      overflow: hidden;
    }
    .script-header {
      background-color: #e9ecef;
      padding: 10px 15px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
    .script-status {
      padding: 3px 8px;
      border-radius: 3px;
    }
    .status-completed {
      background-color: #d4edda;
      color: #155724;
    }
    .status-failed {
      background-color: #f8d7da;
      color: #721c24;
    }
    .test-cases {
      padding: 0;
    }
    .test-case {
      padding: 10px 15px;
      border-bottom: 1px solid #dee2e6;
      display: flex;
      justify-content: space-between;
    }
    .test-case:last-child {
      border-bottom: none;
    }
    .case-result {
      padding: 3px 8px;
      border-radius: 3px;
      font-weight: bold;
    }
    .result-passed {
      background-color: #d4edda;
      color: #155724;
    }
    .result-failed {
      background-color: #f8d7da;
      color: #721c24;
    }
    .result-skipped {
      background-color: #fff3cd;
      color: #856404;
    }
    .error-details {
      background-color: #f8d7da;
      padding: 10px 15px;
      color: #721c24;
      font-family: monospace;
      white-space: pre-wrap;
    }
    .timestamp {
      text-align: right;
      color: #6c757d;
      font-size: 0.9em;
      margin-top: 50px;
    }
  </style>
</head>
<body>
  <h1>Year 5 Mathematics Tutorial Program - Test Report</h1>
  
  <div class="summary">
    <h2>Test Summary</h2>
    <div class="summary-grid">
      <div class="summary-item total">
        <h3>Total Tests</h3>
        <p>${testResults.total}</p>
      </div>
      <div class="summary-item passed">
        <h3>Passed</h3>
        <p>${testResults.passed}</p>
      </div>
      <div class="summary-item failed">
        <h3>Failed</h3>
        <p>${testResults.failed}</p>
      </div>
      <div class="summary-item skipped">
        <h3>Skipped</h3>
        <p>${testResults.skipped}</p>
      </div>
    </div>
  </div>
  
  <h2>Test Details</h2>
  
  ${testResults.details.map(script => `
    <div class="test-script">
      <div class="script-header">
        <span>${script.testScript}</span>
        <span class="script-status status-${script.status.toLowerCase()}">${script.status}</span>
      </div>
      
      ${script.error ? `
        <div class="error-details">
          ${script.error}
        </div>
      ` : ''}
      
      <div class="test-cases">
        ${script.results.map(testCase => `
          <div class="test-case">
            <span>${testCase.testCase}</span>
            <span class="case-result result-${testCase.result.toLowerCase()}">${testCase.result}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('')}
  
  <div class="timestamp">
    Report generated on: ${new Date().toLocaleString()}
  </div>
</body>
</html>
  `;
  
  fs.writeFileSync(reportPath, html);
  console.log(`Test report generated at: ${reportPath}`);
  
  return reportPath;
}

// Main function to run all tests
async function runAllTests() {
  console.log('Starting test execution...');
  
  // Get all test scripts
  const testScripts = [
    path.join(__dirname, 'auth-tests.js'),
    path.join(__dirname, 'content-assessment-tests.js'),
    path.join(__dirname, 'responsive-ui-tests.js')
  ];
  
  // Run each test script
  for (const script of testScripts) {
    runTest(script);
  }
  
  // Generate test report
  const reportPath = generateTestReport();
  
  // Log summary
  console.log('\n========== Test Execution Summary ==========');
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  console.log(`Skipped: ${testResults.skipped}`);
  console.log(`Report: ${reportPath}`);
}

// Run all tests
runAllTests().catch(err => {
  console.error('Error running tests:', err);
});
