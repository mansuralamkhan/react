import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

describe('E2E Selenium Tests', () => {
  let driver;
  
  beforeAll(async () => {
    // 🎯 This connects to the Selenium service
    const options = new chrome.Options();
    options.addArguments('--headless=new'); // Run without UI
    
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .usingServer('http://localhost:4444/wd/hub') // ← Connects to Selenium
      .build();
  });
  
  afterAll(async () => {
    await driver.quit();
  });
  
  test('should load homepage', async () => {
    await driver.get('http://localhost:3000');
    const title = await driver.getTitle();
    expect(title).toContain('React App');
  });
  
  test('should click button and navigate', async () => {
    await driver.get('http://localhost:3000');
    const button = await driver.findElement(By.css('button'));
    await button.click();
    
    // Wait for navigation
    await driver.wait(until.urlContains('/new-page'), 5000);
    expect(await driver.getCurrentUrl()).toContain('/new-page');
  });
});