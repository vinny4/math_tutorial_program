// Test script for content and assessment functionality
const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function runContentAndAssessmentTests() {
  console.log('Starting Content and Assessment Tests...');
  
  // Initialize the WebDriver
  const driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // Login as a student first
    console.log('Logging in as test student...');
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.name('username')).sendKeys('teststudent');
    await driver.findElement(By.name('password')).sendKeys('password123');
    await driver.findElement(By.css('input[type="submit"]')).click();
    
    // Wait for redirect to student dashboard
    await driver.wait(until.urlContains('/student-dashboard'), 5000);
    
    // Test Case CONT-01: Content List Load
    console.log('Running Test Case CONT-01: Content List Load');
    await driver.findElement(By.linkText('Content')).click();
    await driver.wait(until.urlContains('/content'), 5000);
    
    // Check if content items are displayed
    await driver.wait(until.elementLocated(By.className('content-grid')), 5000);
    const contentItems = await driver.findElements(By.className('content-card'));
    assert(contentItems.length > 0, 'Content list load failed: No content items displayed');
    console.log('Test Case CONT-01: PASSED');
    
    // Test Case CONT-02: Content Filtering
    console.log('Running Test Case CONT-02: Content Filtering');
    await driver.findElement(By.xpath("//button[contains(text(), 'Number and Algebra')]")).click();
    await driver.sleep(1000); // Wait for filter to apply
    
    // Check if filtered content is displayed
    const filteredItems = await driver.findElements(By.className('content-card'));
    assert(filteredItems.length > 0, 'Content filtering failed: No filtered content items displayed');
    
    // Check if all displayed items are from the selected strand
    const strandTags = await driver.findElements(By.className('strand-tag'));
    let allNumberAndAlgebra = true;
    for (const tag of strandTags) {
      const text = await tag.getText();
      if (text !== 'Number and Algebra') {
        allNumberAndAlgebra = false;
        break;
      }
    }
    assert(allNumberAndAlgebra, 'Content filtering failed: Items from other strands are displayed');
    console.log('Test Case CONT-02: PASSED');
    
    // Test Case CONT-03: Content Detail Load
    console.log('Running Test Case CONT-03: Content Detail Load');
    await driver.findElement(By.css('.content-card:first-child .btn-primary')).click();
    await driver.wait(until.urlContains('/content/'), 5000);
    
    // Check if content details are displayed
    await driver.wait(until.elementLocated(By.className('content-detail-page')), 5000);
    const contentTitle = await driver.findElement(By.css('.lesson-title h2')).getText();
    assert(contentTitle.length > 0, 'Content detail load failed: No content title displayed');
    console.log('Test Case CONT-03: PASSED');
    
    // Test Case CONT-04: Content Navigation
    console.log('Running Test Case CONT-04: Content Navigation');
    // Click on Practice tab
    await driver.findElement(By.xpath("//button[contains(text(), 'Practice')]")).click();
    await driver.sleep(1000); // Wait for tab to switch
    
    // Check if assessment is displayed
    await driver.wait(until.elementLocated(By.className('assessment-component')), 5000);
    const assessmentTitle = await driver.findElement(By.css('.assessment-header h2')).getText();
    assert(assessmentTitle.includes('Test Your Knowledge'), 'Content navigation failed: Assessment not displayed');
    
    // Click back to Learn tab
    await driver.findElement(By.xpath("//button[contains(text(), 'Learn')]")).click();
    await driver.sleep(1000); // Wait for tab to switch
    
    // Check if content is displayed again
    await driver.wait(until.elementLocated(By.className('content-lesson')), 5000);
    console.log('Test Case CONT-04: PASSED');
    
    // Test Case ASMT-01: Multiple Choice Questions
    console.log('Running Test Case ASMT-01: Multiple Choice Questions');
    // Go back to Practice tab
    await driver.findElement(By.xpath("//button[contains(text(), 'Practice')]")).click();
    await driver.sleep(1000); // Wait for tab to switch
    
    // Find a multiple choice question (if exists)
    const multipleChoiceQuestions = await driver.findElements(By.className('multiple-choice-question'));
    if (multipleChoiceQuestions.length > 0) {
      // Select an option
      await driver.findElement(By.css('.multiple-choice input[type="radio"]')).click();
      console.log('Test Case ASMT-01: PASSED');
    } else {
      console.log('Test Case ASMT-01: SKIPPED - No multiple choice questions found');
    }
    
    // Test Case ASMT-08: Assessment Scoring
    console.log('Running Test Case ASMT-08: Assessment Scoring');
    // Answer all questions
    const questionCards = await driver.findElements(By.className('question-card'));
    for (let i = 0; i < questionCards.length; i++) {
      // Different handling based on question type
      const questionType = await questionCards[i].getAttribute('class');
      
      if (questionType.includes('multiple-choice')) {
        await driver.findElement(By.css(`.question-card:nth-child(${i+1}) .multiple-choice input[type="radio"]`)).click();
      } else if (questionType.includes('fill-in')) {
        await driver.findElement(By.css(`.question-card:nth-child(${i+1}) input[type="text"]`)).sendKeys('42');
      } else if (questionType.includes('true-false')) {
        await driver.findElement(By.css(`.question-card:nth-child(${i+1}) input[value="true"]`)).click();
      }
      // Other question types would need more complex handling
    }
    
    // Submit assessment
    await driver.findElement(By.css('.assessment-actions .btn-primary')).click();
    await driver.sleep(2000); // Wait for results to display
    
    // Check if score is displayed
    await driver.wait(until.elementLocated(By.className('results-container')), 5000);
    const scoreElement = await driver.findElement(By.className('score-value')).getText();
    assert(scoreElement.includes('%'), 'Assessment scoring failed: No score displayed');
    console.log('Test Case ASMT-08: PASSED');
    
    // Test Case PROG-01: Progress Page Load
    console.log('Running Test Case PROG-01: Progress Page Load');
    await driver.findElement(By.linkText('Progress')).click();
    await driver.wait(until.urlContains('/progress'), 5000);
    
    // Check if progress information is displayed
    await driver.wait(until.elementLocated(By.className('progress-tracker-page')), 5000);
    const progressTitle = await driver.findElement(By.css('.page-header h1')).getText();
    assert(progressTitle.includes('Progress Tracker'), 'Progress page load failed: Title not displayed');
    console.log('Test Case PROG-01: PASSED');
    
    console.log('All Content and Assessment Tests Completed Successfully!');
    
  } finally {
    await driver.quit();
  }
}

// Run the tests
runContentAndAssessmentTests().catch(err => {
  console.error('Test failed:', err);
});
