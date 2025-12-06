# Selenium Tests for Job Portal Application

## Overview
This directory contains automated Selenium WebDriver tests written in Java for testing the Job Portal application deployed on AWS EC2. Tests run in headless Chrome mode and are integrated with Jenkins CI/CD pipeline.

## Prerequisites
- Java 17 or higher
- Maven 3.6+
- Chrome browser (for ChromeDriver)

## Test Structure
Each test file contains a single test case (Total: 12 tests):

1. **HomePageLoadTest.java** - Tests if home page loads successfully
2. **LoginPageTest.java** - Tests login functionality with registration flow
3. **RegisterPageTest.java** - Tests user registration with Material-UI form
4. **JobListPageTest.java** - Tests job listing page with filters
5. **PageTitleTest.java** - Tests page title is correct
6. **NavigationTest.java** - Tests navigation between pages
7. **ResponseTimeTest.java** - Tests page load performance under 5 seconds
8. **LinksTest.java** - Tests all links work correctly
9. **PageLoadCompleteTest.java** - Tests complete page loading
10. **ResponsiveDesignTest.java** - Tests mobile viewport rendering
11. **ApplyForJobTest.java** - Tests job application flow (create job as employer, apply as applicant)
12. **CreateJobTest.java** - Tests employer job posting on dashboard

## CI/CD Integration
✅ **Automated Testing**: Tests run automatically on every GitHub push via Jenkins
✅ **Email Notifications**: Test results are emailed to commit author
✅ **EC2 Deployment**: Tests validate application running on http://16.170.235.37:5000

## Running Tests

### Run all tests:
```bash
cd selenium-tests
mvn clean test
```

### Run a specific test:
```bash
mvn test -Dtest=HomePageLoadTest
```

### Run tests with verbose output:
```bash
mvn test -X
```

## Configuration
- Base URL is configured in each test file: `http://16.170.235.37:5000`
- All tests run in headless mode by default
- WebDriverManager automatically downloads and manages ChromeDriver

## Test Reports
Test results are generated in `target/surefire-reports/` directory after running tests.
