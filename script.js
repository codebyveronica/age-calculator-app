const day = document.querySelector('#day');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const calculator = document.querySelector('#calculator')

const yearsTxt = document.querySelector('#yearsTxt');
const monthsTxt = document.querySelector('#monthsTxt');
const daysTxt = document.querySelector('#daysTxt');

const currentYear = new Date().getFullYear();

let isValidYear = false;
let isValidMonth = false;
let isValidDay = false;

// Functions
const displayErrorFeedback = (feedbackElement, element, label, message) => {
  feedbackElement.innerHTML = message;
  element.classList.add('error');
  label.classList.add('error');
}

const removeErrorFeedback = (feedbackElement, element, label) => {
  feedbackElement.innerHTML = '';
  element.classList.remove('error');
  label.classList.remove('error');
}

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

const checkDate = (day, month, year) => {
  const dayFeedbackElement = document.querySelector('#dayFeedbackElement');
  const monthFeedbackElement = document.querySelector('#monthFeedbackElement');
  const yearFeedbackElement = document.querySelector('#yearFeedbackElement');
  const dayLabel = document.querySelector('#dayLabel')
  const monthLabel = document.querySelector('#monthLabel');
  const yearLabel = document.querySelector('#yearLabel')

  if(day.value === '') {
    displayErrorFeedback(dayFeedbackElement, day, dayLabel, 'This field is required');
    isValidDay = false;
  }else if(day.value > 31 || day.value == 0) {
    displayErrorFeedback(dayFeedbackElement, day, dayLabel, 'Must be a valid day');
    isValidDay = false;
  }else if(day.value > daysInMonth(year.value, month.value)) {
    displayErrorFeedback(dayFeedbackElement, day, dayLabel, 'Must be a valid date');
    isValidDay = false;
  }else {
    removeErrorFeedback(dayFeedbackElement, day, dayLabel);
    isValidDay = true;
  }

  if(month.value === '') {
    displayErrorFeedback(monthFeedbackElement, month, monthLabel, 'This field is required');
    isValidMonth = false;
  }else if(month.value > 12 || month.value <= 0) {
    displayErrorFeedback(monthFeedbackElement, month, monthLabel, 'Must be a valid month');
    isValidMonth = false;
  }else {
    removeErrorFeedback(monthFeedbackElement, month, monthLabel)
    isValidMonth = true;
  }

  if(year.value === '') {
    displayErrorFeedback(yearFeedbackElement, year, yearLabel, 'This field is required');
    isValidYear = false;
  }else if(year.value > currentYear || year.value <= 0) {
    displayErrorFeedback(yearFeedbackElement, year, yearLabel, 'Must be in the past');
    isValidYear = false;
  }else {
    removeErrorFeedback(yearFeedbackElement, year, yearLabel);
    isValidYear = true;
  }
}

const calculateAge = (day, month, year) => {
  const birthDate = new Date(year.value, month.value - 1, day.value);
  const today = new Date();

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += daysInMonth(today.getFullYear(), today.getMonth());
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  yearsTxt.innerHTML = ageYears;
  monthsTxt.innerHTML = ageMonths;
  daysTxt.innerHTML = ageDays;
}

// Event Listeners
calculator.addEventListener('click', (e) => {
  checkDate(day, month, year);

  if(isValidDay == true && isValidMonth == true && isValidYear == true){
    calculateAge(day, month, year);
  } else {
    yearsTxt.innerHTML = '--';
    monthsTxt.innerHTML = '--';
    daysTxt.innerHTML = '--';
  }
})