class BookingCalculations {
  constructor(bookings, rooms) {
    this.bookings = bookings;
    this.rooms = rooms
  }

 //Takes is either id or date (finds bookings for User or For Day)
  findBookings(metric) {
    let bookingsForMetric = this.bookings.filter(booking => {
      if (typeof(metric) === 'number') {
        return booking.userID === metric
      } else {
        return booking.date === metric
      }
    })

    return bookingsForMetric
  }

  findRoomsAvailableToday(date) {
    let bookingsOnDate = findBookings(date);
    let occupiedRoomNumbers = bookingsOnDate.reduce((acc, booking) => {
      this.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          acc.push(room.number)
        }
      })

      return acc
    }, [])

    console.log(occupiedRoomNumbers)
    let availableRooms = this.rooms.filter(room => {
      return !occupiedRoomNumbers.includes(room.number)
    })

    return availableRooms
  }


}

export default BookingCalculations;
