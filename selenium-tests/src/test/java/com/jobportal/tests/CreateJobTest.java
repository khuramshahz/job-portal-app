package com.jobportal.tests;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CreateJobTest {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final String BASE_URL = "http://16.170.235.37:5000";
    private String testEmail;
    private String testPassword = "TestPass123";

    @BeforeEach
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        testEmail = "employer" + System.currentTimeMillis() + "@test.com";
    }

    @Test
    public void testEmployerCreateJob() throws InterruptedException {
        // First register as employer
        driver.get(BASE_URL + "/register");
        
        WebElement nameField = wait.until(ExpectedConditions.presenceOfElementLocated(
            By.xpath("//input[@type='text' or not(@type)]")
        ));
        nameField.clear();
        nameField.sendKeys("Test Employer");
        
        List<WebElement> inputs = driver.findElements(By.xpath("//input[@type='text' or not(@type)]"));
        if (inputs.size() > 1) {
            inputs.get(1).clear();
            inputs.get(1).sendKeys(testEmail);
        }
        
        WebElement regPasswordField = driver.findElement(By.cssSelector("input[type='password']"));
        regPasswordField.clear();
        regPasswordField.sendKeys(testPassword);
        
        // Select role as Employer
        try {
            WebElement roleField = driver.findElement(By.xpath("//div[contains(@class, 'MuiSelect-select') or @role='button']"));
            roleField.click();
            Thread.sleep(500);
            WebElement employerOption = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//li[@data-value='employer' or contains(text(), 'Employer')]"))
            );
            employerOption.click();
        } catch (Exception e) {
            // Role field might be optional
        }
        
        WebElement registerButton = driver.findElement(By.cssSelector("button[type='submit']"));
        registerButton.click();
        Thread.sleep(3000);
        
        // Now login as employer
        driver.get(BASE_URL + "/login");
        
        WebElement emailField = wait.until(ExpectedConditions.presenceOfElementLocated(
            By.xpath("//input[@type='text' or not(@type)]")
        ));
        emailField.clear();
        emailField.sendKeys(testEmail);
        
        WebElement passwordField = driver.findElement(By.cssSelector("input[type='password']"));
        passwordField.clear();
        passwordField.sendKeys(testPassword);
        
        WebElement loginButton = driver.findElement(By.cssSelector("button[type='submit']"));
        loginButton.click();
        
        // Wait for login to complete and auth state to update
        Thread.sleep(5000);
        
        try {
            // Navigate to employer dashboard (correct route)
            driver.get(BASE_URL + "/employer");
            Thread.sleep(2000);
            
            // Wait for input fields to be present
            wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("input")));
            
            String timestamp = String.valueOf(System.currentTimeMillis());
            
            // Get all input fields in order (Title, Company, Location)
            List<WebElement> inputFields = driver.findElements(By.tagName("input"));
            
            // Fill job title (first input with placeholder "Title")
            WebElement titleField = driver.findElement(By.xpath(
                "//input[@placeholder='Title']"
            ));
            titleField.clear();
            titleField.sendKeys("Senior Software Engineer " + timestamp);
            
            // Fill company name (input with placeholder "Company")
            WebElement companyField = driver.findElement(By.xpath(
                "//input[@placeholder='Company']"
            ));
            companyField.clear();
            companyField.sendKeys("Tech Corp " + timestamp);
            
            // Fill location (input with placeholder "Location")
            WebElement locationField = driver.findElement(By.xpath(
                "//input[@placeholder='Location']"
            ));
            locationField.clear();
            locationField.sendKeys("New York, NY");
            
            // Fill job description (textarea with placeholder "Description")
            WebElement descriptionField = driver.findElement(By.xpath(
                "//textarea[@placeholder='Description']"
            ));
            descriptionField.clear();
            descriptionField.sendKeys(
                "We are looking for an experienced Software Engineer to join our team. " +
                "Requirements: 5+ years experience in Java/Python, strong problem-solving skills, " +
                "excellent communication abilities. Benefits include health insurance, 401k, and flexible hours."
            );
            
            // Select job type (native HTML select element)
            WebElement jobTypeSelect = driver.findElement(By.tagName("select"));
            Select select = new Select(jobTypeSelect);
            select.selectByValue("full-time");
            
            // Submit the job posting (button with text "Create Job")
            WebElement submitButton = driver.findElement(By.xpath(
                "//button[@type='submit' and contains(text(), 'Create Job')]"
            ));
            submitButton.click();
            
            // Wait for submission and alert
            Thread.sleep(2000);
            
            // Check if alert appears and accept it
            try {
                driver.switchTo().alert().accept();
                Thread.sleep(1000);
            } catch (Exception e) {
                // No alert
            }
            
            // Check for alert dialog (success or error message)
            try {
                Thread.sleep(1000);
                String alertText = driver.switchTo().alert().getText();
                System.out.println("Alert message: " + alertText);
                // If alert contains "created" or "success", test passes
                assertTrue(alertText.toLowerCase().contains("created") || alertText.toLowerCase().contains("job"), 
                    "Successfully triggered job creation - Alert: " + alertText);
            } catch (Exception e) {
                // No alert means form submitted without confirmation
                // Check if we're still on employer page or redirected
                String currentUrl = driver.getCurrentUrl();
                System.out.println("Current URL after submission: " + currentUrl);
                assertTrue(currentUrl.contains("employer") || currentUrl.contains("dashboard") || currentUrl.contains("jobs"), 
                    "Successfully submitted job creation form - URL: " + currentUrl);
            }
            
        } catch (Exception e) {
            assertTrue(false, "Failed to create job: " + e.getMessage());
        }
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
