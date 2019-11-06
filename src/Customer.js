
import BookingCalculations from "./BookingCalculations";

class Customer extends BookingCalculations {
  constructor(bookings, rooms, users) {
    super(bookings, rooms);
    this.users = users;
  }

  findUserName(id) {
    const userInfo = this.users.find(user => {
      return user.id === id
    })
    return userInfo.name
  }

  findAvailableRoomsByOption(date, roomType) {
    let availableRooms = this.findRoomsAvailableByDate(date);
    let availableRoomTypes = availableRooms.filter(room => {
      return room.roomType === roomType
    })

    return availableRoomTypes
  }
}

export default Customer;
