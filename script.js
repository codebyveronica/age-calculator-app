const day = document.querySelector('#day');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const calculator = document.querySelector('#calculator')

const currentYear = new Date().getFullYear();

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
  }else if(day.value > 31 || day.value == 0) {
    displayErrorFeedback(dayFeedbackElement, day, dayLabel, 'Must be a valid day');
  }else if(day.value > daysInMonth(year.value, month.value)) {
    displayErrorFeedback(dayFeedbackElement, day, dayLabel, 'Must be a valid date');
  }else {
    removeErrorFeedback(dayFeedbackElement, day, dayLabel);
  }

  if(month.value === '') {
    displayErrorFeedback(monthFeedbackElement, month, monthLabel, 'This field is required');
  }else if(month.value > 12 || month.value <= 0) {
    displayErrorFeedback(monthFeedbackElement, month, monthLabel, 'Must be a valid month');
  }else {
    removeErrorFeedback(monthFeedbackElement, month, monthLabel)
  }

  if(year.value === '') {
    displayErrorFeedback(yearFeedbackElement, year, yearLabel, 'This field is required');
  }else if(year.value > currentYear || year.value <= 0) {
    displayErrorFeedback(yearFeedbackElement, year, yearLabel, 'Must be in the past');
  }else {
    removeErrorFeedback(yearFeedbackElement, year, yearLabel);
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

  const yearsTxt = document.querySelector('#yearsTxt');
  const monthsTxt = document.querySelector('#monthsTxt');
  const daysTxt = document.querySelector('#daysTxt');

  yearsTxt.innerHTML = ageYears;
  monthsTxt.innerHTML = ageMonths;
  daysTxt.innerHTML = ageDays;
}

// Event Listeners
calculator.addEventListener('click', (e) => {
  checkDate(day, month, year);
  calculateAge(day, month, year);
})