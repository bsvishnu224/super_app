# Super App

A responsive React application that combines multiple mini applications into a single dashboard experience.

## Features

### Registration

* User registration form with validation.
* Stores user information globally using Zustand.

### Dashboard

* Displays:

  * User Profile
  * Notes Widget
  * Weather Widget
  * News Widget
  * Countdown Timer

### Notes

* Users can write notes.
* Notes are automatically saved in local storage using Zustand persistence.

### Weather

* Fetches current weather data using OpenWeather API.
* Displays:

  * Temperature
  * Weather condition
  * Pressure
  * Wind speed
  * Humidity
  * Current date and time

### News

* Fetches latest headlines using News API.
* Automatically changes the displayed news every 2 seconds.

### Entertainment

* Displays movie recommendations based on the user's selected categories.
* Fetches movie information from OMDb API.
* Clicking a movie opens a modal with:

  * Poster
  * Title
  * Genre
  * Rating
  * Runtime
  * Plot
  * Cast

### Timer

* Custom countdown timer.
* Circular progress indicator.
* Start and Pause functionality.

## Tech Stack

* React.js
* Tailwind CSS
* React Router
* Zustand
* Axios
* OpenWeather API
* News API
* OMDb API

## Installation

```bash
git clone https://github.com/bsvishnu224/super_app.git
cd super-app
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_NEWS_API_KEY=your_news_api_key
VITE_MOVIES_API_KEY=your_omdb_api_key
```
## Note

The News widget uses NewsAPI. Due to the limitations of the free Developer plan, news data is available only in local development (`localhost`) and may not work on the deployed Vercel application.

## Build

```bash
npm run build
```

## Author

Vishnu 
