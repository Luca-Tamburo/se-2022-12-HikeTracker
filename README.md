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
5. [Users credentials](#users-credentials)
6. [Testing](#testing)
   - [Client](#client)
   - [Server](#server)
7. [Technologies](#technologies)
   - [Frontend](#frontend)
   - [Backend](#backend)
8. [Team members](#team-members)

## Docker Documentation

Docker documentation is available <a href="https://hub.docker.com/repository/docker/antoniocolelli/se-2022-12-hiketracker" target="_blank">here</a> (Repository README)

## React Client Application Routes

All routes available are listed below

- **`/`** : In this route you can find the login and signup buttons. In addition, you can access the complete list of hike.
- **`/login`** : In this route you can find the login form.
- **`/signup`** : In this route you can choose which role a user wants to register with.
- **`/signup/:role`** : In this route you can find the register form.
- **`/hikes`** : In this page you can find the list of all hike and they can be filtered according to predetermined parameters.
- **`/hikes/:${hikeId}`** : In this route you can find the details of an individual hike. If you have an account, you can view the map and you can download the gpx file. Also, if you are logged in as a LocalGuide and select a hike you created yourself, you can link a hut to a hike, add one or more reference points on the hike, and edit start and end points.
- **`/huts`** : **This route is protected. The user must be authenticated to navigate here.** In this page you can find the list of all hut and they can be filtered according to predetermined parameters.
- **`/huts/:${hutId}`** : **This route is protected. The user must be authenticated to navigate here.** In this route you can find the details of an individual hut.
- **`/hiker/completedHikes`** : **This route is protected. The user must be authenticated as an hiker to navigate here.**. In this route you can find the history of all the hikes you have completed.
- **`/localGuide`** : **This route is protected. The user must be authenticated as local guide to navigate here.** In this route you can find a personal page for a local guide where he can add a hike, hut, parking lot or see the hike I've inserted.
- **`/localGuide/hikes`** : **This route is protected. The user must be authenticated as local guide to navigate here.** In this route you can find all the hike created by a local guide.
- **`/addHike`** : **This route is protected. The user must be authenticated as local guide to navigate here.** In this route you can find a form to enter a hike.
- **`/addHut`** : **This route is protected. The user must be authenticated as local guide to navigate here.** n this route you can find a form to enter a hut.
- **`/addParking`** : **This route is protected. The user must be authenticated as local guide to navigate here.** n this route you can find a form to enter a parking lot.
- **`/addReferencePoint/:${hikeId}`** : **This route is protected. The user must be authenticated as local guide to navigate here and he must have created that particular hike.** In this route you can find a map to select a reference point on the hike and a list of its points.
- **`/linkHutToHike/:${hikeId}`** : **This route is protected. The user must be authenticated as local guide to navigate here and he must have created that particular hike.** In this route you can find a map to link a hut to a hike and a list of linked huts within 5 km.
- **`/hikeStartEndPoint/:${hikeId}`** : **This route is protected. The user must be authenticated as local guide to navigate here and he must have created that particular hike.** In this route you can find a map to change the current start and/or end point to a hut or parking lot within 5 km.
- **`/email/confirmed`** : In this route you can find a screen that notifies the user that the email confirmation was successful and that they can log in.
- **`/email/error`** : In this route you can find a screen notifying the user that the email confirmation was unsuccessful and that they cannot log in.
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
          "authorId": 1,
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
          "authorId": 2,
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

- GET `/api/localGuideHikes`
  - Description: Retrieve list of available hikes (loaded from the loggedin localguide) generic information
  - Request body: *None*
  - Response: `200 OK` (success) or `401 Unauthorized` if the request is not done by a localguide, `503 Service Unavailable` (generic error).
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
          "authorId": 1,
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
          "authorId": 2,
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

- GET `/api/hikedetails/:hikeId`
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
     "authorId": 1,
     "uploadDate": "2022-01-10",
     "photoFile": "www. ...",
     "length": 13,
     "expectedTime": 5,
     "ascent": 1280,
     "difficulty": 4,
     "startPointId": 1,
     "endPointId": 2,
     "gpx": "gpx file data if loggedin, nothing ("") if not logged in",
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

- GET `/api/huts`
  - Description: Retrieve list of available huts generic information
  - Request body: *None*
  - Response: `200 OK` (success) or `503 Service Unavailable` (generic error).
  - Response body: Hut information array in case of success. Error message in case of failure.

  ```json
  [
     {
          "id": 1,
          "name": "Hut",
          "description": "Big ...",
          "roomsNumber": 13,
          "bedsNumber": 20,
          "photoFile": "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          "latitude": 44.5744896554157,
          "longitude": 6.98160500000067,
          "altitude": 1812,
          "city": "Condove",
          "province": "Torino ",
          "region": "Piemonte"
      },     
      {
          "id": 2,
          "name": "Refugio",
          "description": "Beautiful ...",
          "roomsNumber": 3,
          "bedsNumber": 30,
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

- GET `/api/hutdetails/:hutId`
  - Description: Retrieve details for a specific hut given its id
  - Request body: hutId
  - Response: `200 OK` (success), `404 NOT FOUND` if the id does not correspond to a hut, `503 Service Unavailable` (generic error).
  - Response body: detailed information of the hut. Error message in case of failure.

  ```json
  {
      "id": 2,
      "name": "Refugio",
      "description": "Beautiful ...",
      "roomsNumber": 3,
      "bedsNumber": 30,
      "photoFile": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
      "latitude": 45.15013536737316,
      "longitude": 7.236844649658008,
      "altitude": 1430,
      "website": "https://...",
      "whenIsOpen": "Always",
      "phoneNumber": "+3757320306",
      "city": "Condove",
      "province": "Torino ",
      "region": "Piemonte"
  }

- GET `/api/hikeStartEnd/:hikeId`
  - Description: Retrieve the current start/end point and some other possible start/end points (hut/parking lot) for an hike
  - Request body: *nothing*
  - Response: `200 OK` (success), `422` if the :hikeId format is wrong,or if the localguide did not insert that hike `503 Service Unavailable` (generic error).
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

- PUT `/api/hikeStartEnd/:hikeId`
  - Description: Modify an Hike start/end point with a hut/parking lot.
  - Request body: An object representing the new infos

  ```json
  {
     "startPointId":1,
     "startPointId":2
  }

  ```

  - Response: `204` (success), `422` if the localguide did not upload that hike or if the input is not correct, `404` if something is not found, `503 Service Unavailable` (generic error).
  - Response body: *nothing*

- GET `/api/hikeLinkHuts/:hikeId`
  - Description: Retrieve the start/end point, current linked huts possible ones of an hike
  - Request body: *nothing*
  - Response: `200 OK` (success), `422` if the :hikeId format is wrong,or if the localguide did not insert that hike `503 Service Unavailable` (generic error).
  - Response body: detailed information of start/end point, current/possible ref points (huts)

  ```json
  {
    "startPoint": {
        "id": 1,
        "name": "Rifugio Melezè - Bellino - Val Varaita",
        "type": "hut",
        "latitude": 44.57425086759031,
        "longitude": 6.982689192518592,
        "description": "The ...",
        "city": "Bellino",
        "province": "Cuneo",
        "region": "Piemonte"
    },
    "endPoint": {
        "id": 2,
        "name": "Monte Ferra",
        "type": "location",
        "latitude": 44.60207778029144,
        "longitude": 6.984752649441361,
        "description": "The ...",
        "city": "Bellino",
        "province": "Cuneo",
        "region": "Piemonte"

    },
    "currentLinkedHuts": [
        {
            "id": 16,
            "name": "Hut Freidour",
            "type": "hut",
            "description": "The...",
            "latitude": 44.973129,
            "longitude": 7.303155,
            "altitude": 1757.43,
            "city": "Bellino",
            "province": "Cuneo",
            "region": "Piemonte"
        }
    ],
    "possibleLinkedHuts": [
        {
            "id": 3,
            "name": "Hut Freidoure",
            "type": "hut",
            "description": "The...",
            "latitude": 44.4973129,
            "longitude": 7.4303155,
            "altitude": 1757.143,
            "city": "Bellino",
            "province": "Cuneo",
            "region": "Piemonte"
        },
        {
            "id": 4,
            "name": "Hut Greidour",
            "type": "hut",
            "description": "The...",
            "latitude": 44.5973129,
            "longitude": 7.6303155,
            "altitude": 1757.343,
            "city": "Bellino",
            "province": "Cuneo",
            "region": "Piemonte"
        }
    ]
  }

- PUT `/api/hikeLinkHuts/:hikeId`
  - Description: Link huts to an hike
  - Request body: An object representing the huts to link

  ```json
  {
      "hutsToLink":[1,2,15,1,2,16,50]
  }

  ```

  - Response: `204` (success), `422` if the localguide did not upload that hike or if the input is not correct, `404` if something is not found, `503 Service Unavailable` (generic error).
  - Response body: *nothing*

- GET `/api/hikeLinkHuts/:hikeId`
  - Description: Retrieve the start/end point, current linked huts possible ones of an hike
  - Request body: *nothing*
  - Response: `200 OK` (success), `422` if the :hikeId format is wrong,or if the localguide did not insert that hike `503 Service Unavailable` (generic error).
  - Response body: detailed information of start/end point, current/possible ref points (huts)

  ```json
  {
    "startPoint": {
        "id": 1,
        "name": "Rifugio Melezè - Bellino - Val Varaita",
        "type": "hut",
        "latitude": 44.57425086759031,
        "longitude": 6.982689192518592,
        "description": "The ...",
        "city": "Bellino",
        "province": "Cuneo",
        "region": "Piemonte"
    },
    "endPoint": {
        "id": 2,
        "name": "Monte Ferra",
        "type": "location",
        "latitude": 44.60207778029144,
        "longitude": 6.984752649441361,
        "description": "The ...",
        "city": "Bellino",
        "province": "Cuneo",
        "region": "Piemonte"

    },
    "currentLinkedHuts": [
        {
            "id": 16,
            "name": "Hut Freidour",
            "type": "hut",
            "description": "The...",
            "latitude": 44.973129,
            "longitude": 7.303155,
            "altitude": 1757.43,
            "city": "Bellino",
            "province": "Cuneo",
            "region": "Piemonte"
        }
    ],
    "possibleLinkedHuts": [
        {
            "id": 3,
            "name": "Hut Freidoure",
            "type": "hut",
            "description": "The...",
            "latitude": 44.4973129,
            "longitude": 7.4303155,
            "altitude": 1757.143,
            "city": "Bellino",
            "province": "Cuneo",
            "region": "Piemonte"
        },
        {
            "id": 4,
            "name": "Hut Greidour",
            "type": "hut",
            "description": "The...",
            "latitude": 44.5973129,
            "longitude": 7.6303155,
            "altitude": 1757.343,
            "city": "Bellino",
            "province": "Cuneo",
            "region": "Piemonte"
        }
    ]
  }

- PUT `/api/hikeLinkHuts/:hikeId`
  - Description: Link huts to an hike
  - Request body: An object representing the huts to link

  ```json
  {
      "hutsToLink":[1,2,15,1,2,16,50]
  }

  ```

  - Response: `204` (success), `422` if the localguide did not upload that hike or if the input is not correct, `404` if something is not found, `503 Service Unavailable` (generic error).
  - Response body: *nothing*

- POST `/referencePoints`
  - Description: Link reference points to a hike
  - Request body: An object with the hike id and a list of representing the reference points information

  ```json
  {
    "hikeId":5, 
    "pointsToLink": 
    [
        {
        "title": "POINT 1",
        "latitude": 44.93603, 
        "longitude": 6.73868
        },
        {
        "title": "POINT 2",
        "latitude": 44.96452393010258, 
        "longitude": 6.75131052732467666
        }
        ...
    ]
  }

  ```

  - Response: `201` (success), `422` if the localguide did not upload that hike or if the input is not correct, `404` if something is not found, `503 Service Unavailable` (generic error).
  - Response body: *nothing*

- GET `/api/isHikeInProgress/:hikeId`
  - Description: Retrieve the infos about the starting status of an hike for a logged in hiker. If a hiker has already started an other hike, those infos are given
  - Request body: *nothing*
  - Response: `200 OK` (success), `422` if the :hikeId format is wrong,  `401` if who require the api is not logged in as hiker, `404` if the hike does not exist, `503 Service Unavailable` (generic error).
  - Response body: infos about started hike

  ```json
  {
    "inProgress": 0,
    "startTime": undefined,
    "startedHikeId":undefined
  }

  OR

  {
    "inProgress": 1,
    "startTime": "2022-05-04 22:22:22",
    "startedHikeId":undefined
  }

  OR

  {
    "inProgress": -1,
    "startTime": undefined,
    "startedHikeId":12
  }

  ```

- POST `/api/startHike`
  - Description: Start an hike.
  - Request body: An object containing the hikeId and the startTime

  ```json

  {
     "hikeId":1,
     "startTime": "2022-05-04 22:12:13"
  }

  ```

  - Response: `201` (success), `422` if the input is not acceptable, for example if :hikeId format is wrong or if the startTime has wrong format/impossible time,  `401` if who require the api is not logged in as hiker, `404` if the hike does not exist, `503 Service Unavailable` (generic error).
  - Response body: Confirmation message.

  ```json

  {
      "message": "Hike started"
  }

  ```

- POST `/api/terminateHike`
  - Description: Terminate a started hike.
  - Request body: An object containing the hikeId and the terminateTime

  ```json

  {
     "hikeId":1,
     "terminateTime": "2022-05-04 22:12:13"
  }

  ```

  - Response: `201` (success), `422` if the input is not acceptable, for example if :hikeId format is wrong or if the terminateTime has wrong format/impossible time,  `401` if who require the api is not logged in as hiker, `404` if the hike does not exist, `503 Service Unavailable` (generic error).
  - Response body: Confirmation message.

  ```json

  {
      "message": "Hike terminated"
  }

  ```

- GET `/api/myCompletedHikes`
  - Description: Retrieve the history of completed hike for the logged in hiker
  - Request body: *nothing*
  - Response: `200 OK` (success), `401` if who require the api is not logged in as hiker, `503 Service Unavailable` (generic error).
  - Response body: the history of completed hikes for the logged in hiker

  ```json
    [
      {
          "id": 1,
          "title": "Trail to MONTE FERRA",
          "length": 13,
          "expectedTime": 5,
          "ascent": 1336.71,
          "difficulty": "Professional Hiker",
          "startTime": "2022-05-05 12:12:12",
          "terminateTime": "2022-05-05 22:12:12"
      },
      {
          "id": 5,
          "title": "Trail to MONTE CHABERTON",
          "length": 7.65,
          "expectedTime": 6,
          "ascent": 1233.46,
          "difficulty": "Hiker",
          "startTime": "2022-05-06 12:12:12",
          "terminateTime": "2022-05-06 22:12:12"
      },
      {
          "id": 2,
          "title": "Trail to ROCCA PATANUA",
          "length": 9,
          "expectedTime": 5.5,
          "ascent": 923.62,
          "difficulty": "Professional Hiker",
          "startTime": "2022-06-06 22:12:13",
          "terminateTime": "2022-06-06 22:12:14"
      }
    ]
  ```

- GET `/api/myCompletedHikeTimes/:hikeId`
  - Description: Retrieve the history of the hiking times for a completed hike for the logged in hiker, given the hikeId
  - Request body: *nothing*
  - Response: `200 OK` (success), `422` if the :hikeId format is wrong,  `401` if who require the api is not logged in as hiker, `404` if the hike does not exist, `503 Service Unavailable` (generic error).
  - Response body: history of hiking times (if there is something), otherwise an empty vector ( [ ] )

  ```json
    [
      {
          "startTime": "2022-05-05 12:12:12",
          "terminateTime": "2022-05-05 22:12:12"
      },
      {
          "startTime": "2022-05-06 12:12:12",
          "terminateTime": "2022-05-06 22:12:12"
      },
      {
          "startTime": "2022-06-06 22:12:13",
          "terminateTime": "2022-06-06 22:12:14"
      }
    ]
  ```

## Database Tables

#### *Hike* includes all hikes specifications

 ```SQL
     Hike(id,title,description,length,expectedTime,ascent,difficulty,startPointId,endPointId,authorId,uploadDate,gpxFile,photoFile)
     PRIMARY KEY ( Id )
     FOREIGN KEY (authorId, startPointId, endPointId) REFERENCES User ( id ) , Point ( id ) , Point ( id )

 ```

#### *HikePerformance* includes all the performance of an hiker for hikes he/she hiked

 ```SQL
     HikePerformance(id,startTime, terminateTime, hikeId, userId)
     PRIMARY KEY ( Id )
     FOREIGN KEY (hikeId, userId)

 ```

#### *HikePoint* includes relation between Hike and Point

```SQL
     HikePoint( hikeId,pointId)
     PRIMARY KEY ( hikeId , pointId )
     FOREIGN KEY (hikeId , pointId ) REFERENCES Point ( id ) , Point ( id )

```

#### *Point* includes all Points specifications

```SQL
     Point( id, name, description, type, latitude, longitude, altitude, city, province, region )
     PRIMARY KEY ( id )

```

#### *Hut* includes all Huts specification

```SQL
     Hut( id, roomsNumber, bedsNumber, whenIsOpen, phoneNumber, photoFile, website, pointId )
     PRIMARY KEY ( id )
     FOREIGN KEY ( pointId ) REFERENCES Point ( id )

```

#### *ParkingLot* includes all Parking lots specification

```SQL
     ParkingLot( id, capacity, pointId )
     PRIMARY KEY ( id )
     FOREIGN KEY ( pointId ) REFERENCES Point ( id )

```

#### *User* includes all Users specification

```SQL
     User( id, email, username, role, name, surname, gender, phoneNumber, hash, salt, verifiedEmail, confirmationCode )
     PRIMARY KEY ( id )

```

#### *UserPreferences* includes preferences specified by the user

```SQL
     UserPreferences( id, duration, altitude, ascent, length, difficulty, userId )
     PRIMARY KEY ( id )
     FOREIGN KEY ( userId ) REFERENCES User ( id )

```

## Users Credentials

|           Email           |    Password    | Role              | Email is verified?|
|:-------------------------:|:--------------:|:-----------------:|:-----------------:|
| aldobaglio@gmail.com      |   password     |   localGuide      |        Yes        |
| stefanopioli@acmilan.com  |   password     |   hiker           |        Yes        |
| kayix84170@cnxcoin.com    | HikerTester12@ |   hiker           |        Yes        |
| antonioconte@gmail.com    |   password     |   localGuide      |        No         |
| ggatewood@gmail.com       |   Group12Rocks!|   localGuide      |        Yes        |
| andrewskurka@gmail.com    |   Group12Rocks!|   localGuide      |        Yes        |
| buddybackpacker@gmail.com |   Group12Rocks!|   localGuide      |        Yes        |

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

#### Note: to run these commands you must be in `/client/`

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

#### Note: to run these commands you must be in `/server/`

## Technologies

### Frontend

```json
  "dependencies": {
    "@cypress/code-coverage": "^3.10.0",
    "@cypress/instrument-cra": "^1.4.0",
    "@mapbox/togeojson": "^0.16.0",
    "@testing-library/dom": "^8.19.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.4.3",
    "@tmcw/togeojson": "^5.5.0",
    "autoprefixer": "^10.4.13",
    "axios": "^1.1.3",
    "babel-plugin-istanbul": "^6.1.1",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "bootstrap": "^5.2.2",
    "classnames": "^2.3.2",
    "cypress": "^11.2.0",
    "cypress-dark": "^1.8.3",
    "dayjs": "^1.11.6",
    "formik": "^2.2.9",
    "gpxparser": "^3.0.8",
    "history": "^5.3.0",
    "jest": "^27.5.1",
    "leaflet": "^1.9.2",
    "nyc": "^15.1.0",
    "path": "^0.12.7",
    "postcss-flexbugs-fixes": "^5.0.2",
    "postcss-normalize": "^10.0.1",
    "postcss-preset-env": "^7.8.3",
    "react": "^18.2.0",
    "react-bootstrap": "^2.5.0",
    "react-bootstrap-icons": "^1.10.2",
    "react-datetime-picker": "^4.1.1",
    "react-dom": "^18.2.0",
    "react-icons": "^4.6.0",
    "react-leaflet": "^4.1.0",
    "react-router-dom": "^6.4.3",
    "react-scripts": "5.0.1",
    "react-timer-hook": "^3.0.5",
    "react-toastify": "^9.1.1",
    "styled-components": "^5.3.6",
    "togeojson": "^0.16.0",
    "web-vitals": "^2.1.4",
    "xmldom": "^0.6.0",
    "yup": "^0.32.11",
    "yup-password": "^0.2.2"
  },
   "devDependencies": {
    "@testing-library/cypress": "^8.0.7",
    "@types/leaflet": "^1.9.0",
    "fs": "^0.0.1-security",
    "jest-sonar-reporter": "^2.0.0"
  }
````

### Backend

```json
  "dependencies": {
    "chai-http": "^4.3.0",
    "check-code-coverage": "^1.10.4",
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
    "jest-sonar-reporter": "^2.0.0",
    "jwt-encode": "^1.0.1",
    "mochawesome-report-generator": "^6.2.0",
    "morgan": "^1.10.0",
    "node-fetch": "^2.6.7",
    "nodemailer": "^6.8.0",
    "nodemon": "^2.0.20",
    "nyc": "^15.1.0",
    "parse-gpx": "^2.1.0",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "path": "^0.12.7",
    "sqlite3": "^5.1.2",
    "valid-url-utf8": "^1.0.7"
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

| Surname   | Name        |
| :---------  | :---------- |
| Colelli     | Antonio     |
| Hevia       | Adriana     |
| Miccono     | Edoardo     |
| Sambin      | Gabriele    |
| Tamburo     | Luca        |
| Trovero     | Fabio       |
