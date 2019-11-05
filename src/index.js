import $ from 'jquery';
import BookingCalculations from "./BookingCalculations";
import Manager from "./Manager";
import Customer from "./Customer";
import './css/base.scss';
import './images/turing-logo.png'
import './images/paradise-hotel.jpg'

 // Global Variables
 let userLoginID;
 let bookingsData;
 let roomsData;
 let usersData;
 let bookingCalculations;
 let customer;
 let manager;


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
    showErrorStylingForEmployee()
  }
});

$('.user-submit').on('click', function() {
  if ($('#user-input').val().includes('customer') && $('#user-password').val() ===
  'overlook2019' && (($('#user-input').val().slice(8, 10) * 1) <= 50)) {
    $('.user-section').toggle();
    $('.user-form').hide();
    userLoginID = ($('#user-input').val().slice(8, 10) * 1);
    loadCustomerDashboardCalculations();

  } else {
    showErrorStylingForGuest()
  }
});

// Error Functionality
function showErrorStylingForGuest() {
  $('#user-input').addClass('error');
  $('#user-password').addClass('error');
  $('#user-input').val('');
  $('#user-password').val('')
}

function showErrorStylingForEmployee() {
  $('#manager-input').addClass('error');
  $('#manager-password').addClass('error');
  $('#manager-input').val('');
  $('#manager-password').val('')
}

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

function produceCustomerBookingsForDOM(userLoginID) {
  let arrayOfBookingData = customer.findBookings(userLoginID);
  let list = `<ul class="customer-bookings">`
  arrayOfBookingData.forEach(item => {
    list += `<li class="customer-booking">
             <p class="customer__booking--date">Date: ${item.date}:</p>
             <p class="customer__booking--id">Reservation ID: ${item.id}</p>`
  });

  return list
}

function loadCustomerDashboardCalculations() {
  $('.expenses-incurred').text((customer.findRevenue(userLoginID)));
  $('.bookings-log').html(produceCustomerBookingsForDOM(userLoginID));
}

function loadManagerDashboardCalculations() {
  $('.rooms-available').text(manager.findTotalAvailableRoomsByDate(today));
  $('.todays-revenue').text(manager.findRevenue(today));
  $('.percent-occupancy').text(manager.findPercentageOfRoomsOccupiedByDate(today));
}

function gitLog() {
  console.log(bookingsData);
  console.log(bookingCalculations)
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

Promise.all([bookingData, roomData, userData])
  .then(data => {
    bookingsData = data[0];
    roomsData = data[1];
    usersData = data[2];
  })
  .then(() => {
    bookingCalculations = new BookingCalculations(bookingsData, roomsData);
    customer = new Customer(bookingsData, roomsData);
    manager = new Manager(bookingsData, roomsData, usersData);
    gitLog();
    loadManagerDashboardCalculations();
  })
  .catch(error => {console.log('Something is amiss with promise all', error)});
