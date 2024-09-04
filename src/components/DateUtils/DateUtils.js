// src/DateUtils/DateUtils.js

export const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
};
  
export const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
};
  