import $ from 'jquery';
import Customer from "./Customer";
import './css/base.scss';
import './images/turing-logo.png'

 // Global Variables
 let userLoginID;

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
  if ($('#user-input').val().includes('customer') && $('#user-password').val()
  === 'overlook2019' && (($('#user-input').val().slice(8, 10) * 1) <= 50)) {
    $('.user-section').toggle();
    $('.user-form').hide();
    userLoginID = ($('#user-input').val().slice(8, 10) * 1);
  } else {
    //error
  }
});



// Date Functionality
let today = new Date();
findTodaysDate();

$('.date').text(today);

function findTodaysDate() {
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  today = `${yyyy}/${mm}/${dd}`;
}



// Fetch retrievals
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
