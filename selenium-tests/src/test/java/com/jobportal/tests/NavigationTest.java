package com.jobportal.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class NavigationTest {
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
    public void testNavigationMenuInteraction() {
        driver.get(BASE_URL);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
        
        try {
            // Find and click on navigation links
            WebElement loginLink = wait.until(ExpectedConditions.elementToBeClickable(
                By.cssSelector("a[href*='login']")
            ));
            
            String initialUrl = driver.getCurrentUrl();
            loginLink.click();
            
            // Wait for navigation
            wait.until(ExpectedConditions.urlToBe(BASE_URL + "/login"));
            String newUrl = driver.getCurrentUrl();
            
            assertTrue(!initialUrl.equals(newUrl), 
                "Clicking navigation link should change URL");
            
            // Navigate back
            driver.navigate().back();
            wait.until(ExpectedConditions.urlToBe(BASE_URL + "/"));
            
            // Try clicking Register link
            try {
                WebElement registerLink = driver.findElement(
                    By.cssSelector("a[href*='register']")
                );
                registerLink.click();
                wait.until(ExpectedConditions.urlContains("register"));
            } catch (Exception e) {
                // Register link might not be visible
            }
            
        } catch (Exception e) {
            assertTrue(false, "Navigation menu interaction failed: " + e.getMessage());
        }
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
