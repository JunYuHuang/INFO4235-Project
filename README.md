# INFO4235-Project: Aniflex

![Aniflex Demo Preview](https://imgur.com/a/GNyz8Ub)

Aniflex is the course project for the class INFO 4235: Special Topics In Web & Mobile Development.

This is a mobile app that lets users explore anime titles and build their anime list with optional notes.

## Features

- View basic information on an anime title retrieved from the MyAnimeList database
- Search the MyAnimeList database for anime titles based on textual keywords
- Add and remove an anime title to and from a user’s list respectively
- Write and edit notes to an existing anime on a user’s list
- Clear or delete all of the user’s local data
- Store the user’s list and notes in persistent data storage via SQLite
- View basic information about the developers on the About page or screen

## Technologies Used

- Axios
- Expo
- JavaScript
- Jikan v3 API
- React
- React Native
- React Native Vector Icons
- React Navigation
- Redux
- SQLite
- Styled-Components

## TODO / Backlog

- Add pagination or infinite scrolling to SearchScreen
- Add cachedDefaultSearchResults slice to Redux store for SearchScreen
- Update Back button and Heading text sizes on About and Settings screen to be consistent with rest of Screen pages
- Rework layout of "Back" and "Add / Remove" buttons on DetailScreen to be on their own row instead of sharing it with the anime title

## Completed TODOs

- Debug and fix app so that it works on Android (via Android Studio AVD Emulator)
- Add "X" icon button on SearchScreen to clear the current non-blank search query / term
- Force vertical FlatList on SearchScreen to automatically scroll to the top when a new search term has returned new results
- Force focus on TextInput on DetailScreen when user presses "Edit" button for notes
- Force unfocus on TextInput on DetailScreen when user presses "Save" button for notes
- Migrate DetailScreen state from React to Redux
- Add additional loading screen from initial startup
- Update LoadingDisplay to use a animated, rotating icon or jpeg image
- Add SQLite functionality for saving data to local persistent storage
- Optimize storing of search results in Redux
- Add alert for clearing user data on SettingsScreen
