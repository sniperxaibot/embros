const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  
  // Desktop landing
  const p1 = await browser.newPage();
  await p1.setViewportSize({ width: 1440, height: 900 });
  await p1.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await p1.waitForTimeout(2000);
  await p1.screenshot({ path: path.join(__dirname, 'docs/shot-landing.png'), fullPage: false });
  console.log('1. Desktop landing');

  // Mobile landing
  const p2 = await browser.newPage();
  await p2.setViewportSize({ width: 390, height: 844 }); // iPhone 14
  await p2.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await p2.waitForTimeout(2000);
  await p2.screenshot({ path: path.join(__dirname, 'docs/shot-mobile-landing.png'), fullPage: false });
  console.log('2. Mobile landing');

  // Mobile IDE
  await p2.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) { if (b.textContent.includes('Landing Page')) { b.click(); break; } }
  });
  await p2.waitForTimeout(4000);
  await p2.screenshot({ path: path.join(__dirname, 'docs/shot-mobile-ide.png'), fullPage: false });
  console.log('3. Mobile IDE');

  // Desktop IDE
  await p1.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) { if (b.textContent.includes('Landing Page')) { b.click(); break; } }
  });
  await p1.waitForTimeout(4000);
  await p1.screenshot({ path: path.join(__dirname, 'docs/shot-desktop-ide.png'), fullPage: false });
  console.log('4. Desktop IDE');

  await browser.close();
  console.log('All done!');
})();
