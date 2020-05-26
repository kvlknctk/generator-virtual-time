# Time Slot Generator

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

It is necessary to produce the hours of the day according to certain conditions and using this will save you time. You can block morning, noon, evening times. you can choose the start and end date. You can define the title for each produced slot.

# Features!

  - Custom time slot of day
  - Date time with moment lib
  - Blocked times
  - Custom start and end time. 



### Install NPM
```javascript
npm install generator-virtual-time --save
```

### Install YARN
```javascript
yarn add generator-virtual-time
```


### Simple Usign
```javascript
{
   const moment = require('moment');
   ...
  let config = {
    startDate    : '2020-05-20',
    endDate      : '2022-05-31',
    title        : 'Seans',
    startBlocked : [0, 599],
    middleBlocked: [661, 720],
    endBlocked   : [1200, 1440],
  };
  const days = timeGenarator(config);
}
```


### Json Export Example
```json
{
    start: "2020-05-20T10:00:00+03:00" // moment.DATETIME_LOCAL_MS
    end: "2020-05-20T10:45:00+03:00" // moment.DATETIME_LOCAL_MS
    hourlyType: "10:00"
    numericType: "600" // this is minutes of day
    title: "Seans" // custom title
},
...
{
    start: "2020-05-20T11:00:00+03:00" // moment.DATETIME_LOCAL_MS
    end: "2020-05-20T11:45:00+03:00" // moment.DATETIME_LOCAL_MS
    hourlyType: "11:00"
    numericType: "660" // this is minutes of day
    title: "Seans" // custom title
}
```

