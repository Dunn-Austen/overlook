
import BookingCalculations from "./BookingCalculations";

class Customer extends BookingCalculations {
  constructor(bookings, rooms) {
    super(bookings, rooms);
  }

  findAvailableRoomsByRoomType(date) {
    let availableRooms = this.findRoomsAvailableByDate(date);
    let availableRoomTypes = availableRooms.map(room => {
      return room.roomType
    })

    return availableRoomTypes
  }
}

export default Customer;
