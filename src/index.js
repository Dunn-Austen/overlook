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
 let bookingDatum = {};
 let deleteDatum = {};


// Event listener - Post New Booking (Customer)
$('.available-bookings').on('click', function() {
  let target = $(event.target);
  let slicedRoomNum;
  if (target.is('button')) {
    let btnClass = target.attr("class");
    slicedRoomNum = parseInt(btnClass.slice(11, 13));
    bookingDatum.userID = userLoginID;
    let formattedDate = searchDate.replace('-', '/').replace('-', '/');
    bookingDatum.date = formattedDate;
    bookingDatum.roomNumber = slicedRoomNum;
    postBooking(bookingDatum)
  }
});

// Event listener - Customer room search
 $('.select-date').on('click', function() {
  searchDate = $('#user-date').val();
   if ($('#room-finder :selected').val() === "") {
     $('.customer-list').hide();
     $('.customer__rooms--section').show();
     $('.available-bookings').html(loadAvailableBookingsByDate(searchDate));

   } else {
     $('.customer-list').hide();
     $('.customer__rooms--section').show();
     $('.available-bookings').html(loadAvailableBookingsByOptionAndDate(searchDate, $('#room-finder :selected').val()));
   }
 });

 // Event listener - Manager Guest Search
 $('.available_bookings-manager').on('click', function() {
   let target = $(event.target);
   let slicedGuestName;
   let btnClass = target.attr("class");
   if (target.is('button') && btnClass.includes('select-guest')) {
     slicedGuestName = btnClass.slice(12, 40);
     userLoginID = manager.findUserID(slicedGuestName)
     $('.manager_reservation-container').show();
     $('.expenses_incurred-manager').text((customer.findRevenue(userLoginID)));
     $('.user_name-manager').text(slicedGuestName);
     $('.available_bookings-manager').html(loadAllCustomerBookingsToDOMForManager(userLoginID));
     $('.room_availability-manager').text('All Guest Bookings')
   }
 });

 // Event listener - Manager room search
 $('.select_date-manager').on('click', function() {
  searchDate = $('#user_date-manager').val();
   if ($('#room_finder-manager :selected').val() === "") {
     $('.available_bookings-manager').html(loadAvailableBookingsByDate(searchDate));

   } else {
     $('.available_bookings-manager').html(loadAvailableBookingsByOptionAndDate(searchDate, $('#room-finder :selected').val()));
   }
 });

 // Event listener - Manager delete
 $('.available_bookings-manager').on('click', function() {
   let target = $(event.target);
   let reservationID;
   if (target.is('button')) {
     let btnClass = target.attr("class");
     reservationID = btnClass.slice(13, 40);
     deleteDatum.id = parseInt(reservationID);
     target.parent().hide();
     deleteBooking(deleteDatum);
   }
 });

// Event listeners - Welcome section
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
  $('.welcome-section').toggle();
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

// DOM population functionality
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

function loadAllCustomerBookingsToDOMForManager(id) {
  let list;
  produceBookingsForCustomer(id).forEach(item => {
    list += `<div class="manager-booking ${item.id}">
               <p class="manager__booking--date">Date: ${item.date}:</p>
               <p class="manager__booking--id">Reservation ID: ${item.id}</p>
               <button class="delete-button${item.id}" type="button" name="button">Delete Reservation</button>
             </div>`
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
               <p class="new__customer--property">Nightly Cost: $${item.costPerNight}</p>
               <button class="book-button${item.number}" type="button" name="button">Book Room</button>
            </div>`
  });

  return list
}

function produceAvailableRoomsByOptionAndDate(date, option) {
  let arrayOfRoomData = customer.findAvailableRoomsByOption(date, option);
  if (arrayOfRoomData.length > 1) {
    arrayOfRoomData.sort((a, b) => {
      return a.roomNumber - b.roomNumber
    })
  }

  if (arrayOfRoomData.length === 0) {
    arrayOfRoomData = [];
  }

  return arrayOfRoomData
}

function loadAvailableBookingsByOptionAndDate(date, option) {
  let list;
  if (produceAvailableRoomsByOptionAndDate(date, option).length > 0) {
    produceAvailableRoomsByOptionAndDate(date, option).forEach(item => {
      list += `<div class="customer__rooms--available">
                 <p class="new__customer--property"><span class="property-styling">Room Number:</span> ${item.number}</p>
                 <p class="new__customer--property">Room Type: ${item.roomType}</p>
                 <p class="new__customer--property">Bidet:  ${item.bidet}</p>
                 <p class="new__customer--property">Bed Size: ${item.bedSize}</p>
                 <p class="new__customer--property">Beds:  ${item.numBeds}</p>
                 <p class="new__customer--property">Nightly Cost: ${item.costPerNight}</p>
                 <button class="book-button${item.number}" type="button" name="button">Book Room</button>
              </div>`
    });

  } else if (produceAvailableRoomsByOptionAndDate(date, option).length === 0) {
    list = `<div class="customer__rooms--available">
               <p class="new__customer--property"><span class="property-styling">Our fiercest apologies, but there is no availability for this room type on this date. Please select another option</span></p>
            </div>`
  }
  return list
}

function loadCustomerDashboardCalculations() {
  $('.user-name').text((customer.findUserName(userLoginID)));
  $('.expenses-incurred').text((customer.findRevenue(userLoginID)));
  $('.bookings-log').html(loadAllCustomerBookingsToDOM(userLoginID));
}

////set up the ev listener to create the scroll section, have the button click replce the name section with guest details as well as haev the click summon the book reservation menu
function loadGuestList() {
  let list;
    manager.findAllGuestNames().forEach(item => {
      list += `<div class="guests">
                 <p class="guest-name"><span class="property-styling">Guest Name:</span> ${item}</p>
                 <button class="select-guest${item}" type="button" name="button">Manage Guest</button>
              </div>`
    });

  return list
}

function loadManagerDashboardCalculations() {
  $('.rooms-available').text(manager.findTotalAvailableRoomsByDate(today));
  $('.todays-revenue').text(manager.findRevenue(today));
  $('.percent-occupancy').text(manager.findPercentageOfRoomsOccupiedByDate(today));
  $('.available_bookings-manager').html(loadGuestList());
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

// Fetch post request
function postBooking(bookingDatum) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings',
  {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(bookingDatum)
  })
  .then(response => console.log('Something smells good', response))
  .catch(error => console.log('Something is amiss', error))
}

// Fetch delete request
function deleteBooking(deleteDatum) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings',
  {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(deleteDatum)
  })
  .then(response => console.log('Something was deleted', response))
  .catch(error => console.log('Error', error))
}
