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


## Database Tables

#### _Hike_ includes all hikes specifications
```
Hike(id,title,description,length,expectedTime,ascent,difficulty,startPointId,endPointId,authorId,uploadDate,gpxFile)
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
Point( id, name, description*, type, longitude, latitude, altitude, city, province,region )
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
User( id, email, username, role, name*, surname*, phoneNumber*, hash, salt, verifiedEmail )
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
     |--- /dao
          |--- /userDao.js
     |--- /routes
          |--- /sessionRoute.js
          |--- /signUpRoute.js
     |--- /utils
          |--- /sessionUtil.js
          |--- /validationUtil.js
     |--- /gitignore
     |--- /index.js
     |--- /hikeTracker.sqlite3     
     |--- /package-lock.json
     |--- /package.json
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
