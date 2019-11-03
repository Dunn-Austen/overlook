class Customer {
  constructor() {

  }
}

export default Customer;




//// Notes on class methods
// -total rooms Available Today (uses BOOKINGS & ROOMS)
    -finds all bookings on Day X,
    -then return allAvailable by filtering all rooms via iterating over bookings(date)(!includes(roomNumber / number))

        findBookingsForDate(date) {
          let bookingsForDay = bookings.filter(booking => {
            return booking.date === date
          })
          return bookingsForDay
        }

        findAvailableRoomsByDate(date) {
          // let bookingsOnDate = findBookingsForDate(date);
          // let unavailableRooms = [];
          // bookingsOnDate.forEach(booking => {
          //   unavailableRooms.push(booking.roomNumber)
          // })
          //
          // return availableRooms
        }




// -Total revenue for today’s date (uses BOOKINGS & ROOMS)
    -finds all bookings on Day X,
    -then use map bookings(date) and transform each element into the costPerNight of ROOMS (via matching (roomNumber / number))
    -then reduce that array of costs into a sum (totalRevenue On Day X)

        findBookingsForDate(date) {
          const bookingsForDay = bookings.filter(booking => {
            return booking.date === date
          })
          return bookingsForDay
        }

// -show a list of room details for only available rooms on date X (uses BOOKINGS & ROOMS)
    -find all bookings on Day X,
    -then return allAvailable by filtering all rooms via iterating over bookings(date)(!includes(roomNumber / number))
    -then then use map (allAvailable) and transform each element into a ROOM object (via matching (roomNumber / number))

        findBookingsForDate(date) {
          const bookingsForDay = bookings.filter(booking => {
            return booking.date === date
          })
          return bookingsForDay
        }

// -show available rooms by roomtype property (uses BOOKINGS & ROOMS)
    -finds all bookings on Day X,
    -then return allAvailable by filtering all rooms via iterating over bookings(date)(!includes(roomNumber / number))
    -then then use map (allAvailable) and transform each element into a room.roomType property value (via matching (roomNumber / number))

        findBookingsForDate(date) {
          const bookingsForDay = bookings.filter(booking => {
            return booking.date === date
          })
          return bookingsForDay
        }

// -search for user by name ()
    -FIND() single userObject (via matching user.name)
    -then return user.id

        findUserID(name) {
          const userInfo = users.find(user => {
            return user.name === name
          })
          return userInfo.id
        }

// -Any room bookings for specific USER (past or present/upcoming) (uses BOOKINGS unless we need USERS Name)
    -find all bookings for USER X (by id)

        findUserBookings(id) {
          const userBookings = bookings.filter(booking => {
            return booking.userID === id
          })
          return userBookings
        }

// -total spent by user all time (uses BOOKINGS & USERS & ROOMS)
    -find all bookings for USER X (by id),
    -then return/filter the dates prior to TODAY,
    -then then use map filteredBookings(id) and transform each element into the costPerNight of ROOMS (via matching (roomNumber / number))
    -then reduce that array of costs into a sum (totalRevenue On Day X)


// -view user name, all bookings, and total spent
// -be able to select a room for booking (POST REQUEST THE BOOKING - USER)
// -In the event that no rooms are available for the date/roomType selected, display
//       a message fiercely apologizing to the user and asking them to adjust their room search
//       (manager)
// -Add a room booking for that user (POST REQUEST THE BOOKING - MANAGER)
// -Delete any upcoming room bookings for that user (they cannot delete a booking from the past) (DELETE REQUEST)


25 Total Rooms
rooms: [
{
number: 1,
roomType: "residential suite",
bidet: true,
bedSize: "queen",
numBeds: 1,
costPerNight: 358.4
},

50 Total Users
users: [
{
id: 1,
name: "Leatha Ullrich"
},

Nearly 800 bookings (780 - 790ish?)
Appears to be between "2019/10/01" and years end
bookings: [
{
id: 1572293130156,
userID: 19,
date: "2019/11/06",
roomNumber: 18,
roomServiceCharges: [ ]
},
