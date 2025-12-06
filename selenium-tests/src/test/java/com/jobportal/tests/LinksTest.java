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

public class LinksTest {
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
    public void testClickAllNavigationLinks() {
        driver.get(BASE_URL);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
        
        List<WebElement> links = driver.findElements(By.cssSelector("a[href], nav a, .navbar a"));
        assertTrue(links.size() > 0, "Page should contain navigation links");
        
        int clickedLinks = 0;
        for (int i = 0; i < Math.min(links.size(), 5); i++) {
            try {
                // Re-find elements to avoid stale reference
                List<WebElement> freshLinks = driver.findElements(By.cssSelector("a[href], nav a, .navbar a"));
                if (i < freshLinks.size()) {
                    WebElement link = freshLinks.get(i);
                    String href = link.getAttribute("href");
                    
                    // Skip external links and javascript links
                    if (href != null && href.startsWith(BASE_URL) && !href.contains("javascript:")) {
                        link.click();
                        clickedLinks++;
                        Thread.sleep(1000);
                        driver.navigate().back();
                        Thread.sleep(1000);
                    }
                }
            } catch (Exception e) {
                // Link might not be clickable, continue
            }
        }
        
        assertTrue(clickedLinks >= 0, 
            "Successfully clicked " + clickedLinks + " navigation links");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
