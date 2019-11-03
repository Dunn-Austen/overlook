// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

const userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(data => data.users);

const roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(roomResponse => roomResponse.json())
  .then(data => data.rooms);

const bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(userResponse => userResponse.json())
  .then(data => data.bookings);

// username: manager
// password: overlook2019

// username: customer50 (where 50 is the ID of the user)
// password: overlook2019


// Event listeners - welcome section
$('.user-btn').on('click', function() {
  $('.user-form').toggle();
  $('.manager-form').hide();
});

$('.manager-btn').on('click', function() {
  $('.manager-form').toggle();
  $('.user-form').hide();
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

$('.user-submit').on('click', function() {
  if ($('#user-input').val() === 'sampleName' && $('#user-password').val() === 'overlook2019') {
    $('.user-section').toggle();
    $('.user-form').hide();
  } else {
    //error
  }
});
