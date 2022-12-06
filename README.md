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

1. [Docker Documentation](#docker-documentation)
2. [React Client Application Routes](#react-client-application-routes)
3. [API Server](#api-server)
4. [Database Tables](#database-tables)
5. [Testing](#testing)
   - [Client](#client)
   - [Server](#server)
6. [Technologies](#technologies)
   - [Frontend](#frontend)
   - [Backend](#backend)
7. [Team members](#team-members)

## Docker Documentation

Docker documentation is available <a href="https://hub.docker.com/repository/docker/antoniocolelli/se-2022-12-hiketracker" target="_blank">here</a> (Repository README)


## React Client Application Routes

All routes available are listed below

- **`/`** : In this route you can find the login and signup buttons. In addition, you can access the complete list of hike.
- **`/login`** : In this route you can find the login form.
- **`/signup`** : In this route you can choose which role a user wants to register with.
- **`/signup/:role`** : In this route you can find the register form.
- **`/hikes`** : In this page you can find the list of all hike and they can be filtered according to predetermined parameters.
- **`/hikes/:${id}`** : In this route you can find the details of an individual hike. Also if you have an account, you can view the map and you can download the gpx file.
- **`/localGuide`** : **This route is protected. The user must be authenticated as local guide to navigate here.** It is a personal page for a local guide where he can add a hike, hut or parking lot.
- **`/addHike`** : **This route is protected. The user must be authenticated as local guide to navigate here.** You can add a hike.
- **`/addHut`** : **This route is protected. The user must be authenticated as local guide to navigate here.** You can add a hut.
- **`/addParking`** : **This route is protected. The user must be authenticated as local guide to navigate here.** You can add a parking lot.
- **`/*`** : Any other route is matched by this one where the application shows a page not found error.

## API Server

Hereafter, we report the designed HTTP APIs, also implemented in the project.

- POST `/api/sessions`

  - Description: Login of a user by providing email and password.
  - Request body: An object representing the user informations.

  ```json
  {
      "email":"stefanopioli@acmilan.com",
      "password":"password"
  }
  ```

  - Response: `200 OK` (success) or `503 Service Unavailable` (generic error). If the login informations are not correct, or if the user did not verify his email `401 Unauthorized`.
  - Response body: User informations in case of success. Error message in case of failure.

  ```json
  {
      "id": 2,
      "email": "stefanopioli@acmilan.com",
      "username": "stefanopioli",
      "name": "stefano",
      "surname": "pioli",
      "role": "hiker",
      "phoneNumber": "+393456589563",
      "gender":"M"
  }
  ```

- DELETE `/api/sessions/current`

  - Description: Logout of a logged in user.
  - Request body: *None*
  - Response: `200 OK` (success).If the user is not logged in, `401 Unauthorized`.
  - Response body: *None*

- GET `/api/sessions/current`
  - Description: Retrieve the logged user informations"
  - Request body: *None*
  - Response: `200 OK` (success) or `503 Service Unavailable` (generic error). If the user is not logged in, `401 Unauthorized`.
  - Response body: User informations in case of success. Error message in case of failure.

  ```json
  {
      "id": 2,
      "email": "stefanopioli@acmilan.com",
      "username": "stefanopioli",
      "name": "stefano",
      "surname": "pioli",
      "role": "hiker",
      "phoneNumber": "+393456589563",
      "gender":"M"
  }
  ```

- POST `/api/signup`
  - Description: Sign Up a new user by providing his data.
  - Request body: An object representing the user informations (name,surname,phoneNumber are mandatory only if role is localguide,hutworker,emergencyoperator)

  ```json
  {
      "email":"stefanopioli@acmilan.com",
      "username":"stefanopioli",
      "password":"password",
      "name":"stefano",
      "surname":"pioli",
      "phoneNumber":"+393323232232",
      "role":"localGuide",
      "gender":"M"
  }
  ```

  - Response: `201 Created` (success) or `503 Service Unavailable` (generic error). If the signup informations are not correct `422 Unprocessable entity`, if the username/email are already present `409 Conflict`.
  - Response body: Confirmation message.

  ```json
  {
      "message": "User signed up in the system. Please check your mail to activate the account"
  }
  ```

- GET `/api/signup/:confirmationCode`
  - Description: Confirm a user by his confirmation code.
  - Request body: *None*
  - Response: HTML confirmation page, or `503 Service Unavailable` (generic error). If the user is already signed up or if the verification code is not valid HTML error page
  - Response body: *None*

- GET `/api/hikes`
  - Description: Retrieve list of available hikes generic information
  - Request body: *None*
  - Response: `200 OK` (success) or `503 Service Unavailable` (generic error).
  - Response body: Hike information in case of success. Error message in case of failure.

  ```json
  [
     {
          "id": 1,
          "title": "Trail to MONTE FERRA",
          "description": "Leaving ...",
          "length": 13,
          "expectedTime": 5,
          "ascent": 1280,
          "difficulty": "Professional Hiker",
          "authorName": "aldo",
          "authorSurname": "baglio",
          "uploadDate": "2022-01-10",
          "photoFile": "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          "latitude": 44.5744896554157,
          "longitude": 6.98160500000067,
          "altitude": 1812,
          "city": "Bellino",
          "province": "Cuneo ",
          "region": "Piemonte"
      },     
      {
          "id": 2,
          "title": "Trail to ROCCA PATANUA",
          "description": "Patanua ..",
          "length": 9,
          "expectedTime": 5.5,
          "ascent": 980,
          "difficulty": "Professional Hiker",
          "authorName": "stefano",
          "authorSurname": "pioli",
          "uploadDate": "2022-04-12",
          "photoFile": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
          "latitude": 45.15013536737316,
          "longitude": 7.236844649658008,
          "altitude": 1430,
          "city": "Condove",
          "province": "Torino ",
          "region": "Piemonte"
     },
    ....
  ]
  ```

- GET `/hikedetails/:hikeId`
  - Description: Retrieve details (including point information) for a specific hike
  - Request body: hikeId
  - Response: `200 OK` (success), `404 NOT FOUND` if the id does not correspond to a hike, `503 Service Unavailable` (generic error).
  - Response body: detailed information of the hike including a list of points. Error message in case of failure.

  ```json
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
     "gpx": "gpx file data if loggedin, nothing ("") if not logged in"
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

- POST `/api/hikes`
  - Description: Insert an Hike in the system.
  - Request body: An object representing the hike

  ```json
  {
     "title":"sss",
     "description":"kkk",
     "expectedTime":33.33,
     "difficulty":"Hiker",
     "photoFile":"http:// ... "
  }

  ```

  - Request files: .File : The GPX file, .Image : The hike image
  - Response: `201 CREATED` (success), `420` if the input is not correct, `503 Service Unavailable` (generic error).
  - Response body: Confirmation message.

  ```json

  {
      "message": "Hike inserted in the system"
  }

  ```

- GET `/api/hikegpx/:hikeId`
  - Description: Download the gpx file of the relative :hikeId.
  - Request body: *None*
  - Response: The gpx file, or `503 Service Unavailable` (generic error). `404 NOT FOUND` If the gpx file is not present
  - Response body: *None*

- POST `/api/parking`
  - Description: Insert parking point in the system.
  - Request body: An object representing the parking point

  ```json

  {
     "title":"parking",
     "description":"big parking area near the start of the hike!",
     "latitude": 44.57426,
     "longitude": 6.98264,
     "altitude": 3094,
     "capacity": 30
  }

  ```

  - Response: `201 CREATED` (success), `422` if the input is not correct, `503 Service Unavailable` (generic error).
  - Response body: Confirmation message.

  ```json

  {
      "message": "Parking inserted in the system"
  }

  ```

- POST `/api/hut`
  - Description: Insert hut in the system.
  - Request body: An object representing the hut information

  ```json

  {
     "title":"hut ...",
     "description":"breakfast included ...",
     "latitude": 44.57426,
     "longitude": 6.98264,
     "altitude": 3094,
     "roomsNumber": 2,
     "bedsNumber": 3,
     "phoneNumber": "+393323232232",
     "photoFile": "http:// ... ",
     "website": "http:// ... "
  }

  ```
  - Request files: .Image : The hut image

  - Response: `201 CREATED` (success), `422` if the input is not correct, `503 Service Unavailable` (generic error).
  - Response body: Confirmation message.

  ```json

  {
      "message": "Hut inserted in the system"
  }

  ```

- GET `/hikeStartEnd/:hikeId`
  - Description: Retrieve the current start/end point and some other possible start/end points (hut/parking lot) for an hike
  - Request body: _nothing_
  - Response: `200 OK` (success), `404 NOT FOUND` if the id is not found among the ones inserted by the localguide who made the request, `422` if the :hikeId format is wrong, `503 Service Unavailable` (generic error).
  - Response body: detailed information of current and possible start/end points of the hike.

  ```json
  {
    "currentStartPoint": {
        "id": 1,
        "name": "A",
        "type": "hut",
        "latitude": 44.57425086759031,
        "longitude": 6.982689192518592
    },
    "currentEndPoint": {
        "id": 2,
        "name": "Monte",
        "type": "location",
        "latitude": 44.60207778029144,
        "longitude": 6.984752649441361
    },
    "possibleStartingPoints": [
        {
            "id": 5,
            "name": "Rifugio ...",
            "type": "hut",
            "latitude": 44.5742508675904,
            "longitude": 6.98268919251855,
            "distance": 0.333
        },
        {
            "id": 15,
            "name": "Casa ...",
            "type": "hut",
            "latitude": 44.6020777802915,
            "longitude": 6.98475264944132,
            "distance": 3.102
        },
        {
            "id": 39,
            "name": "Parcheggio ...",
            "type": "parking lot",
            "latitude": 44.5742508675904,
            "longitude": 6.98268919251855,
            "distance": 2.111
        }
    ],
    "possibleEndPoints": [
        {
            "id": 5,
            "name": "Rifugio...",
            "type": "hut",
            "latitude": 44.5742508675905,
            "longitude": 6.98268919251856,
            "distance": 3.102
        },
        {
            "id": 15,
            "name": "Casa ...",
            "type": "hut",
            "latitude": 44.6020777802912,
            "longitude": 6.98475264944133,
            "distance": 3.567
        },
        {
            "id": 39,
            "name": "Parcheggio ...",
            "type": "parking lot",
            "latitude": 44.5742508675907,
            "longitude": 6.98268919251858,
            "distance": 3.102
        }
    ]
  }

- PUT `/hikeStartEnd/:hikeId`
  - Description: Modify an Hike start/end point with a hut/parking lot.
  - Request body: An object representing the new infos

  ```json
  {
     "startPointId":1,
     "startPointId":2
  }

  ```

  - Response: `204` (success), `422` if the input is not correct, `404` if something is not found, `503 Service Unavailable` (generic error).
  - Response body: _nothing_


## Database Tables

#### *Hike* includes all hikes specifications

 ```table
     Hike(id,title,description,length,expectedTime,ascent,difficulty,startPointId,endPointId,authorId,uploadDate,gpxFile,photoFile)
     PRIMARY KEY ( Id )
     FOREIGN KEY (authorId, startPointId, endPointId) REFERENCES User ( id ) , Point ( id ) , Point ( id )

 ```

#### *HikePoint* includes relation between Hike and Point

```

     HikePoint( hikeId,pointId)
     PRIMARY KEY ( hikeId , pointId )
     FOREIGN KEY (hikeId , pointId ) REFERENCES Point ( id ) , Point ( id )

```

#### *Point* includes all Points specifications

```

     Point( id, name, description, type, longitude, latitude, altitude, city, province, region )
     PRIMARY KEY ( id )

```

#### *Hut* includes all Huts specification

```

     Hut( id, roomsNumber, bedsNumber, whenIsOpen,phoneNumber, photosPath, pointId )
     PRIMARY KEY ( id )
     FOREIGN KEY ( pointId ) REFERENCES Point ( id )

```

#### *User* includes all Users specification

```

     User( id, email, username, role, name, surname, gender, phoneNumber, hash, salt, verifiedEmail, confirmationCode )
     PRIMARY KEY ( id )

```

#### *UserPreferences* includes preferences specified by the user

```

     UserPreferences( id, duration, altitude, ascent, length, difficulty, userId )
     PRIMARY KEY ( id )
      FOREIGN KEY ( userId ) REFERENCES User ( id )

```

## Users Credentials

|           Email           |    Password    | Role              | Email is verified?|
|:-------------------------:|:--------------:|:-----------------:|:-----------------:|
| aldobaglio@gmail.com      |   password     |   localGuide      |        Yes        |
| stefanopioli@acmilan.com  |   password     |   hiker           |        Yes        |
| antonioconte@gmail.com    |   password     |   localGuide      |        No         |

## Testing

### Client

The libraries used for testing are `Jest` for unit testing, `Cypress` for end to end testing.

To run all the unit tests

```text

npm run test a

```

To run the end to end tests

```text

npm run startTest

```

#### Note: to run these commands you must be in `/code/client/`

### Server

The libraries used for testing are `Jest` for unit testing, `Mocha` and `Chai` for integration testing.

To run the unit tests

```text

npm run test

```

To run the integration tests

```text

npm run test_integration

```

#### Note: to run these commands you must be in `/code/server/`

## Technologies

### Frontend

```json
"dependencies": {
    "@mapbox/togeojson": "^0.16.0",
    "@testing-library/dom": "^8.19.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.4.3",
    "@tmcw/togeojson": "^5.5.0",
    "autoprefixer": "^10.4.13",
    "axios": "^1.1.3",
    "bootstrap": "^5.2.2",
    "classnames": "^2.3.2",
    "cypress": "^11.2.0",
    "cypress-dark": "^1.8.3",
    "dayjs": "^1.11.6",
    "formik": "^2.2.9",
    "gps-file-converter": "^1.0.4",
    "gpx-parser-builder": "^1.0.2",
    "gpxparser": "^3.0.8",
    "history": "^5.3.0",
    "leaflet": "^1.9.2",
    "path": "^0.12.7",
    "postcss-flexbugs-fixes": "^5.0.2",
    "postcss-normalize": "^10.0.1",
    "postcss-preset-env": "^7.8.3",
    "react": "^18.2.0",
    "react-bootstrap": "^2.5.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.6.0",
    "react-leaflet": "^4.1.0",
    "react-router-dom": "^6.4.3",
    "react-scripts": "5.0.1",
    "react-toastify": "^9.1.1",
    "togeojson": "^0.16.0",
    "web-vitals": "^2.1.4",
    "xmldom": "^0.6.0",
    "yup": "^0.32.11",
    "yup-password": "^0.2.2",
    "zlib": "^1.0.5"
  },
   "devDependencies": {
    "@testing-library/cypress": "^8.0.7",
    "@types/leaflet": "^1.9.0",
    "fs": "^0.0.1-security"
  }
````

### Backend

```json
  "dependencies": {
    "chai-http": "^4.3.0",
    "cors": "^2.8.5",
    "cypress": "^10.11.0",
    "dayjs": "^1.11.6",
    "express": "^4.18.2",
    "express-fileupload": "^1.4.0",
    "express-session": "^1.17.3",
    "express-validator": "^6.14.2",
    "fs": "^0.0.1-security",
    "image-url-validator": "^1.0.4",
    "jest": "^29.2.1",
    "jwt-encode": "^1.0.1",
    "morgan": "^1.10.0",
    "node-fetch": "^2.6.7",
    "nodemailer": "^6.8.0",
    "nodemon": "^2.0.20",
    "parse-gpx": "^2.1.0",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "path": "^0.12.7",
    "sqlite3": "^5.1.2"
  },
  "devDependencies": {
    "chai": "^4.3.6",
    "mocha": "^10.1.0",
    "mocha-steps": "^1.3.0",
    "mochawesome": "^7.1.3",
    "supertest": "^6.3.0"
  }
````

## Team members

| Matricola   |   Surname   | Name        |
| :---------: | :---------  | :---------- |
| s301146     | Colelli     | Antonio     |
| s294427     | Hevia       | Adriana     |
| s305925     | Miccono     | Edoardo     |
| s303399     | Sambin      | Gabriele    |
| s303907     | Tamburo     | Luca        |
| s301587     | Trovero     | Fabio       |
