/*
Program name: homework4.js
Author: Aryan Bhatia
Date created: 05/08/2026
Date last edited: 05/08/2026
Version: 4.0
Description: Homework 4 JavaScript with Fetch API, iframe, cookies, local storage, and validation.
*/

function startHomework4() {
  setToday();
  setDateLimits();
  updateSlider();
  hideSubmitButton();
  loadStates();
  loadSavedData();
  checkCookie();
}

function setToday() {
  var today = new Date();

  var month = today.getMonth() + 1;
  var day = today.getDate();
  var year = today.getFullYear();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  document.getElementById("dateText").innerHTML =
    "Today is: " + month + "/" + day + "/" + year;
}

function setDateLimits() {
  var today = new Date();

  var maxDate = today.toISOString().split("T")[0];

  document.getElementById("dob").max = maxDate;
}

function updateSlider() {
  var slider = document.getElementById("painLevel");

  if (slider) {
    document.getElementById("sliderValue").innerHTML = slider.value;
  }
}

function loadStates() {

  fetch("states.html")

    .then(function(response) {
      return response.text();
    })

    .then(function(data) {

      document.getElementById("state").innerHTML = data;

      var savedState = localStorage.getItem("state");

      if (savedState) {
        document.getElementById("state").value = savedState;
      }

    })

    .catch(function(error) {
      console.log(error);
    });

}

function hideSubmitButton() {
  document.getElementById("submitBtn").style.display = "none";
}

function showSubmitButton() {
  document.getElementById("submitBtn").style.display = "inline-block";
}

function setError(id, message) {
  document.getElementById(id).innerHTML = message;
}

function clearError(id) {
  document.getElementById(id).innerHTML = "";
}

function validateFirstName() {

  var value = document.getElementById("firstName").value.trim();

  if (value === "") {
    setError("firstNameError", "Required");
    return false;
  }

  clearError("firstNameError");
  return true;
}

function validateMiddleInitial() {
  clearError("middleInitialError");
  return true;
}

function validateLastName() {

  var value = document.getElementById("lastName").value.trim();

  if (value === "") {
    setError("lastNameError", "Required");
    return false;
  }

  clearError("lastNameError");
  return true;
}

function validateDOB() {

  var value = document.getElementById("dob").value;

  if (value === "") {
    setError("dobError", "Required");
    return false;
  }

  clearError("dobError");
  return true;
}

function validateIdNumber() {

  var value = document.getElementById("idNumber").value;

  if (!/^\d{9}$/.test(value)) {
    setError("idNumberError", "Must be 9 digits");
    return false;
  }

  clearError("idNumberError");
  return true;
}

function validateEmail() {

  var value = document.getElementById("email").value;

  if (value === "") {
    setError("emailError", "Required");
    return false;
  }

  clearError("emailError");
  return true;
}

function validatePhone() {

  var value = document.getElementById("phone").value;

  if (value.length < 12) {
    setError("phoneError", "Invalid phone");
    return false;
  }

  clearError("phoneError");
  return true;
}

function validateAddress1() {

  var value = document.getElementById("address1").value;

  if (value === "") {
    setError("address1Error", "Required");
    return false;
  }

  clearError("address1Error");
  return true;
}

function validateAddress2() {
  clearError("address2Error");
  return true;
}

function validateCity() {

  var value = document.getElementById("city").value;

  if (value === "") {
    setError("cityError", "Required");
    return false;
  }

  clearError("cityError");
  return true;
}

function validateState() {

  var value = document.getElementById("state").value;

  if (value === "") {
    setError("stateError", "Select state");
    return false;
  }

  clearError("stateError");
  return true;
}

function validateZip() {

  var value = document.getElementById("zip").value;

  if (!/^\d{5}$/.test(value)) {
    setError("zipError", "Must be 5 digits");
    return false;
  }

  clearError("zipError");
  return true;
}

function validateAll() {

  var valid = true;

  if (!validateFirstName()) valid = false;
  if (!validateMiddleInitial()) valid = false;
  if (!validateLastName()) valid = false;
  if (!validateDOB()) valid = false;
  if (!validateIdNumber()) valid = false;
  if (!validateEmail()) valid = false;
  if (!validatePhone()) valid = false;
  if (!validateAddress1()) valid = false;
  if (!validateAddress2()) valid = false;
  if (!validateCity()) valid = false;
  if (!validateState()) valid = false;
  if (!validateZip()) valid = false;

  if (valid) {

    document.getElementById("validateMessage").innerHTML =
      "All fields look good.";

    showSubmitButton();

  } else {

    document.getElementById("validateMessage").innerHTML =
      "Please correct errors.";

    hideSubmitButton();
  }

  return valid;
}

function reviewForm() {

  var output = "";

  output += "First Name: " +
    document.getElementById("firstName").value + "<br>";

  output += "Last Name: " +
    document.getElementById("lastName").value + "<br>";

  output += "Email: " +
    document.getElementById("email").value + "<br>";

  output += "Phone: " +
    document.getElementById("phone").value + "<br>";

  document.getElementById("reviewOutput").innerHTML = output;
}

function formatPhone() {

  var phone = document.getElementById("phone");

  var digits = phone.value.replace(/\D/g, "");

  if (digits.length > 10) {
    digits = digits.substring(0, 10);
  }

  if (digits.length <= 3) {

    phone.value = digits;

  } else if (digits.length <= 6) {

    phone.value =
      digits.substring(0, 3) + "-" +
      digits.substring(3);

  } else {

    phone.value =
      digits.substring(0, 3) + "-" +
      digits.substring(3, 6) + "-" +
      digits.substring(6);

  }
}

function forceEmailLowercase() {

  var email = document.getElementById("email");

  email.value = email.value.toLowerCase();
}

function saveField(id) {

  if (document.getElementById("rememberMe").checked) {

    localStorage.setItem(
      id,
      document.getElementById(id).value
    );

  }
}

function loadSavedData() {

  var fields = [
    "firstName",
    "middleInitial",
    "lastName",
    "dob",
    "email",
    "phone",
    "address1",
    "address2",
    "city",
    "zip"
  ];

  for (var i = 0; i < fields.length; i++) {

    var savedValue =
      localStorage.getItem(fields[i]);

    if (savedValue) {

      document.getElementById(fields[i]).value =
        savedValue;

    }
  }
}

function setCookie(name, value, days) {

  var date = new Date();

  date.setTime(
    date.getTime() +
    (days * 24 * 60 * 60 * 1000)
  );

  var expires =
    "expires=" + date.toUTCString();

  document.cookie =
    name + "=" + value + ";" +
    expires + ";path=/";
}

function getCookie(name) {

  var cookieName = name + "=";

  var decodedCookie =
    decodeURIComponent(document.cookie);

  var cookieArray =
    decodedCookie.split(";");

  for (var i = 0; i < cookieArray.length; i++) {

    var c = cookieArray[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(cookieName) == 0) {

      return c.substring(
        cookieName.length,
        c.length
      );
    }
  }

  return "";
}

function saveCookieIfAllowed() {

  if (
    document.getElementById("rememberMe").checked
  ) {

    var firstName =
      document.getElementById("firstName").value;

    setCookie("firstName", firstName, 2);
  }
}

function checkCookie() {

  var user = getCookie("firstName");

  if (user != "") {

    document.getElementById("welcomeMessage").innerHTML =
      "Welcome back, " + user + "!";

    document.getElementById("newUserArea").style.display =
      "block";

  } else {

    document.getElementById("welcomeMessage").innerHTML =
      "Welcome New User";
  }
}

function startNewUser() {

  document.cookie =
    "firstName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  localStorage.clear();

  location.reload();
}

function handleRememberChoice() {

  if (
    !document.getElementById("rememberMe").checked
  ) {

    localStorage.clear();
  }
}

function clearReview() {

  document.getElementById("reviewOutput").innerHTML =
    "Click the Review button to display your information here.";

  document.getElementById("validateMessage").innerHTML = "";

  hideSubmitButton();
}

function finalSubmitCheck() {

  if (validateAll()) {
    return true;
  }

  return false;
}
