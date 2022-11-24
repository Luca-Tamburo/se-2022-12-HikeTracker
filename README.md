![sonarcloud analysis workflow](https://github.com/Luca-Tamburo/se-2022-12-HikeTracker/actions/workflows/sonarcloud.yml/badge.svg)
---
[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=Luca-Tamburo_se-2022-12-HikeTracker)
---
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Luca-Tamburo_se-2022-12-HikeTracker&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Luca-Tamburo_se-2022-12-HikeTracker)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Luca-Tamburo_se-2022-12-HikeTracker&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Luca-Tamburo_se-2022-12-HikeTracker)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Luca-Tamburo_se-2022-12-HikeTracker&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Luca-Tamburo_se-2022-12-HikeTracker)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Luca-Tamburo_se-2022-12-HikeTracker&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Luca-Tamburo_se-2022-12-HikeTracker)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Luca-Tamburo_se-2022-12-HikeTracker&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Luca-Tamburo_se-2022-12-HikeTracker)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Luca-Tamburo_se-2022-12-HikeTracker&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Luca-Tamburo_se-2022-12-HikeTracker)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Luca-Tamburo_se-2022-12-HikeTracker&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Luca-Tamburo_se-2022-12-HikeTracker)
# HikeTracker
Project developed by ***Team-12*** for the course "Software Engineering II," attended during the academic year 2022/23 at Politecnico di Torino, Master's Degree in Computer Engineering.

## Table of Contents

1. [React Client Application Routes](#react-client-application-routes)
2. [API Server](#api-server)
3. [Database Tables](#database-tables)
4. [Test](#test)
5. [Technologies](#technologies)
   - [Frontend](#frontend)
   - [Backend](#backend)
   - [Test](#test)
6. [Source Directory Structure](#source-directory-structure)
7. [Mocks](#mocks)
8. [Team members](#team-members)

## React Client Application Routes

All routes available are listed below

- **`/`** : Home Page 
- **`/login`** : Login Page
- **`/signup`** : Registration Form
- **`/hikes`** : Visitor Page
- **`/hikes/:${id}`** : Page with details and Map
- **`/*`** : 404 Not found 


## API Server

Hereafter, we report the designed HTTP APIs, also implemented in the project.

- POST `/api/sessions`

  - Description: Login of a user by providing email and password.
  - Request body: An object representing the user informations.

  ```
  {
      "email":"stefanopioli@acmilan.com",
      "password":"password"
  }
  ```

  - Response: `200 OK` (success) or `503 Service Unavailable` (generic error). If the login informations are not correct, or if the user did not verify his email `401 Unauthorized`.
  - Response body: User informations in case of success. Error message in case of failure.

  ```
  {
      "id": 2,
      "email": "stefanopioli@acmilan.com",
      "username": "stefanopioli",
      "name": "stefano",
      "surname": "pioli",
      "role": "hiker",
      "phoneNumber": "+393456589563"
  }
  ```

- DELETE `/api/sessions/current`

  - Description: Logout of a logged in user.
  - Request body: _None_
  - Response: `200 OK` (success).If the user is not logged in, `401 Unauthorized`.
  - Response body: _None_

- GET `/api/sessions/current`
  - Description: Retrieve the logged user informations"
  - Request body: _None_
  - Response: `200 OK` (success) or `503 Service Unavailable` (generic error). If the user is not logged in, `401 Unauthorized`.
  - Response body: User informations in case of success. Error message in case of failure.
  ```
  {
      "id": 2,
      "email": "stefanopioli@acmilan.com",
      "username": "stefanopioli",
      "name": "stefano",
      "surname": "pioli",
      "role": "hiker",
      "phoneNumber": "+393456589563"
  }
  ```

- POST `/api/signup`
  - Description: Sign Up a new user by providing his data.
  - Request body: An object representing the user informations (name,surname,phoneNumber are mandatory only if role is localguide,hutworker,emergencyoperator)

  ```
  {
      "email":"stefanopioli@acmilan.com",
      "username":"stefanopioli",
      "password":"password",
      "name":"stefano",
      "surname":"pioli",
      "phoneNumber":"+393323232232",
      "role":"localGuide"
  }
  ```

  - Response: `201 Created` (success) or `503 Service Unavailable` (generic error). If the signup informations are not correct `422 Unprocessable entity`, if the username/email are already present `409 Conflict`.
  - Response body: Confirmation message.

  ```
  {
      "message": "User signed up in the system. Please check your mail to activate the account"
  }
  ```

- GET `/api/signup/:confirmationCode`
  - Description: Confirm a user by his confirmation code.
  - Request body: _None_
  - Response: HTML confirmation page, or `503 Service Unavailable` (generic error). If the user is already signed up or if the verification code is not valid HTML error page
  - Response body: _None_
  

- GET `/api/hikes`
  - Description: Retrieve list of available hikes generic information
  - Request body: _None_
  - Response: `200 OK` (success) or `503 Service Unavailable` (generic error). 
  - Response body: Hike information in case of success. Error message in case of failure.
  ```
  [
     {
          "id": 1,
          "title": "Trail to MONT FERRA",
          "description": "Leaving the car ...",
          "authorName": "aldo",
          "authorSurname": "baglio",
          "uploadDate": "2022-01-10",
          "photoFile": "www. ..."
     },
     {
          "id": 2,
          "title": "Trail to ROCCA PATANUA",
          "description": "Patanua means ...",
          "authorName": "aldo",
          "authorSurname": "baglio",
          "uploadDate": "2022-04-12",
          "photoFile": "www. ..."
      },
    ....
  ]
  ```

- GET `/hikegpx/:id`
  - Description: Retrieve gpx file path for a specific hike id
  - Request body: id
  - Response: `200 OK` (success), `422` (no id in request parameter) or `503 Service Unavailable` (generic error). 
  - Response body: gpx file path in case of success. Error message in case of failure.
  ```
     {
          "gpxFile": "1_Montw_Ferra.gpx"
     }
  ```

- GET `/hikedetails/:id`
  - Description: Retrieve details (including point information) for a specific hike id
  - Request body: id
  - Response: `200 OK` (success), `422` (no id in request parameter) or `503 Service Unavailable` (generic error). 
  - Response body: detailed information of the hike including a list of points. Error message in case of failure.
  ```
  {
     "id": 1,
     "title": "Trail to MONT FERRA",
     "description": "Leaving the car ...",
     "authorName": "aldo",
     "authorSurname": "baglio",
     "uploadDate": "2022-01-10",
     "photoFile": "www. ..."
     "length": 13,
     "expectedTime": 5,
     "ascent": 1280,
     "difficulty": 4,
     "startPointId": 1,
     "endPointId": 2,
     "pointList": 
        [
          {
               "id": 1,
               "name": "Refugio Melezè ...",
               "description": "The building was a ...",
               "type": "hut",
               "latitude": 44.5744896554157,
               "longitude": 6.98160500000067,
               "altitude": 1812,
               "city": "Berllino",
               "province": "Cuneo"
          },
          {
               "id": 2,
               "name": "Monte Ferra",
               "description": "Peak of ...",
               "type": "gpsCoordinates",
               "latitude": 44.57426,
               "longitude": 6.98264,
               "altitude": 3094,
               "city": null,
               "province": null
          } 
        ]
  }     

## Database Tables

#### _Hike_ includes all hikes specifications
 ```
     Hike(id,title,description,length,expectedTime,ascent,difficulty,startPointId,endPointId,authorId,uploadDate,gpxFile,photoFile)
     PRIMARY KEY ( Id )
     FOREIGN KEY (authorId, startPointId, endPointId) REFERENCES User ( id ) , Point ( id ) , Point ( id )
 ```

#### _HikePoint_ includes relation between Hike and Point
```
     HikePoint( hikeId,pointId)
     PRIMARY KEY ( hikeId , pointId )
     FOREIGN KEY (hikeId , pointId ) REFERENCES Point ( id ) , Point ( id )
```

#### _Point_ includes all Points specifications
```
     Point( id, name, description, type, longitude, latitude, altitude, city, province )
     PRIMARY KEY ( id )
```

#### _Hut_ includes all Huts specification
```
     Hut( id, roomsNumber, bedsNumber, whenIsOpen,phoneNumber, photosPath, pointId )
     PRIMARY KEY ( id )
     FOREIGN KEY ( pointId ) REFERENCES Point ( id )
```

#### _User_ includes all Users specification
```
     User( id, email, username, role, name, surname, phoneNumber, hash, salt, verifiedEmail, confirmationCode )
     PRIMARY KEY ( id )
```

#### _UserPreferences_ includes preferences specified by the user
```
     UserPreferences( id, duration, altitude, ascent, length, difficulty, userId )
     PRIMARY KEY ( id )
      FOREIGN KEY ( userId ) REFERENCES User ( id )

```

## Users Credentials
```
 aldobaglio@gmail.com : password
 Email verified
```
```
 stefanopioli@acmilan.com : password
 Email verified
```
```
 antonioconte@gmail.com : password
 Email NOT verified
```

### The tables used in this project are

## Test

## Technologies

### Frontend

```names
- Axios
- Bootstrap
- Formik
- React
- React Bootstrap
- React Icons
- React Router Dom
- React Toastify
- Yup
- Dayjs
````

### Backend

```names
- Cors
- Express
- Express Session
- Express Validator
- Morgan
- Passport
- Passport Local
- Sqlite3
- Dayjs
- Nodejs
````

### Test

```names
- Jest
- Mocha
- Cypress
````

## Source Directory Structure

Here you can find a visual schema of source directory structure by means the tree chart below and a short description for each folder.

```structure
|--- /client
     |--- /public
          |--- /favicon.ico
          |--- /index.html
          |--- /logo192.png
          |--- /logo512.png
          |--- /manifest.json
          |--- /robots.txt
     |--- /src
          |--- /assets
               |--- /carousel
                    |--- /first.jpg
                    |--- /second.jpg
                    |--- /third.jpg
                    |--- /fourth.jpg
               |--- /logo
                    |--- /logo-black.svg
                    |--- /logo-color.svg
                    |--- /logo-no-background.svg
                    |--- /logo-white.svg
          |--- /components
               |--- /ui-core
                    |--- /index.js
               |--- /utils
                    |--- /index.js
               |--- /index.js
          |--- /hooks
               |--- /useNotification.js
          |--- /services
               |--- /api.js
          |--- /views
          |--- /App.css
          |--- /App.jsx
          |--- /App.test.jsx
          |--- /index.css
          |--- /index.js
          |--- /logo.svg
          |--- /reportWebVitals.js
          |--- /setupTests.js
     |--- /.gitignore
     |--- /package-lock.json
     |--- /package.json
     |--- /README.md
|--- /mocks
     |--- /homePage
          |--- /Homepage_1.png
          |--- /Homepage_2.png
          |--- /Homepage_3.png
          |--- /Homepage_4.png
|--- /retrospective
|--- /server
     |--- /config
          |--- /auth.config.js
          |--- /nodemailer.config.js
     |--- /dao
          |--- /hikeDao.js
          |--- /userDao.js
     |--- /mockDB
          |--- /unitTests
                    |--- /hike.test.js
          |--- /mockDB.js
          |--- /mockHikeTracker.db
     |--- /models
          |--- /hikeModel.js
          |--- /pointModel.js
     |--- /routes
          |--- /hikeRoute.js
          |--- /sessionRoute.js
          |--- /signUpRoute.js
     |--- /utils
          |--- /afterConfirmEmailPages
               |--- /confirm.html
               |--- /error.html
          |--- /gpxFiles
               |--- /1_Monte_Ferra.gpx
               |--- /2_Rocca_Patanua.gpx
          |--- /sessionUtil.js
          |--- /signUpUtil.js
          |--- /validationUtil.js
     |--- /.gitignore
     |--- /index.js
     |--- /hikeTracker.sqlite3     
     |--- /package-lock.json
     |--- /package.json
     |--- /README_server.md
|--- /README.MD
```

## Mocks

### HomePage Carousel

![HomePage Carousel - 4](./mocks/homePage/Homepage_4.png)

## Team members

| Matricola   |   Surname   | Name        |
| :---------: | :---------  | :---------- |
| s301146     | Colelli     | Antonio     |
| s294427     | Hevia       | Adriana     |
| s305925     | Miccono     | Edoardo     |
| s303399     | Sambin      | Gabriele    |
| s303907     | Tamburo     | Luca        |
| s301587     | Trovero     | Fabio       |
