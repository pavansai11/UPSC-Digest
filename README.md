# UPSC Digest

UPSC Digest is a web application designed to assist UPSC aspirants by providing them with the latest news updates from The Hindu, daily news from Indian Express, and press releases from the Press Information Bureau (PIB) website. Users can also store notes about specific articles fetched from the news sources.

## Features

- Fetches latest news updates from The Hindu.
- Retrieves daily news from Indian Express.
- Gathers press releases from the Press Information Bureau (PIB) website.
- Users can store notes about specific articles.

## Project Structure

The project consists of the following directories:

- **client**: Contains the React application for the frontend.
- **server**: Contains two servers for backend functionality:
  - **server.js**: Handles authentication routes.
  - **scrape.js**: Fetches news from The Hindu, Indian Express, and PIB.
  
## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/upsc-digest.git
```

2. Navigate to the project directory:

```
cd upsc-digest
```

3. Install dependencies for both frontend and backend:

```
cd client
npm install
cd ../server
npm install
```

4. Start the backend servers:

```
cd server
node server.js
node scrape.js
```
The authentication server will run on port 5000 and the scraping server will run on port 8080.

5. Start the React frontend:

```
cd client
npm start
```
The React application will run on port 3000.

6. Open your web browser and navigate to 'http://localhost:3000' to view the UPSC Digest web application.


## Technologies Used
- React.js for the frontend.
- Express.js for the backend.
- Passport.js for authentication.
- Puppeteer for web scraping.

## License
This project is licensed under the MIT License.
