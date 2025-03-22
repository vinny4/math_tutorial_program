# Test Plan for Year 5 Mathematics Tutorial Program

## Overview
This document outlines the comprehensive testing approach for the Year 5 Mathematics Tutorial Program developed for students in Perth, Western Australia. The testing will ensure that all components work correctly together and identify any bugs or issues before final delivery.

## Test Environment
- Local development environment
- Modern web browsers (Chrome, Firefox, Safari, Edge)
- Various screen sizes (desktop, tablet, mobile)
- Internet connection with varying speeds

## Test Categories

### 1. Authentication Testing

| Test ID | Test Case | Test Steps | Expected Result | Status |
|---------|-----------|------------|-----------------|--------|
| AUTH-01 | Student Registration | 1. Navigate to registration page<br>2. Fill in student details<br>3. Submit form | Account created successfully and redirected to student dashboard | Pending |
| AUTH-02 | Parent Registration | 1. Navigate to registration page<br>2. Fill in parent details<br>3. Submit form | Account created successfully and redirected to parent dashboard | Pending |
| AUTH-03 | Admin Registration | 1. Navigate to registration page<br>2. Fill in admin details<br>3. Submit form | Account created successfully and redirected to admin dashboard | Pending |
| AUTH-04 | Student Login | 1. Navigate to login page<br>2. Enter student credentials<br>3. Submit form | Login successful and redirected to student dashboard | Pending |
| AUTH-05 | Parent Login | 1. Navigate to login page<br>2. Enter parent credentials<br>3. Submit form | Login successful and redirected to parent dashboard | Pending |
| AUTH-06 | Admin Login | 1. Navigate to login page<br>2. Enter admin credentials<br>3. Submit form | Login successful and redirected to admin dashboard | Pending |
| AUTH-07 | Invalid Login | 1. Navigate to login page<br>2. Enter incorrect credentials<br>3. Submit form | Error message displayed and remain on login page | Pending |
| AUTH-08 | Logout | 1. Click logout button while logged in | Logout successful and redirected to landing page | Pending |

### 2. Dashboard Testing

| Test ID | Test Case | Test Steps | Expected Result | Status |
|---------|-----------|------------|-----------------|--------|
| DASH-01 | Student Dashboard Load | 1. Login as student<br>2. Navigate to dashboard | Dashboard loads with correct student information and progress | Pending |
| DASH-02 | Parent Dashboard Load | 1. Login as parent<br>2. Navigate to dashboard | Dashboard loads with correct parent information and children's progress | Pending |
| DASH-03 | Admin Dashboard Load | 1. Login as admin<br>2. Navigate to dashboard | Dashboard loads with correct admin information and system stats | Pending |
| DASH-04 | Student Progress Display | 1. Login as student<br>2. Check progress section on dashboard | Accurate progress information displayed with visual elements | Pending |
| DASH-05 | Parent Children List | 1. Login as parent<br>2. Check children section on dashboard | List of children displayed with their basic progress information | Pending |
| DASH-06 | Admin Content Overview | 1. Login as admin<br>2. Check content section on dashboard | Content statistics displayed correctly by strand | Pending |

### 3. Content Testing

| Test ID | Test Case | Test Steps | Expected Result | Status |
|---------|-----------|------------|-----------------|--------|
| CONT-01 | Content List Load | 1. Navigate to content list page<br>2. Check content display | All content items displayed with correct information and images | Pending |
| CONT-02 | Content Filtering | 1. Navigate to content list page<br>2. Filter by strand | Only content from selected strand displayed | Pending |
| CONT-03 | Content Detail Load | 1. Select a content item<br>2. Navigate to detail page | Content details displayed correctly with all sections | Pending |
| CONT-04 | Content Navigation | 1. On content detail page<br>2. Navigate between Learn and Practice tabs | Correct tab content displayed when switching | Pending |
| CONT-05 | Content Images | 1. Navigate through various content pages<br>2. Check all images | All images load correctly and are appropriate for Year 5 students | Pending |

### 4. Assessment Testing

| Test ID | Test Case | Test Steps | Expected Result | Status |
|---------|-----------|------------|-----------------|--------|
| ASMT-01 | Multiple Choice Questions | 1. Start an assessment<br>2. Answer multiple choice questions | Questions display correctly with options and submit works | Pending |
| ASMT-02 | Fill-in Questions | 1. Start an assessment<br>2. Answer fill-in questions | Questions display correctly with input field and submit works | Pending |
| ASMT-03 | True/False Questions | 1. Start an assessment<br>2. Answer true/false questions | Questions display correctly with options and submit works | Pending |
| ASMT-04 | Matching Questions | 1. Start an assessment<br>2. Complete matching questions | Questions display correctly with matching interface and submit works | Pending |
| ASMT-05 | Drag-Drop Questions | 1. Start an assessment<br>2. Complete drag-drop questions | Questions display correctly with drag interface and submit works | Pending |
| ASMT-06 | Ordering Questions | 1. Start an assessment<br>2. Complete ordering questions | Questions display correctly with ordering interface and submit works | Pending |
| ASMT-07 | Drawing Questions | 1. Start an assessment<br>2. Complete drawing questions | Questions display correctly with drawing canvas and submit works | Pending |
| ASMT-08 | Assessment Scoring | 1. Complete an assessment<br>2. Submit answers | Score calculated correctly and displayed with appropriate feedback | Pending |
| ASMT-09 | Progress Tracking | 1. Complete an assessment<br>2. Check progress page | Assessment results correctly recorded in progress tracking | Pending |
| ASMT-10 | Adaptive Question Generation | 1. Complete several assessments<br>2. Start a new assessment | Questions adapt based on previous performance | Pending |
| ASMT-11 | Game-Based Assessment | 1. Start a game-based assessment<br>2. Play through the game | Game mechanics work correctly and score is tracked properly | Pending |

### 5. Progress Tracking Testing

| Test ID | Test Case | Test Steps | Expected Result | Status |
|---------|-----------|------------|-----------------|--------|
| PROG-01 | Progress Page Load | 1. Navigate to progress page<br>2. Check display | Progress information displayed correctly with visual elements | Pending |
| PROG-02 | Progress Filtering | 1. Navigate to progress page<br>2. Filter by strand | Only progress from selected strand displayed | Pending |
| PROG-03 | Achievement Display | 1. Complete assessments to earn achievements<br>2. Check achievements section | Earned achievements displayed correctly with images | Pending |
| PROG-04 | Parent Progress View | 1. Login as parent<br>2. View child's progress | Child's progress displayed correctly with all details | Pending |
| PROG-05 | Progress Reports | 1. Navigate to progress reports<br>2. Generate a report | Report generated with accurate information and visualizations | Pending |

### 6. Admin Features Testing

| Test ID | Test Case | Test Steps | Expected Result | Status |
|---------|-----------|------------|-----------------|--------|
| ADMN-01 | User Management | 1. Login as admin<br>2. Navigate to user management<br>3. View user list | Users displayed correctly with management options | Pending |
| ADMN-02 | Content Management | 1. Login as admin<br>2. Navigate to content management<br>3. View content list | Content displayed correctly with management options | Pending |
| ADMN-03 | Add New Content | 1. Login as admin<br>2. Navigate to add content<br>3. Fill form and submit | New content added successfully to the system | Pending |
| ADMN-04 | Edit Content | 1. Login as admin<br>2. Navigate to edit content<br>3. Modify and submit | Content updated successfully in the system | Pending |
| ADMN-05 | Term Management | 1. Login as admin<br>2. Navigate to term management<br>3. View terms | Terms displayed correctly with management options | Pending |

### 7. Responsiveness Testing

| Test ID | Test Case | Test Steps | Expected Result | Status |
|---------|-----------|------------|-----------------|--------|
| RESP-01 | Desktop View | 1. Access application on desktop<br>2. Navigate through pages | All pages display correctly on desktop resolution | Pending |
| RESP-02 | Tablet View | 1. Access application on tablet<br>2. Navigate through pages | All pages display correctly on tablet resolution | Pending |
| RESP-03 | Mobile View | 1. Access application on mobile<br>2. Navigate through pages | All pages display correctly on mobile resolution | Pending |
| RESP-04 | Image Scaling | 1. View pages with images on different devices<br>2. Check image scaling | Images scale appropriately for different screen sizes | Pending |

### 8. Performance Testing

| Test ID | Test Case | Test Steps | Expected Result | Status |
|---------|-----------|------------|-----------------|--------|
| PERF-01 | Page Load Time | 1. Navigate to various pages<br>2. Measure load time | Pages load within acceptable time limits | Pending |
| PERF-02 | Assessment Load Time | 1. Start various assessments<br>2. Measure load time | Assessments load within acceptable time limits | Pending |
| PERF-03 | Game Performance | 1. Start game-based assessments<br>2. Play through games | Games run smoothly without performance issues | Pending |
| PERF-04 | Concurrent Users | 1. Simulate multiple concurrent users<br>2. Monitor system performance | System handles concurrent users without degradation | Pending |

### 9. Security Testing

| Test ID | Test Case | Test Steps | Expected Result | Status |
|---------|-----------|------------|-----------------|--------|
| SEC-01 | Authentication Security | 1. Attempt to access protected pages without login<br>2. Check response | Redirected to login page with appropriate message | Pending |
| SEC-02 | Role-Based Access | 1. Login as different user roles<br>2. Attempt to access restricted pages | Access granted or denied based on user role | Pending |
| SEC-03 | Data Validation | 1. Submit forms with invalid data<br>2. Check response | Appropriate validation errors displayed | Pending |
| SEC-04 | Session Management | 1. Login and remain inactive<br>2. Attempt to use application after timeout | Session expires appropriately and requires re-login | Pending |

### 10. Offline Capability Testing

| Test ID | Test Case | Test Steps | Expected Result | Status |
|---------|-----------|------------|-----------------|--------|
| OFLN-01 | Offline Access | 1. Load application<br>2. Disconnect from internet<br>3. Navigate through pages | Core functionality available offline | Pending |
| OFLN-02 | Data Synchronization | 1. Complete activities offline<br>2. Reconnect to internet | Data synchronizes correctly when connection restored | Pending |

## Bug Tracking
All identified bugs will be documented with the following information:
- Bug ID
- Description
- Steps to reproduce
- Severity (Critical, Major, Minor, Cosmetic)
- Status (Open, In Progress, Fixed, Closed)
- Screenshots (if applicable)

## Test Execution Schedule
1. Unit Testing: March 22-23, 2025
2. Integration Testing: March 23-24, 2025
3. System Testing: March 24-25, 2025
4. User Acceptance Testing: March 25-26, 2025
5. Regression Testing: March 26, 2025

## Test Deliverables
- Test Plan (this document)
- Test Cases
- Test Results
- Bug Reports
- Test Summary Report
