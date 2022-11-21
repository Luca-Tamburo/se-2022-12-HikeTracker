# HikeTracker server functions

Write here all the function offered by the server components, with inputs, outputs and a general description

## Functions divided by component

### mockDB.js

|   Function name     |     Input   |   Output  |   Description |
| ----------------- | :-----------: | ---------: | --------: |
|   createTables    |   NULL    |   NULL for success, optional errors   |   Creates list of empty tables    |
|   deleteAllTables |   NULL    |   'ok' for success, optional errors   |   Destroys all table in database  |
|   createDatabase  |   NULL    |   'ok' for success, optional errors   |   Wrapper for "createTables", only exist to give the opportunity to insert values in the tables preemptively  |
|   deleteDatabase  |   NULL    |   'ok' for success, optional errors   |   Wrapper for "deleteAllTables"   |


### hikeDao.js

|   Function name     |     Input   |   Output  |   Description |
| ----------------- | :-----------: | ---------: | --------: |
|   getHikes    |   NULL    |   List of hikes, with author name and start point coordinates|  Gets all hikes from DB |
|   addHike |   title, description, length, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate,  photoFile  |   ID of last modified item    |   Inserts one hike in DB  |
|   getGpxByHikeId  |   id (of the hike)    |   gpx file path if present, undefined otherwise, optional errors  |   Gets gpx file path from DB given the id of the hike |
|   getDetailsByHikeId  |   id (of the hike)    |   All information about one hike, with author name    |   Gets hike info from DB given its id    |
|   getPointsByHikeId   |   id (of the hike)    |   List of points  |   Gets all points relevant for one specified hike given its id    |