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
 let searchDate;

// Event listener - room search
 $('.select-date').on('click', function() {
   searchDate = $('#user-date').val();
   $('.customer-list').hide();
   $('.customer__rooms--section').toggle();
   $('.available-bookings').html(loadAvailableBookingsByDate(searchDate));
 });

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

$('.return-user').on('click', function() {
  $('.user-section').hide();
  $('.welcome-section').toggle()
  emptyUserFields()
});

$('.return-manager').on('click', function() {
  $('.manager-section').hide();
  $('.welcome-section').toggle()
  emptyManagerFields()
});

// Event listeners - login forms
$('.manager-submit').on('click', function() {
  if ($('#manager-input').val() === 'manager' && $('#manager-password').val() === 'overlook2019') {
    $('.manager-section').toggle();
    $('.manager-form').hide();
    $('#manager-input').removeClass('error');
    $('#manager-password').removeClass('error');

  } else {
    showErrorStylingForEmployee()
  }
});

$('.user-submit').on('click', function() {
  if ($('#user-input').val().includes('customer') && $('#user-password').val() ===
  'overlook2019' && (($('#user-input').val().slice(8, 10) * 1) <= 50)) {
    $('.user-section').toggle();
    $('.user-form').hide();
    $('#user-input').removeClass('error');
    $('#user-password').removeClass('error');
    userLoginID = ($('#user-input').val().slice(8, 10) * 1);
    loadCustomerDashboardCalculations();

  } else {
    showErrorStylingForGuest()
  }
});

// Error Functionality
function emptyUserFields() {
  $('#user-input').val('');
  $('#user-password').val('')
}

function showErrorStylingForGuest() {
  $('#user-input').addClass('error');
  $('#user-password').addClass('error');
  emptyUserFields()
}

function emptyManagerFields() {
  $('#manager-input').val('');
  $('#manager-password').val('')
}

function showErrorStylingForEmployee() {
  $('#manager-input').addClass('error');
  $('#manager-password').addClass('error');
  emptyManagerFields()
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

function produceBookingsForCustomer(id) {
  let arrayOfBookingData = customer.findBookings(id);
  arrayOfBookingData.sort((a, b) => {
    if (a.date < b.date) {
      return -1
    }

    if (a.date > b.date) {
      return 1
    }
  })

  return arrayOfBookingData
}

function loadAllCustomerBookingsToDOM(id) {
  let list = `<ul class="customer-bookings">`
  produceBookingsForCustomer(id).forEach(item => {
    list += `<li class="customer-booking">
             <p class="customer__booking--date">Date: ${item.date}:</p>
             <p class="customer__booking--id">Reservation ID: ${item.id}</p>`
  });

  return list
}

function produceAvailableBookingsForCustomerByDate(date) {
  let arrayOfBookingData = customer.findRoomsAvailableByDate(date);
  arrayOfBookingData.sort((a, b) => {
    return a.roomNumber - b.roomNumber
  })

  return arrayOfBookingData
}


function loadAvailableBookingsByDate(date) {
  let list;
  produceAvailableBookingsForCustomerByDate(date).forEach(item => {
    list += `<div class="customer__rooms--available">
               <p class="new__customer--property"><span class="property-styling">Room Number:</span> ${item.number}</p>
               <p class="new__customer--property">Room Type: ${item.roomType}</p>
               <p class="new__customer--property">Bidet:  ${item.bidet}</p>
               <p class="new__customer--property">Bed Size: ${item.bedSize}</p>
               <p class="new__customer--property">Beds:  ${item.numBeds}</p>
               <p class="new__customer--property">Nightly Cost: ${item.costPerNight}</p>
               <button class="book-button" type="button" name="button">Book Room</button>
            </div>`
  });

  return list
}

function loadCustomerDashboardCalculations() {
  $('.user-name').text((customer.findUserName(userLoginID)));
  $('.expenses-incurred').text((customer.findRevenue(userLoginID)));
  $('.bookings-log').html(loadAllCustomerBookingsToDOM(userLoginID));
}

function loadManagerDashboardCalculations() {
  $('.rooms-available').text(manager.findTotalAvailableRoomsByDate(today));
  $('.todays-revenue').text(manager.findRevenue(today));
  $('.percent-occupancy').text(manager.findPercentageOfRoomsOccupiedByDate(today));
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
    customer = new Customer(bookingsData, roomsData, usersData);
    manager = new Manager(bookingsData, roomsData, usersData);
    loadManagerDashboardCalculations();
  })
  .catch(error => {console.log('Something is amiss with promise all', error)});
