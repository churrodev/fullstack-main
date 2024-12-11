# Knowledge Full Stack Test
Welcome to the Wallbox Knowledge Test for Full Stack Developers!

## The Application
You will find a table listing chargers and a dialog to view the details of each charger.

Charger list
![current charger list](/design/current_charger_list.png)

Charger detail
![charger detail](/design/charger-detail.png)

## Backend
While developing backend endpoint, take a look on the existing architecture, simplicity in the solution will be 
appreciated.

### 1. Fetch chargers from backend via api
Chargers are currently retrieved from the very same frontend app, you must
replace this to use an api endpoint.

- Develop the GET /api/v1/chargers endpoint to retrieve chargers.
- Data can be gathered from the very same 'charger.ts' file existing on the backend app, no need to add databases or so.
- Test the behaviour with at least one unit test.

### 2. Fix the server
The express server is exiting just after it's started, it should remain open until exit is requested.

## Frontend
Your task is to add some features and improve the application in terms of UI/UX.

### 1. Implement a filter for chargers by serial number
you will create a new input component for this, no need to filter in the backend,
assume that the whole list is passed.

![charger list + filter](/design/charger_list_filter.png)

### 2. Add unit tests to verify that the new filter works correctly.

### 3. Make the Charger Detail and charger list responsive, for example:

![charger detail responsive](/design/charger_detail_mobile.png)

### Notes
Feel free to make any improvements you consider necessary!.

## Working Locally

### Install
To install the project simply run on the root of the project
```sh
npm i
```

### Start dev servers

```sh
# create .env file
cp apps/backend/.env.dist apps/backend/.env
 
# to start backend just run
npm run serve:backend

# to start vue app just run
npm run serve:backoffice
```

### To run tests
```sh
# run test in both apps
npm run test
```

You can use `-w <project_name>` to run npm scripts on any specific project.
