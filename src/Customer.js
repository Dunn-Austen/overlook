
import BookingCalculations from "./BookingCalculations";

class Customer extends BookingCalculations {
  constructor(bookings, rooms) {
    super(bookings, rooms);
  }

  findAvailableRoomsByRoomType(date) {
    let availableRooms = findRoomsAvailableByDate(date);
    let availableRoomTypes = availableRooms.map(room => {
      return room.roomType
    })
    return availableRoomTypes
  }
}

export default Customer;




//// Notes on class methods



// -total rooms Available Today (uses BOOKINGS & ROOMS)
    // -finds all bookings on Day X,
    // -then return allAvailable by filtering all rooms via iterating over bookings(date)(!includes(roomNumber / number))

        // findBookings(metric) {
        //   let bookingsForMetric = bookings.filter(booking => {
        //     if (typeof(metric) === 'number') {
        //       return booking.userID === metric
        //     } else {
        //       return booking.date === metric
        //     }
        //   })
        //
        //   return bookingsForMetric
        // }
        //
        // findRoomsAvailableToday(date) {
        //   let bookingsOnDate = findBookings(date);
        //   let occupiedRoomNumbers = bookingsOnDate.reduce((acc, booking) => {
        //     rooms.forEach(room => {
        //       if (room.number === booking.roomNumber) {
        //         acc.push(room.number)
        //       }
        //     })
        //
        //     return acc
        //   }, [])
        //
        //   console.log(occupiedRoomNumbers)
        //   let availableRooms = rooms.filter(room => {
        //     return !occupiedRoomNumbers.includes(room.number)
        //   })
        //
        //   return availableRooms
        // }
        //
        // findTotalAvailableRoomsToday(date) {
        //   let availableRooms = findRoomsAvailableToday(date);
        //   return availableRooms.length
        // }



  // -show a list of room details for only available rooms on date X (uses BOOKINGS & ROOMS)
    // -find all bookings on Day X,
    // -then return allAvailable by filtering all rooms via iterating over bookings(date)(!includes(roomNumber / number))
    // -then then use map (allAvailable) and transform each element into a ROOM object (via matching (roomNumber / number))

        // findBookings(metric) {
        //   let bookingsForMetric = bookings.filter(booking => {
        //     if (typeof(metric) === 'number') {
        //       return booking.userID === metric
        //     } else {
        //       return booking.date === metric
        //     }
        //   })
        //
        //   return bookingsForMetric
        // }
        //
        // findRoomsAvailableToday(date) {
        //   let bookingsOnDate = findBookings(date);
        //   let occupiedRoomNumbers = bookingsOnDate.reduce((acc, booking) => {
        //     rooms.forEach(room => {
        //       if (room.number === booking.roomNumber) {
        //         acc.push(room.number)
        //       }
        //     })
        //
        //     return acc
        //   }, [])
        //
        //   console.log(occupiedRoomNumbers)
        //   let availableRooms = rooms.filter(room => {
        //     return !occupiedRoomNumbers.includes(room.number)
        //   })
        //
        //   return availableRooms
        //   //should return an array of available Room Objects
        // }


// -Total revenue for today’s date (uses BOOKINGS & ROOMS)
    // -finds all bookings on Day X,
    // -then use map bookings(date) and transform each element into the costPerNight of ROOMS (via matching (roomNumber / number))
    // -then reduce that array of costs into a sum (totalRevenue On Day X)

        // findBookings(metric) {
        //   let bookingsForMetric = bookings.filter(booking => {
        //     if (typeof(metric) === 'number') {
        //       return booking.userID === metric
        //     } else {
        //       return booking.date === metric
        //     }
        //   })
        //
        //   return bookingsForMetric
        // }
        //
        // findRevenue(metric) {
        //   let bookingsForUserOrDate = findBookings(metric);
        //   let expectedFees = bookingsForUserOrDate.map(booking => {
        //     return booking.costPerNight
        //   })
        //
        //   console.log(expectedFees);
        //   let totalRevenueForMetric = expectedFees.reduce((sum, fee) => {
        //     sum += fee
        //     return sum
        //   }, 0)
        //
        //   return totalRevenueForMetric
        // }
        //

// -total spent by user all time (uses BOOKINGS & USERS & ROOMS)
    // -find all bookings for USER X (by id),
    // -then return/filter the dates prior to TODAY,
    // -then then use map filteredBookings(id) and transform each element into the costPerNight of ROOMS (via matching (roomNumber / number))
    // -then reduce that array of costs into a sum (totalRevenue On Day X)
        //
        // findBookings(metric) {
        //   let bookingsForMetric = bookings.filter(booking => {
        //     if (typeof(metric) === 'number') {
        //       return booking.userID === metric
        //     } else {
        //       return booking.date === metric
        //     }
        //   })
        //
        //   return bookingsForMetric
        // }
        //
        // findRevenue(metric) {
        //   let bookingsForUserOrDate = findBookings(metric);
        //   let expectedFees = bookingsForUserOrDate.map(booking => {
        //     return booking.costPerNight
        //   })
        //
        //   console.log(expectedFees);
        //   let totalRevenueForMetric = expectedFees.reduce((sum, fee) => {
        //     sum += fee
        //     return sum
        //   }, 0)
        //
        //   return totalRevenueForMetric
        // }

// -show available rooms by roomtype property (uses BOOKINGS & ROOMS)
    // -finds all bookings on Day X,
    // -then return allAvailable by filtering all rooms via iterating over bookings(date)(!includes(roomNumber / number))
    // -then then use map (allAvailable) and transform each element into a room.roomType property value (via matching (roomNumber / number))

        // findBookings(metric) {
        //   let bookingsForMetric = bookings.filter(booking => {
        //     if (typeof(metric) === 'number') {
        //       return booking.userID === metric
        //     } else {
        //       return booking.date === metric
        //     }
        //   })
        //
        //   return bookingsForMetric
        // }
        //
        // findRoomsAvailableToday(date) {
        //   let bookingsOnDate = findBookings(date);
        //   let occupiedRoomNumbers = bookingsOnDate.reduce((acc, booking) => {
        //     rooms.forEach(room => {
        //       if (room.number === booking.roomNumber) {
        //         acc.push(room.number)
        //       }
        //     })
        //
        //     return acc
        //   }, [])
        //
        //   console.log(occupiedRoomNumbers)
        //   let availableRooms = rooms.filter(room => {
        //     return !occupiedRoomNumbers.includes(room.number)
        //   })
        //
        //   return availableRooms
        //   //should return an array of available Room Objects
        // }
        //
        // findAvailableRoomsByRoomType(date) {
        //   let availableRooms = findRoomsAvailableToday(date);
        //   let availableRoomTypes = availableRooms.map(room => {
        //     return room.roomType
        //   })
        //   return availableRoomTypes
        // }

// -search for user by name ()
    // -FIND() single userObject (via matching user.name)
    // -then return user.id

        // findUserID(name) {
        //   const userInfo = this.users.find(user => {
        //     return user.name === name
        //   })
        //   return userInfo.id
        // }

// -Any room bookings for specific USER (past or present/upcoming) (uses BOOKINGS unless we need USERS Name)
    // -find all bookings for USER X (by id)

        // findBookings(metric) {
        //   let bookingsForMetric = bookings.filter(booking => {
        //     if (typeof(metric) === 'number') {
        //       return booking.userID === metric
        //     } else {
        //       return booking.date === metric
        //     }
        //   })
        //
        //   return bookingsForMetric
        // }


// -view user name, all bookings, and total spent
// -be able to select a room for booking (POST REQUEST THE BOOKING - USER)
// -In the event that no rooms are available for the date/roomType selected, display
//       a message fiercely apologizing to the user and asking them to adjust their room search
//       (manager)
// -Add a room booking for that user (POST REQUEST THE BOOKING - MANAGER)
// -Delete any upcoming room bookings for that user (they cannot delete a booking from the past) (DELETE REQUEST)

//
// 25 Total Rooms
// rooms: [
// {
// number: 1,
// roomType: "residential suite",
// bidet: true,
// bedSize: "queen",
// numBeds: 1,
// costPerNight: 358.4
// },
//
// 50 Total Users
// users: [
// {
// id: 1,
// name: "Leatha Ullrich"
// },
//
// Nearly 800 bookings (780 - 790ish?)
// Appears to be between "2019/10/01" and years end
// bookings: [
// {
// id: 1572293130156,
// userID: 19,
// date: "2019/11/06",
// roomNumber: 18,
// roomServiceCharges: [ ]
// },
