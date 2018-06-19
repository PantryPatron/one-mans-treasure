# One Man's Treasure
One Man's Treasure is a platform for unwanted items where a user can display an item they don't want to dispose of but would like nothing in return for it. Depending on another users claims and criteria, they may receive the item.

## Notes before getting started
#### Redux
  Several components are using redux as state container.  
  States that are mapped to props using redux are:
  * Listings, 
  * Claimed Listings,
  * Users who claimed the listing

#### Redux-Promise
  Redux-Promise is an amazing and super light weight redux middleware that turns your spaghetti ajax call into 1 line of code.  
  * Documentation:
  https://github.com/redux-utilities/redux-promise
  https://www.npmjs.com/package/redux-promise
  If someone tells you Redux-thunk is better, they're wrong!.

#### API Keys
This project utilizes Google API for location search as well as map display, 
and Imgur API for image hosting.  You will need API keys from
https://developers.google.com/maps/documentation/embed/get-api-key
and https://apidocs.imgur.com/ in order for them to work.

> Place the Google Maps API key in the client/dist/index.html file.
> Replace both of the ImgurConfig.IMGUR_API_ID variables in the client/src/services/listingServices.js



#### Bugs:
  1. Currently you can't givaway your item to the first user who claimed it.
  2. Longer comments do not word-wrap.
  3. Listings do not automatically populate the profile. (Must log out and log back in).
  
  
#### Semantic-UI
Both Semantic-UI and Semantic-UI-React are use.  
Semantic-UI-React will be installed with ``npm install``.

## Getting Started
To install all dependencies
```
npm install
```

To run transpiler
```
npm run react-dev
```

To run local server
```
npm run start
```

## Built With
* Reactjs `Main framework`
* Semantic-UI `CSS framework`
* Redux `State Container`
* Nodejs `Run-time environment` 
* MongoDB `Database`
* Webpack `Build tool`
* Babel `ECMA6 compiling`

## Running the tests
Currently there is no test for this application.

## Authors
John Webb/
Mealear Khiev/ 
Erwin Carrasquilla/ 
Heshie London
