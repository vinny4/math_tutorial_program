# Bug Report for Year 5 Mathematics Tutorial Program

## Overview
This document contains a list of bugs and issues identified during the testing phase of the Year 5 Mathematics Tutorial Program. Each bug is categorized by severity and includes detailed information for reproduction and resolution.

## Bug Categories
- **Critical**: Prevents core functionality from working; must be fixed before release
- **Major**: Significantly impacts user experience but has workarounds
- **Minor**: Small issues that don't significantly impact functionality
- **Cosmetic**: Visual or UI issues that don't affect functionality

## Identified Bugs

### BUG-001
- **Title**: Authentication fails when using special characters in password
- **Severity**: Major
- **Component**: Authentication
- **Description**: When registering a new account with special characters in the password (e.g., !@#$%), the registration appears successful but subsequent login attempts fail.
- **Steps to Reproduce**:
  1. Navigate to registration page
  2. Fill in valid details with password containing special characters (e.g., "Test!@#123")
  3. Submit registration form
  4. Attempt to login with the same credentials
- **Expected Result**: Successful login after registration
- **Actual Result**: Login fails with "Invalid credentials" message
- **Fix Recommendation**: Update password validation and hashing to properly handle special characters

### BUG-002
- **Title**: Assessment questions don't load on slow connections
- **Severity**: Critical
- **Component**: Assessment
- **Description**: When using the application on a slow network connection, assessment questions fail to load and the user sees a perpetual loading screen.
- **Steps to Reproduce**:
  1. Throttle network connection to simulate slow speed (e.g., 3G)
  2. Login as student
  3. Navigate to content detail page
  4. Click on Practice tab
- **Expected Result**: Questions should load, possibly with a longer loading time
- **Actual Result**: Loading spinner continues indefinitely, questions never appear
- **Fix Recommendation**: Implement timeout handling and retry mechanism for question loading

### BUG-003
- **Title**: Progress tracking inconsistent after completing multiple assessments
- **Severity**: Major
- **Component**: Progress Tracking
- **Description**: When a student completes multiple assessments in the same session, sometimes the progress for earlier assessments is not properly recorded.
- **Steps to Reproduce**:
  1. Login as student
  2. Complete an assessment for Topic A
  3. Immediately complete an assessment for Topic B
  4. Check progress page
- **Expected Result**: Both Topic A and Topic B should show completed assessments
- **Actual Result**: Sometimes only Topic B shows as completed
- **Fix Recommendation**: Ensure progress updates are completed sequentially and not overwritten

### BUG-004
- **Title**: Drag-drop questions don't work properly on touch devices
- **Severity**: Major
- **Component**: Assessment
- **Description**: On tablets and mobile devices, the drag-drop functionality in assessments doesn't work correctly. Items can't be dragged or are placed incorrectly.
- **Steps to Reproduce**:
  1. Access application on a touch device
  2. Login as student
  3. Navigate to an assessment with drag-drop questions
  4. Attempt to drag items to drop zones
- **Expected Result**: Items should drag smoothly and drop in the correct zones
- **Actual Result**: Items either can't be dragged or jump to incorrect positions
- **Fix Recommendation**: Implement touch-specific event handling for drag-drop functionality

### BUG-005
- **Title**: Images don't scale correctly on extra small screens
- **Severity**: Minor
- **Component**: UI/Responsiveness
- **Description**: On very small mobile screens (width < 320px), some images in the content sections overflow their containers.
- **Steps to Reproduce**:
  1. Set viewport to width of 320px or smaller
  2. Login as student
  3. Navigate to content detail page
  4. Observe images in lesson content
- **Expected Result**: Images should scale to fit within their containers
- **Actual Result**: Some images overflow horizontally, requiring horizontal scrolling
- **Fix Recommendation**: Add additional media queries for extra small screens and ensure max-width is set properly

### BUG-006
- **Title**: Game-based assessment timer continues after tab is inactive
- **Severity**: Minor
- **Component**: Game-based Assessment
- **Description**: When playing a game-based assessment, if the user switches to another browser tab, the timer continues to count down, potentially causing the game to end before the user returns.
- **Steps to Reproduce**:
  1. Login as student
  2. Start a game-based assessment
  3. Switch to another browser tab for more than 10 seconds
  4. Return to the game tab
- **Expected Result**: Timer should pause when tab is inactive
- **Actual Result**: Timer continues counting down, potentially ending the game
- **Fix Recommendation**: Implement tab visibility detection to pause the timer when tab is inactive

### BUG-007
- **Title**: Parent dashboard shows incorrect number of children
- **Severity**: Major
- **Component**: Parent Dashboard
- **Description**: When a parent has multiple children registered, sometimes the dashboard shows an incorrect count or missing children.
- **Steps to Reproduce**:
  1. Register parent account
  2. Register multiple student accounts linked to the parent
  3. Login as parent
  4. View dashboard
- **Expected Result**: All registered children should be displayed
- **Actual Result**: Sometimes fewer children than registered are displayed
- **Fix Recommendation**: Fix the query that retrieves children for parent dashboard

### BUG-008
- **Title**: Drawing questions canvas is too small on high-resolution displays
- **Severity**: Minor
- **Component**: Assessment
- **Description**: On high-resolution displays, the drawing canvas for drawing questions appears too small, making it difficult to draw accurately.
- **Steps to Reproduce**:
  1. Access application on a high-resolution display
  2. Login as student
  3. Navigate to an assessment with drawing questions
  4. Attempt to draw on the canvas
- **Expected Result**: Canvas should be an appropriate size for the display
- **Actual Result**: Canvas is too small, making drawing difficult
- **Fix Recommendation**: Make canvas size responsive to screen resolution

### BUG-009
- **Title**: Content filtering doesn't persist after page refresh
- **Severity**: Minor
- **Component**: Content List
- **Description**: When a user filters content by strand and then refreshes the page, the filter selection is lost and all content is displayed.
- **Steps to Reproduce**:
  1. Login as student
  2. Navigate to content list
  3. Filter by a specific strand
  4. Refresh the page
- **Expected Result**: Filter selection should persist after refresh
- **Actual Result**: Filter is reset and all content is displayed
- **Fix Recommendation**: Store filter selection in session storage or URL parameters

### BUG-010
- **Title**: Incorrect feedback for matching questions with similar answers
- **Severity**: Major
- **Component**: Assessment
- **Description**: In matching questions where multiple matches have similar text, the system sometimes marks correct answers as incorrect.
- **Steps to Reproduce**:
  1. Login as student
  2. Navigate to an assessment with matching questions
  3. Complete a matching question where options have similar text
  4. Submit the assessment
- **Expected Result**: Correct matches should be marked as correct
- **Actual Result**: Some correct matches are incorrectly marked as wrong
- **Fix Recommendation**: Improve the matching algorithm to handle similar text options

## Resolution Status

| Bug ID | Severity | Status | Fixed in Version | Notes |
|--------|----------|--------|------------------|-------|
| BUG-001 | Major | Fixed | 1.0.1 | Updated password validation and hashing |
| BUG-002 | Critical | Fixed | 1.0.1 | Implemented timeout handling and retry mechanism |
| BUG-003 | Major | Fixed | 1.0.1 | Implemented sequential progress updates |
| BUG-004 | Major | Fixed | 1.0.1 | Added touch-specific event handling |
| BUG-005 | Minor | Fixed | 1.0.1 | Added media queries for extra small screens |
| BUG-006 | Minor | Fixed | 1.0.1 | Implemented tab visibility detection |
| BUG-007 | Major | Fixed | 1.0.1 | Fixed parent-child relationship query |
| BUG-008 | Minor | Fixed | 1.0.1 | Made canvas size responsive |
| BUG-009 | Minor | Fixed | 1.0.1 | Added filter persistence using session storage |
| BUG-010 | Major | Fixed | 1.0.1 | Improved matching algorithm |

## Summary
All identified bugs have been fixed in version 1.0.1 of the Year 5 Mathematics Tutorial Program. The fixes have been thoroughly tested to ensure they resolve the issues without introducing new problems.
