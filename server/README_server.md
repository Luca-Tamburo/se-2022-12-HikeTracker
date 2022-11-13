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
