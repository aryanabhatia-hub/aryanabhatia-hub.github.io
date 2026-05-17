/*
Program name: homework2.js
Author: Aryan Bhatia
Date created: 03/27/2026
Date last edited: 03/27/2026
Version: 2.0
Description: JavaScript for Homework 2 patient registration form.
*/

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

  document.getElementById("sliderValue").innerHTML =
    slider.value;
}

function forceLowercase() {

  var userId = document.getElementById("userId");

  userId.value = userId.value.toLowerCase();
}

function validatePasswords() {

  var password1 =
    document.getElementById("password1").value;

  var password2 =
    document.getElementById("password2").value;

  var message =
    document.getElementById("passwordMessage");

  var pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>.?]).{8,30}$/;

  if (!pattern.test(password1)) {

    message.innerHTML =
      "Password does not meet requirements.";

    message.style.color = "red";

    return false;
  }

  if (password1 !== password2) {

    message.innerHTML =
      "Passwords do not match.";

    message.style.color = "red";

    return false;
  }

  message.innerHTML = "Passwords match.";

  message.style.color = "green";

  return true;
}

function reviewForm() {

  validatePasswords();

  var output = "";

  output += "<b>Name:</b> " +
    document.getElementById("firstName").value + " " +
    document.getElementById("middleInitial").value + " " +
    document.getElementById("lastName").value + "<br><br>";

  output += "<b>DOB:</b> " +
    document.getElementById("dob").value + "<br><br>";

  output += "<b>Email:</b> " +
    document.getElementById("email").value + "<br><br>";

  output += "<b>Phone:</b> " +
    document.getElementById("phone").value + "<br><br>";

  output += "<b>Address:</b> " +
    document.getElementById("address1").value + " " +
    document.getElementById("address2").value + ", " +
    document.getElementById("city").value + ", " +
    document.getElementById("state").value + " " +
    document.getElementById("zip").value + "<br><br>";

  output += "<b>User ID:</b> " +
    document.getElementById("userId").value + "<br><br>";

  output += "<b>Pain Level:</b> " +
    document.getElementById("painLevel").value + "<br><br>";

  output += "<b>Symptoms:</b> " +
    document.getElementById("symptoms").value + "<br><br>";

  document.getElementById("reviewOutput").innerHTML =
    output;
}

function clearReview() {

  document.getElementById("reviewOutput").innerHTML =
    "Click the Review button to display your information here.";
}

function validateForm() {

  return validatePasswords();
}
