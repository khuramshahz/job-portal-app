# Selenium Tests for Job Portal Application

## Overview
This directory contains Selenium WebDriver tests written in Java for testing the Job Portal application in headless mode.

## Prerequisites
- Java 17 or higher
- Maven 3.6+
- Chrome browser (for ChromeDriver)

## Test Structure
Each test file contains a single test case:

1. **HomePageLoadTest.java** - Tests if home page loads successfully
2. **LoginPageTest.java** - Tests login page accessibility
3. **RegisterPageTest.java** - Tests register page accessibility
4. **JobListPageTest.java** - Tests job listing page loads
5. **PageTitleTest.java** - Tests page title is present
6. **NavigationTest.java** - Tests navigation between pages
7. **ResponseTimeTest.java** - Tests page load performance
8. **LinksTest.java** - Tests presence of links on page
9. **PageLoadCompleteTest.java** - Tests complete page loading
10. **ResponsiveDesignTest.java** - Tests mobile viewport rendering

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
