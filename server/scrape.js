import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
app.use(cors());

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

const scrapeTheHindu = async (browser) => {
  const page = await browser.newPage();
  try {
    await page.goto("https://www.thehindu.com/latest-news/", {
      waitUntil: "domcontentloaded",
      timeout: 60000, // Increase navigation timeout
    });

    const data = await page.evaluate(() => {
      const titles = Array.from(
        document.querySelectorAll(".right-content .title")
      ).map((el) => el.innerText);
      const labels = Array.from(
        document.querySelectorAll(".right-content .label")
      ).map((el) => el.innerText);
      const urls = Array.from(
        document.querySelectorAll(".right-content .title a")
      ).map((link) => link.href);
      const times = Array.from(document.querySelectorAll(".news-time")).map(
        (el) => el.innerText
      );

      return { titles, labels, urls, times };
    });

    return data.titles.map((title, index) => ({
      source: "The Hindu",
      title,
      label: data.labels[index] || "",
      url: data.urls[index] || "",
      time: data.times[index] || "",
    }));
  } catch (error) {
    console.error('Error scraping The Hindu:', error);
    throw error; // Propagate the error to be handled by the caller
  } finally {
    await page.close();
  }
};

const scrapeIndianExpress = async (browser) => {
  const page = await browser.newPage();
  try {
    await page.goto("https://indianexpress.com/todays-paper/", {
      waitUntil: "domcontentloaded",
      timeout: 60000, // Increase navigation timeout
    });

    const data = await page.evaluate(() => {
      const titles = Array.from(
        document.querySelectorAll(".ev-meter-content strong a")
      ).map((el) => el.innerText);
      const labels = Array.from(
        document.querySelectorAll(".ev-meter-content span a")
      ).map((el) => el.innerText);
      const urls = Array.from(
        document.querySelectorAll(".ev-meter-content strong a")
      ).map((link) => link.href);

      return { titles, labels, urls };
    });

    return data.titles.map((title, index) => ({
      source: "Indian Express",
      title,
      label: data.labels[index] || "",
      url: data.urls[index] || "",
    }));
  } catch (error) {
    console.error('Error scraping Indian Express:', error);
    throw error; // Propagate the error to be handled by the caller
  } finally {
    await page.close();
  }
};

const scrapePIB = async (browser) => {
  const page = await browser.newPage();
  try {
    await page.goto(
      "https://pib.gov.in/PMContents/PMContents.aspx?menuid=1&Lang=1&RegionId=3#",
      { waitUntil: "domcontentloaded", timeout: 60000 } // Increase navigation timeout
    );

    const currentMonth = new Date().getMonth() + 1;
    const pressReleases = [];

    const scrapeMonthYear = async (month) => {
      await page.select("#ContentPlaceHolder1_ddlMonth", month.toString());
      await delay(1800);

      const data = await page.evaluate(() => {
        const titles = Array.from(document.querySelectorAll(".num a")).map(
          (el) => el.innerText
        );
        const urls = Array.from(document.querySelectorAll(".num a")).map(
          (link) => link.href
        );
        const times = Array.from(
          document.querySelectorAll(".num .publishdatesmall")
        ).map((el) => el.innerText);

        return { titles, urls, times };
      });

      return data.titles.map((title, index) => ({
        source: "PIB",
        title,
        url: data.urls[index] || "",
        time: data.times[index] || "",
      }));
    };

    // Scraping current month's press releases
    try {
      const monthlyReleases = await scrapeMonthYear(currentMonth);
      pressReleases.push(...monthlyReleases);
    } catch (error) {
      console.error(`Error scraping data for ${currentMonth}:`, error);
    }

    return pressReleases;
  } catch (error) {
    console.error('Error scraping PIB:', error);
    throw error; // Propagate the error to be handled by the caller
  } finally {
    await page.close();
  }
};

const scrapeAll = async () => {
  console.log('Attempting to launch Puppeteer...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  console.log('Launched Puppeteer');

  try {
    const [hinduNews, expressNews, pibNews] = await Promise.all([
      scrapeTheHindu(browser),
      scrapeIndianExpress(browser),
      scrapePIB(browser),
    ]);

    const allNews = [...hinduNews, ...expressNews, ...pibNews];
    return allNews;
  } catch (error) {
    console.error("Error during parallel scraping:", error);
    throw error;
  } finally {
    await browser.close();
  }
};

app.get("/", async (req, res) => {
  try {
    const allNews = await scrapeAll();
    res.json(allNews);
  } catch (error) {
    console.error('Error in GET / route:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
