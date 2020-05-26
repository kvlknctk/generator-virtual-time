const moment = require('moment');
const _ = require('lodash');

const dayGenerator = (endDate, startDate) => {
  const slots = [];
  const startGo = moment(startDate);
  const endGo = moment(endDate);
  for (startGo; startGo.isSameOrBefore(endGo); startGo.add(1, 'days')) {
    slots.push(startGo.toString());
  }

  return slots;
};
const slotTransform = ({ config, day }) => {

  const event = getTimeSlots([config.startBlocked, config.middleBlocked, config.endBlocked], true, 'hour', false, false);
  //const event = ts.getTimeSlots([[0,599] ,[1200,1440]], true, "hour", false, false)
  const slots = [];
  for (let [numericType, hourlyType] of Object.entries(event)) {
    //slots.push([numericType, hourlyType])
    //2020-05-24T15:59:12.353Z
    let pureDate = moment(day).format('YYYY-MM-DD');

    slots.push({
      //day  : day,
      start: moment(pureDate + ' ' + hourlyType).format(moment.DATETIME_LOCAL_MS),
      end  : moment(pureDate + ' ' + hourlyType).add(45, 'minute').format(moment.DATETIME_LOCAL_MS),
      title: config.title,
      numericType,
      hourlyType
    });
  }
  return slots;
};

function getTime(num) {
  let tempHour = String(Math.trunc(num / 60));
  let hour = tempHour + "".length === 1 ? "0" + tempHour : tempHour;
  let min = num % 60 === 0 ? "00" : num % 60;
  return { num: num, time: hour + ":" + min };
}
function getTimeSlots(blockTimes, showTimeAsString, interval, includeStartBlockedTime,includeEndBlockedTime) {
  let times = 1,
    sums = 60;
  includeStartBlockedTime = includeStartBlockedTime === true ? true : false;
  includeEndBlockedTime = includeEndBlockedTime === true ? true : false;
  switch (interval) {
    case "tenth":
      times = 6;
      sums = 10;
      break;
    case "quarter":
      times = 4;
      sums = 15;
      break;
    case "half":
      times = 2;
      sums = 30;
      break;
    case "one":
      times = 1;
      sums = 60;
      break;
    case "two":
      times = 1 / 2;
      sums = 120;
      break;
    case "three":
      times = 1 / 3;
      sums = 180;
      break;
    case "four":
      times = 1 / 4;
      sums = 240;
      break;
    default:
      times = 1;
      sums = 60;
      break;
  }
  let start = 0;
  let dateTimes = Array(Math.round(24 * times))
    .fill(0)
    .map(function(_) {
      start = start + sums;
      return start;
    });
  blockTimes = Array.isArray(blockTimes) === true && blockTimes.length > 0 ? blockTimes : [];
  if (blockTimes.length > 0) {
    dateTimes = blockTimes.reduce(function(acc, x) {
      return acc
        .filter(function(y) {
          return includeStartBlockedTime == true ? y <= x[0] : y < x[0];
        })
        .concat(
          acc.filter(function(y) {
            return includeEndBlockedTime == true ? y >= x[1] : y > x[1];
          })
        );
    }, dateTimes);
  }
  if (showTimeAsString === true) {
    return dateTimes
      .map(function(x) {
        return getTime(x);
      })
      .reduce(function(accc, element) {
        accc["" + element.num] = element.time;
        return accc;
      }, {});
  }
  return dateTimes;
}

const timeGenarator = (config) => {
  const generatedDays = dayGenerator(config.endDate, config.startDate);
  let array = generatedDays.map((day) => slotTransform({ config, day }));
  return _.flatten(array);
};


module.exports = timeGenarator;

