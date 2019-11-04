class BookingCalculations {
  constructor(bookings, rooms) {
    this.bookings = bookings;
    this.rooms = rooms
  }

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

  findRoomsAvailableByDate(date) {
    let bookingsOnDate = this.findBookings(date);
    let occupiedRoomNumbers = bookingsOnDate.reduce((acc, booking) => {
      this.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          acc.push(room.number)
        }
      })

      return acc
    }, [])

    let availableRooms = this.rooms.filter(room => {
      return !occupiedRoomNumbers.includes(room.number)
    })

    return availableRooms
  }

  findRevenue(metric) {
    let bookingsForUserOrDate = this.findBookings(metric);
    let expectedFees = bookingsForUserOrDate.map(booking => {
      this.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          booking.costPerNight = room.costPerNight
        }
      })

      return booking.costPerNight
    })

    let totalRevenueForMetric = expectedFees.reduce((sum, fee) => {
      sum += fee
      return sum
    }, 0)

    let dollarAmount = parseFloat(totalRevenueForMetric.toFixed(2))
    return `$${dollarAmount}`
  }
}

export default BookingCalculations;
