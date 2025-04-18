# No BS Countdown

I wanted a countdown app that doesn't show ads. So I made one with React to refresh my React+JS.

## Features

- Clean, ad-free countdown timer
- Customizable event title
- Date and time picker
- Real-time countdown with days, hours, minutes, seconds, and milliseconds
- URL-based sharing (countdown information is stored in the URL)
- Dark theme UI

## Technology Stack

- React 18
- TypeScript
- Material-UI components
- React Router for URL-based state management
- Parcel for building and bundling

## Usage

1. Enter a title for your countdown
2. Select a target date and time
3. Watch the countdown in real-time
4. Share the URL to share your countdown with others

## URL Schema

The app uses URL path segments to store and share countdown information:

```
https://mtib.github.io/no-bs-countdown/#/TITLE/YEAR/MONTH/DAY/HOUR/MINUTE
```

Parameters:
- `TITLE`: The name of the event (automatically URL encoded)
- `YEAR`, `MONTH`, `DAY`: Date components 
- `HOUR`, `MINUTE`: Time components

For example:
```
https://mtib.github.io/no-bs-countdown/#/New%20Year/2024/1/1/0/0
```

This path-based approach allows you to bookmark countdowns or share them with others without needing a backend server.

## Development

```
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Live Demo

Visit [https://mtib.github.io/no-bs-countdown](https://mtib.github.io/no-bs-countdown) to see the app in action.
