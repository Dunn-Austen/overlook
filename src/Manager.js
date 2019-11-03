import BookingCalculations from "./BookingCalculations";

class Manager extends BookingCalculations {
  constructor(bookings, rooms, users) {
    super(bookings, rooms);
    this.users = users
  }

  findUserID(name) {
    const userInfo = this.users.find(user => {
      return user.name === name
    })
    return userInfo.id
  }

  findTotalAvailableRoomsToday(date) {
    let availableRooms = findRoomsAvailableToday(date);
    return availableRooms.length
  }

  findPercentOccupiedToday() {
    
  }
}

export default Manager;
