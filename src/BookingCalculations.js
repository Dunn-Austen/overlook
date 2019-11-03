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


}

export default BookingCalculations;
