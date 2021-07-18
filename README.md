# INFO4235-Project: Aniflex

Aniflex is the course project for the class INFO 4235: Special Topics In Web & Mobile Development.

This is a mobile app that lets users explore anime titles and build their anime list with optional notes.

## Technologies Used

- JavaScript
- Expo
- React Native
- Redux
- React Navigation
- Styled-Components
- SQLite
- React Native Vector Icons
- Jikan v3 API

## TODO / Backlog

- Migrate DetailScreen state from React to Redux
- Add SQLite functionality for saving data to local persistent storage
- Add pagination or infinite scrolling to the SearchScreen
- Deploy app?
- Update Back button and Heading text sizes on About and Settings screen to be consistent with rest of Screen pages
- Rework layout of "Back" and "Add / Remove" buttons on DetailScreen to be on their own row instead of sharing it with the anime title

## Completed TODOs

- Debug and fix app so that it works on Android (via Android Studio AVD Emulator)
- Add "X" icon button on SearchScreen to clear the current non-blank search query / term
- Force vertical FlatList on SearchScreen to automatically scroll to the top when a new search term has returned new results
- Force focus on TextInput on DetailScreen when user presses "Edit" button for notes
- Force unfocus on TextInput on DetailScreen when user presses "Save" button for notes
