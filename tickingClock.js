// function to obtain the value when needed
const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = (message) => console.log(message);

// serializeClockTime
const serializeClockTime = (date) => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
});

//civilianHours
const civilianHours = (clockTime) => ({
  ...clockTime,
  hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours,
});

// appendAMPM
const appendAMPM = (clockTime) => ({
  ...clockTime,
  ampm: clockTime.hours >= 12 ? "PM" : "AM",
});

//display
const display = (target) => (time) => target(time);

//formatClock
const formatClock = (format) => (time) =>
  format
    .replace("hh", time.hours)
    .replace("mm", time.minutes)
    .replace("ss", time.seconds)
    .replace("tt", time.ampm);

//prependZero
const prependZero = (key) => (clockTime) => ({
  ...clockTime,
  key: clockTime[key] < 10 ? "0" + clockTime[key] : clockTime[key],
});

//composer function
const compose =
  (...fns) =>
  (arg) =>
    fns.reduce((composed, f) => f(composed), arg);

//convertToCivilianTime
const convertToCivilianTime = (clockTime) =>
  compose(appendAMPM, civilianHours)(clockTime);

//doubleDigits
const doubleDigits = (civilianTime) =>
  compose(
    prependZero("hours"),
    prependZero("minutes"),
    prependZero("seconds")
  )(civilianTime);

//startTicking
const startTicking = () =>
  setInterval(
    compose(
      clear,
      getCurrentTime,
      serializeClockTime,
      convertToCivilianTime,
      doubleDigits,
      formatClock("hh:mm:ss tt"),
      display(log)
    ),
    oneSecond()
  );

startTicking();
