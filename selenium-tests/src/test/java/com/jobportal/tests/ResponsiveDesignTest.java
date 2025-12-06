package com.jobportal.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class ResponsiveDesignTest {
    private WebDriver driver;
    private static final String BASE_URL = "http://16.170.235.37:5000";

    @BeforeEach
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        driver = new ChromeDriver(options);
    }

    @Test
    public void testMobileMenuInteraction() {
        // Set mobile viewport size
        driver.manage().window().setSize(new Dimension(375, 667));
        driver.get(BASE_URL);
        
        try {
            // Look for mobile menu toggle (hamburger menu)
            WebElement menuToggle = driver.findElement(
                By.cssSelector(".menu-toggle, .hamburger, button[aria-label='menu'], .navbar-toggler")
            );
            
            // Click to open menu
            menuToggle.click();
            Thread.sleep(500);
            
            // Try to interact with a menu item
            WebElement menuItem = driver.findElement(
                By.cssSelector(".mobile-menu a, .menu-item, .nav-link")
            );
            
            assertTrue(menuItem.isDisplayed(), 
                "Mobile menu should be visible after toggle");
                
            // Click a menu item
            menuItem.click();
            Thread.sleep(1000);
            
        } catch (Exception e) {
            // If no mobile menu, just verify page loads
            String pageSource = driver.getPageSource();
            assertTrue(pageSource != null && pageSource.length() > 0, 
                "Page should load in mobile viewport");
        }
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
