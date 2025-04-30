# Navigator.ba - Automated Smoke Tests

This project contains automated smoke tests for [navigator.ba](https://www.navigator.ba), written in JavaScript using:

- Selenium WebDriver
- Mocha
- Chai
- Node.js

## Project Structure

```
navigator-tests/
├── pages/
│   └── NavigatorHomePage.js
├── tests/
│   └── Navigator.test.js
├── package.json
└── README.md
```

## How to Run the Tests

### 1. Clone the repository

git clone https://github.com/fahrizada/Atlant-task.git
navigate to 

### 2. Install dependencies

Make sure you are inside the **project folder** (where `package.json` is located), then run:
npm install

This will install all required packages listed in `package.json`.

> You do NOT need to run `npm init` or manually install `selenium-webdriver`, `mocha`, or `chai` — that is already handled.

### 3. Run the tests

Use the following command to execute the test suite:

npm test test/Navigator.test.js

##  Known Issues

Several forms on the site return an unexpected error upon submission. See the bug report section for more details.
