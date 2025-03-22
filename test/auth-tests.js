// Test script for authentication functionality
const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function runAuthenticationTests() {
  console.log('Starting Authentication Tests...');
  
  // Initialize the WebDriver
  const driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // Test Case AUTH-01: Student Registration
    console.log('Running Test Case AUTH-01: Student Registration');
    await driver.get('http://localhost:3000/register');
    await driver.findElement(By.name('firstName')).sendKeys('Test');
    await driver.findElement(By.name('lastName')).sendKeys('Student');
    await driver.findElement(By.name('username')).sendKeys('teststudent');
    await driver.findElement(By.name('email')).sendKeys('test.student@example.com');
    await driver.findElement(By.name('password')).sendKeys('password123');
    await driver.findElement(By.name('password2')).sendKeys('password123');
    await driver.findElement(By.name('role')).sendKeys('student');
    await driver.findElement(By.css('input[type="submit"]')).click();
    
    // Wait for redirect to student dashboard
    await driver.wait(until.urlContains('/student-dashboard'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('/student-dashboard'), 'Student registration failed: Not redirected to student dashboard');
    console.log('Test Case AUTH-01: PASSED');
    
    // Test Case AUTH-08: Logout
    console.log('Running Test Case AUTH-08: Logout');
    await driver.findElement(By.linkText('Logout')).click();
    await driver.wait(until.urlContains('/'), 5000);
    const logoutUrl = await driver.getCurrentUrl();
    assert(!logoutUrl.includes('/student-dashboard'), 'Logout failed: Still on dashboard page');
    console.log('Test Case AUTH-08: PASSED');
    
    // Test Case AUTH-04: Student Login
    console.log('Running Test Case AUTH-04: Student Login');
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.name('username')).sendKeys('teststudent');
    await driver.findElement(By.name('password')).sendKeys('password123');
    await driver.findElement(By.css('input[type="submit"]')).click();
    
    // Wait for redirect to student dashboard
    await driver.wait(until.urlContains('/student-dashboard'), 5000);
    const loginUrl = await driver.getCurrentUrl();
    assert(loginUrl.includes('/student-dashboard'), 'Student login failed: Not redirected to student dashboard');
    console.log('Test Case AUTH-04: PASSED');
    
    // Test Case AUTH-07: Invalid Login
    console.log('Running Test Case AUTH-07: Invalid Login');
    await driver.findElement(By.linkText('Logout')).click();
    await driver.wait(until.urlContains('/'), 5000);
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.name('username')).sendKeys('teststudent');
    await driver.findElement(By.name('password')).sendKeys('wrongpassword');
    await driver.findElement(By.css('input[type="submit"]')).click();
    
    // Wait for error message
    await driver.wait(until.elementLocated(By.className('alert-danger')), 5000);
    const errorMessage = await driver.findElement(By.className('alert-danger')).getText();
    assert(errorMessage.includes('Invalid credentials'), 'Invalid login test failed: No error message displayed');
    console.log('Test Case AUTH-07: PASSED');
    
    console.log('All Authentication Tests Completed Successfully!');
    
  } finally {
    await driver.quit();
  }
}

// Run the tests
runAuthenticationTests().catch(err => {
  console.error('Test failed:', err);
});
