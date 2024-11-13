export const sleep = ms => new Promise(r => setTimeout(r, ms));

export const createIncrementArray = (number) => Array.from(new Array(number).keys())