# Vue Typing Speed Checker App

This is a web application that helps you improve your typing speed and accuracy. The app allows you to specify a duration of time (1, 2, or 3 minutes) during which you will be presented with random quotes fetched from the Forismatic API. Your task is to type each quote as accurately and quickly as possible. At the end of the specified duration, your typing speed and accuracy statistics will be displayed.

## Technologies Used

- Vite: A fast build tooling for modern web development.
- Vue 3: A progressive JavaScript framework for building user interfaces.
- Vue Router 4: The official router for Vue.js applications.
- Axios: A promise-based HTTP client for making API requests.
- HTML: The standard markup language for creating web pages.
- SCSS: A CSS preprocessor that enhances the styling capabilities of CSS.

## Features

- Specify the duration of the typing test (1, 2, or 3 minutes).
- Fetch random quotes from the Forismatic API.
- Start the typing test and see the quote to type.
- Record your typing speed and accuracy.
- Display your results at the end of the test.
- Minimalistic & Responsive design for optimal usage on different devices.

## Prerequisites

Before running the application, ensure that you have the following software installed:

- Node.js: [Download and Install Node.js](https://nodejs.org/en/download/)
- Git: [Download and Install Git](https://git-scm.com/downloads)
- Either Yarn or npm

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Don1k1337/vue-typing-speed-checker.git
```

2. Navigate to the project directory:
```bash
cd typing-speed-checker
```

3. Install the dependencies:
If using Yarn:
```bash
yarn install
```

If using npm:
```bash
npm install
```

### Configuration

The application using external API service for quotes. To configure the base URL and base proxy, create a `.env` file in the project root directory and add the following variables:

```
VITE_BASE_URL=/this-is-the-base-url/
VITE_CORS_PROXY=/this-is-the-proxy/
```

Replace `/this-is-the-base-url/` with your desired base URL and `/this-is-the-proxy/` with the proxy URL if needed.


### Running the app:
   
If using Yarn:
```bash
yarn dev
```

If using npm:
```bash
npm run dev
```
Open your browser and visit http://localhost:5173 to access the application.

