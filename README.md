# lights
Nodejs webserver for interacting with RF switch plugs via a Raspberry Pi

![travis](https://img.shields.io/travis/freemasen/lights.svg)
[![codecov](https://codecov.io/gh/FreeMasen/lights/branch/master/graph/badge.svg)](https://codecov.io/gh/FreeMasen/lights)


### Dependencies
- Codesend
    - This is a C++ executable that was written to allow for interaction with Raspberry Pi GPIO ports
      you can find more informaiton about it [here](https://timleland.com/wireless-power-outlets/)
- Angular 2
    - The UI logic is writtin in Typescript and leverages Angular 2 and Angular Material 2
    - These depenencies rely on many packages including RXJS and Hammer.js
- Nodejs & Express
    - The server side component utilizes Nodejs with Express, Morgan and Body-Parser all from the Express Organization

### UI

#### Dashboard

![Dashboard](http://i.imgur.com/EuV3jwo.png)

The dashboard displays a switch for each button on the remote. Clicking on the settings (gear) button will
take you to the detail view.

#### Detail View


![Detail view](http://i.imgur.com/4gLNvvC.png)

Here you see the detail view, the user can add new timers here or edit the time each timer is triggered.

#### Models

The below items are object models that I am utilizing in the UI

``` javascript
/*
TODO: add details about models
*/
```

### Server

#### API Endpoints

##### GET /switches

Provides the full list of 5 switches that are normally included in the RF Plug Set

##### GET /switch/:id

Provides the single switch indicated in the route parameter

##### POST /flip/:id/:newState

Requests a call to codesend with the switch ID and 0 for off and 1 for on as path parameters

##### POST /switch/:id

Provides the ID of the switch, as a path parameter, that will be replaced by the body content of the request

#### Modules

###### flip.js

This module mades a Nodejs child_process.exec call to codesend with switch code as a terminal parameter

###### lights.js

This module provides the list of lightswitches via the LightManager.
```javascript
/*
TODO: provide more details here
*/
```





