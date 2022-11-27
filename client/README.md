# HikeTracker - Client

## Table of Contents

1. [Source Directory Structure](#source-directory-structure)
2. [Main react components](#main-react-components)
3. [Main react views](#main-react-views)
4. [Getting Started with Create React App](#getting-started-with-create-react-app)

## Source Directory Structure

Here you can find a visual schema of source directory structure by means the tree chart below and a short description for each folder.

```structure

|--- /client
     |--- /cypress
          |--- /downloads
          |--- /e2e
               |--- /addHike.e2e.cy.js
               |--- /addHut.e2e.cy.js
               |--- /addParking.e2e.cy.js
               |--- /hikeDetails.e2e.cy.js
               |--- /hikes.e2e.cy.js
               |--- /home.e2e.cy.js
               |--- /homeRouting.e2e.cy.js
               |--- /login.e2e.cy.js
               |--- /RigthFile.gpx
          |--- /fixtures
               |--- /example.json
          |--- /integration
          |--- /plugin
               |--- /index.js
          |--- /support
               |--- /commands.js
               |--- /e2e.js
               |--- /index.js
     |--- /public
          |--- /favicon.ico
          |--- /index.html
          |--- /logo192.png
          |--- /logo512.png
          |--- /manifest.json
          |--- /robots.txt
     |--- /src
          |--- /assets
               |--- /localGuideService
                    |--- /AddHikeService.png
                    |--- /AddHutService.png
                    |--- /AddParkingService.png
               |--- /logo
                    |--- /logo-black.png
                    |--- /logo-color.png
                    |--- /logo-no-background.png
                    |--- /logo-white.png
               |--- /mapIcons
                    |--- /finish.png
                    |--- /mountain.png
                    |--- /start.png
               |--- /authenticationImg.jpg
               |--- /femaleImg.jpg
               |--- /homeImg.jpg
               |--- /loginImage.svg
               |--- /maleImage.svg
               |--- /registerImg.svg
          |--- /components
               |--- /ui-core
                    |--- /HikeCard
                         |--- /HikeCard.css
                         |--- /HikeCard.jsx
                         |--- /HikeCard.test.jsx
                    |--- /LocalGuideServiceCard
                         |--- /LocalGuideServiceCard.css
                         |--- /LocalGuideServiceCard.jsx
                         |--- /LocalGuideServiceCard.test.jsx
                    |--- /Locate
                         |--- /AddMarker.jsx
                         |--- /LocationMarker.jsx
                         |--- /SetYourLocation.test.jsx
                    |--- /LoginForm
                         |--- /LoginForm.jsx
                         |--- /LoginForm.test.jsx
                    |--- /Navbar
                         |--- /Navbar.css
                         |--- /Navbar.jsx
                         |--- /Navbar.test.jsx
                    |--- /RegisterForm
                         |--- /RegisterForm.jsx
                         |--- /RegisterForm.test.jsx
                         |--- /RegisterFormAdvanced.test.jsx
                    |--- /index.js
               |--- /utils
                    |--- /AppContainer
                         |--- /AppContainer.jsx
                         |--- /AppContainer.test.jsx
                    |--- /Filter
                         |--- /Filter.css
                         |--- /Filter.jsx
                         |--- /Filter.test.jsx
                    |--- /Input
                         |--- /Check.jsx
                         |--- /index.jsx
                         |--- /Input.jsx
                         |--- /Input.test.jsx
                         |--- /Select.jsx
                         |--- /Select.test.jsx
                         |--- /TextArea.jsx
                         |--- /TextArea.test.jsx
                    |--- /ProtectedRoute
                         |--- /LocalGuideProtectedRoute.jsx
                         |--- /ProtectedRoute.jsx
                    |--- /index.js
                    |--- /Input.jsx
               |--- /index.js
          |--- /constants
               |--- /AddHikeForm.js
               |--- /AddHutForm.js
               |--- /AddParkingForm.js
               |--- /Filter.js
               |--- /index.js
               |--- /LocalGuideService.js
               |--- /registerAdvancedForm.js
               |--- /registerForm.js
          |--- /contexts
               |--- /AuthContext.jsx
          |--- /data
               |--- /cities.json
               |--- /provinces.json
               |--- /regions.json
          |--- /hooks
               |--- /useNotification.js
          |--- /lib
               |--- /helpers
                    |--- /location.js
          |--- /services
               |--- /api.js
          |--- /validation
               |--- /AddHikeSchema.js
               |--- /AddHutSchema.js
               |--- /AddParkingSchema.js
               |--- /LoginSchema.js
               |--- /RegisterAdvancedSchema.js
               |--- /RegisterSchema.js
          |--- /views
               |--- /AddHike
                    |--- /AddHike.jsx
                    |--- /AddHike.test.jsx
               |--- /AddHut
                    |--- /AddHut.jsx
                    |--- /AddHut.test.jsx
               |--- /AddParking
                    |--- /AddParking.jsx
                    |--- /AddParking.test.jsx
               |--- /Email
                    |--- /EmailConf.jsx
                    |--- /EmailConf.test.jsx
                    |--- /EmailErr.jsx
                    |--- /EmailErr.test.jsx
               |--- /ErrorView
                    |--- /ErrorView.jsx
                    |--- /ErrorView.test.jsx
               |--- /Hike
                    |--- /Hike.jsx
                    |--- /Hike.test.jsx
               |--- /HikeDetails
                    |--- /HikeDetails.jsx
                    |--- /HikeDetails.test.jsx 
               |--- /Home
                    |--- /Home.css
                    |--- /Home.jsx  
                    |--- /Home.test.jsx  
               |--- /LocalGuidePage
                    |--- /LocalGuidePage.jsx
                    |--- /LocalGuidePage.test.jsx
               |--- /Login
                    |--- /Login.jsx
                    |--- /Login.test.jsx
               |--- /Register
                    |--- /Register.jsx
                    |--- /Register.test.jsx
               |--- /index.js
          |--- /App.css
          |--- /App.jsx
          |--- /App.test.jsx
          |--- /index.css
          |--- /index.js
          |--- /logo.svg
          |--- /reportWebVitals.js
          |--- /setupTests.js
     |--- /.gitignore
     |--- /.cypress.config.js
     |--- /package-lock.json
     |--- /package.json
     |--- /README.md
```

## Main react components

### `Hike Card`

This component shows the basic information of a hike.

### `Login Form`

This component contains the login form that calls the correlated API on submit.

### `Register Form`

This component contains the register form that calls the correlated API on submit.

### `Filter`

This component manages the filters.

## Main react views

### `Add Hike`

This page shows the form to add a hike.

### `Add Hut`

This page shows the form and the map to add an hut.

### `Add Parking`

This page shows the form and the map to add a parking lot.

### `Hike`

This page shows all the hikes in the db and allows you to filter the hikes based on predetermined parameters.

### `Hike Details`

This page shows all the information for a single hike. In addition, if you are a local guide, the map is also shown and you can download the gpx file.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
