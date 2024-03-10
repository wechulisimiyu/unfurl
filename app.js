const express = require("express");
const path = require("path");
const { chromium } = require("playwright");
const { isMoodlePage } = require("./src/utils/moodleChecker");
const { isWordPressPage } = require("./src/utils/wordpressChecker");
const ejsMate = require("ejs-mate");
const fs = require("fs");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { result: null, screenshotPath: null});
});

app.post("/analyze", async (req, res) => {
  const { url } = req.body;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { timeout: 60000 }); // Increase timeout to 60 seconds

    // Take a full-page screenshot and save it to a file
    const screenshotPath = path.join(__dirname, "public", "screenshot.png");
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const htmlContent = await page.content();
    const isMoodle = isMoodlePage(htmlContent);
    const isWordPress = isWordPressPage(htmlContent);

    let result;
    if (isMoodle) {
      result = "This is a Moodle page.";
    } else if (isWordPress) {
      result = "This is a WordPress page.";
    } else {
      result =
        "This is neither a Moodle nor a WordPress page. Currently, I am only able to give you a semi-confident response if the webite has been built using Moodle or Wordpress. More to come.";
    }

    await browser.close();
    res.render("index", { result, screenshotPath: "/screenshot.png" });
  } catch (error) {
    console.error(error);
    await browser.close();
    res.status(500);
    result = "Sort of got an error while analyzing the webpage. Bear with me";
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
