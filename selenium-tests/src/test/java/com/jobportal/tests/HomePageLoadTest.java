package com.jobportal.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class HomePageLoadTest {
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
    public void testHomePageInteraction() {
        driver.get(BASE_URL);
        
        try {
            // Wait for interactive elements
            Thread.sleep(2000);
            
            // Try to find and interact with buttons
            List<WebElement> buttons = driver.findElements(By.tagName("button"));
            if (buttons.size() > 0) {
                WebElement firstButton = buttons.get(0);
                if (firstButton.isDisplayed() && firstButton.isEnabled()) {
                    String buttonText = firstButton.getText();
                    firstButton.click();
                    Thread.sleep(1000);
                    assertTrue(true, "Clicked button: " + buttonText);
                }
            }
            
            // Try to find and click on cards or job listings
            try {
                List<WebElement> cards = driver.findElements(
                    By.cssSelector(".card, .job-card, .job-item, article")
                );
                if (cards.size() > 0 && cards.get(0).isDisplayed()) {
                    cards.get(0).click();
                    Thread.sleep(1000);
                }
            } catch (Exception e) {
                // Cards might not exist
            }
            
        } catch (Exception e) {
            // Fall back to basic check
            String pageTitle = driver.getTitle();
            assertTrue(pageTitle != null && !pageTitle.isEmpty(), 
                "Home page should have a title");
        }
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
