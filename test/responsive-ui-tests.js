// Test script for responsiveness and UI functionality
const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function runResponsivenessTests() {
  console.log('Starting Responsiveness and UI Tests...');
  
  // Test different viewport sizes
  const viewports = [
    { width: 1920, height: 1080, name: 'Desktop' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 375, height: 667, name: 'Mobile' }
  ];
  
  for (const viewport of viewports) {
    console.log(`Testing on ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
    
    // Initialize the WebDriver
    const driver = await new Builder().forBrowser('chrome').build();
    
    try {
      // Set window size
      await driver.manage().window().setRect({
        width: viewport.width,
        height: viewport.height
      });
      
      // Test Case RESP-01/02/03: Viewport Testing
      console.log(`Running Test Case RESP-0${viewport.name === 'Desktop' ? '1' : viewport.name === 'Tablet' ? '2' : '3'}: ${viewport.name} View`);
      
      // Test landing page
      await driver.get('http://localhost:3000');
      await driver.sleep(1000); // Wait for page to stabilize
      
      // Check if navigation is appropriate for viewport
      const navbarToggle = await driver.findElements(By.className('navbar-toggler'));
      if (viewport.width < 768) {
        assert(navbarToggle.length > 0, `${viewport.name} view failed: Hamburger menu not displayed on small viewport`);
        // Check if menu is collapsed
        const navbarCollapse = await driver.findElement(By.className('navbar-collapse'));
        const isCollapsed = await navbarCollapse.getAttribute('class');
        assert(isCollapsed.includes('collapse'), `${viewport.name} view failed: Menu not collapsed on small viewport`);
      } else if (viewport.width >= 768) {
        // Check if navigation links are visible
        const navLinks = await driver.findElements(By.css('.navbar-nav .nav-link'));
        assert(navLinks.length > 0, `${viewport.name} view failed: Navigation links not visible on large viewport`);
      }
      
      // Login to test authenticated pages
      await driver.get('http://localhost:3000/login');
      await driver.findElement(By.name('username')).sendKeys('teststudent');
      await driver.findElement(By.name('password')).sendKeys('password123');
      await driver.findElement(By.css('input[type="submit"]')).click();
      
      // Wait for redirect to student dashboard
      await driver.wait(until.urlContains('/student-dashboard'), 5000);
      
      // Test dashboard layout
      const dashboardCards = await driver.findElements(By.className('dashboard-card'));
      assert(dashboardCards.length > 0, `${viewport.name} view failed: Dashboard cards not displayed`);
      
      // Test content page
      await driver.findElement(By.linkText('Content')).click();
      await driver.wait(until.urlContains('/content'), 5000);
      
      // Check content grid layout
      const contentGrid = await driver.findElement(By.className('content-grid'));
      const gridStyle = await contentGrid.getAttribute('class');
      
      if (viewport.width < 576) {
        // Should be single column on mobile
        assert(gridStyle.includes('grid-cols-1') || !gridStyle.includes('grid-cols-'), 
          `${viewport.name} view failed: Content grid not single column on mobile`);
      } else if (viewport.width >= 768 && viewport.width < 992) {
        // Should be 2 columns on tablet
        assert(gridStyle.includes('grid-cols-2') || !gridStyle.includes('grid-cols-1'), 
          `${viewport.name} view failed: Content grid not 2 columns on tablet`);
      } else if (viewport.width >= 992) {
        // Should be 3 or more columns on desktop
        assert(gridStyle.includes('grid-cols-3') || gridStyle.includes('grid-cols-4'), 
          `${viewport.name} view failed: Content grid not 3+ columns on desktop`);
      }
      
      // Test content detail page
      await driver.findElement(By.css('.content-card:first-child .btn-primary')).click();
      await driver.wait(until.urlContains('/content/'), 5000);
      
      // Check if images scale properly
      const contentImages = await driver.findElements(By.css('.content-lesson img'));
      if (contentImages.length > 0) {
        const image = contentImages[0];
        const imageWidth = await image.getRect().then(rect => rect.width);
        const containerWidth = await driver.findElement(By.className('content-lesson'))
          .getRect().then(rect => rect.width);
        
        assert(imageWidth <= containerWidth, 
          `${viewport.name} view failed: Images not scaling properly (image width: ${imageWidth}, container width: ${containerWidth})`);
      }
      
      // Test assessment page
      await driver.findElement(By.xpath("//button[contains(text(), 'Practice')]")).click();
      await driver.sleep(1000); // Wait for tab to switch
      
      // Check if assessment components are properly displayed
      await driver.wait(until.elementLocated(By.className('assessment-component')), 5000);
      const questionCards = await driver.findElements(By.className('question-card'));
      assert(questionCards.length > 0, `${viewport.name} view failed: Question cards not displayed`);
      
      console.log(`Test Case RESP-0${viewport.name === 'Desktop' ? '1' : viewport.name === 'Tablet' ? '2' : '3'}: PASSED`);
      
      // Test Case RESP-04: Image Scaling
      console.log('Running Test Case RESP-04: Image Scaling');
      
      // Navigate to a page with images
      await driver.get('http://localhost:3000/content');
      await driver.wait(until.elementLocated(By.className('content-grid')), 5000);
      
      // Check all content card images
      const cardImages = await driver.findElements(By.css('.content-card img'));
      for (let i = 0; i < cardImages.length; i++) {
        const image = cardImages[i];
        const imageWidth = await image.getRect().then(rect => rect.width);
        const cardWidth = await driver.findElements(By.className('content-card'))[i]
          .getRect().then(rect => rect.width);
        
        assert(imageWidth <= cardWidth, 
          `Image scaling failed: Image ${i+1} not scaling properly (image width: ${imageWidth}, card width: ${cardWidth})`);
      }
      
      console.log('Test Case RESP-04: PASSED');
      
    } finally {
      await driver.quit();
    }
  }
  
  console.log('All Responsiveness and UI Tests Completed Successfully!');
}

// Run the tests
runResponsivenessTests().catch(err => {
  console.error('Test failed:', err);
});
