// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import Customer from "./Customer";
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

const userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(data => data.users)
  .catch(error => console.log('usersData error'));

const roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(roomResponse => roomResponse.json())
  .then(data => data.rooms)
  .catch(error => console.log('roomsData error'));

const bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(userResponse => userResponse.json())
  .then(data => data.bookings)
  .catch(error => console.log('bookingsData error'));

// username: manager
// password: overlook2019

// username: customer50 (where 50 is the ID of the user)
// password: overlook2019


// Event listeners - welcome section
$('.user-btn').on('click', function() {
  $('.user-form').toggle();
  $('.manager-form').hide();
  $('.welcome-section').hide()
});

$('.manager-btn').on('click', function() {
  $('.manager-form').toggle();
  $('.user-form').hide();
  $('.welcome-section').hide()
});

$('.return-home').on('click', function() {
  $('.welcome-section').toggle();
  $('.user-form').hide();
  $('.manager-form').hide()
});

// Event listeners - login forms
$('.manager-submit').on('click', function() {
  if ($('#manager-input').val() === 'manager' && $('#manager-password').val() === 'overlook2019') {
    $('.manager-section').toggle();
    $('.manager-form').hide();
  } else {
    //error
  }
});

//Consider converting to if statement sequences and incorporating event.preventDefault()
//  if the forms start causing problems
$('.user-submit').on('click', function() {
  if ($('#user-input').val() === 'sampleName' && $('#user-password').val() === 'overlook2019') {
    $('.user-section').toggle();
    $('.user-form').hide();
  } else {
    //error
  }
});




//// Notes on class methods
// -total rooms Available Today
// -Total revenue for today’s date
// -Any room bookings for specific USER (past or present/upcoming)
// -total spent by user all time
// -show a list of room details for only available rooms on date X
// -show available rooms by roomtype property
// -be able to select a room for booking (POST REQUEST THE BOOKING)
// -In the event that no rooms are available for the date/roomType selected, display
//       a message fiercely apologizing to the user and asking them to adjust their room search
// (manager)
// -search for user by name
// -view user name, all bookings, and total spent
// -Add a room booking for that user
// -Delete any upcoming room bookings for that user (they cannot delete a booking from the past) (DELETE REQUEST)
