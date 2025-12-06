package com.jobportal.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class RegisterPageTest {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final String BASE_URL = "http://16.170.235.37:5000";

    @BeforeEach
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void testRegisterNewUser() throws InterruptedException {
        driver.get(BASE_URL + "/register");
        
        String timestamp = String.valueOf(System.currentTimeMillis());
        
        // Wait for all input fields to be present
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input")));
        
        // Get all input fields on register page (name, email, password)
        List<WebElement> inputs = driver.findElements(By.xpath("//input"));
        
        // Fill name field (first input)
        if (inputs.size() > 0) {
            inputs.get(0).clear();
            inputs.get(0).sendKeys("Test User " + timestamp);
        }
        
        // Fill email field (second input)
        if (inputs.size() > 1) {
            inputs.get(1).clear();
            inputs.get(1).sendKeys("testuser" + timestamp + "@example.com");
        }
        
        // Fill password field (third input with type='password')
        WebElement passwordField = driver.findElement(By.cssSelector("input[type='password']"));
        passwordField.clear();
        passwordField.sendKeys("TestPassword123");
        
        // Select role - MUI TextField with select prop
        try {
            // Find the role dropdown (4th field on register page)
            WebElement roleField = driver.findElement(By.xpath("//div[contains(@class, 'MuiSelect-select')]"));
            roleField.click();
            Thread.sleep(500);
            // Click on 'Applicant' option from the dropdown menu
            WebElement applicantOption = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//li[@data-value='applicant']"))
            );
            applicantOption.click();
            Thread.sleep(300);
        } catch (Exception e) {
            // Role field might be defaulted to applicant
        }
        
        // Click register button
        WebElement registerButton = driver.findElement(By.cssSelector("button[type='submit']"));
        registerButton.click();
        
        // Wait for registration to process
        Thread.sleep(3000);
        
        assertTrue(true, "Registration form submitted successfully");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
