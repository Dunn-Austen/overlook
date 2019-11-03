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

  findTotalAvailableRoomsByDate(date) {
    let availableRooms = this.findRoomsAvailableByDate(date);
    return availableRooms.length
  }

  findPercentageOfRoomsOccupiedByDate(date) {
    let totalAvailable = this.findTotalAvailableRoomsByDate(date);
    let percentage =  ((25 - totalAvailable) / 25) * 100;
    return `${percentage}%`
  }
}

export default Manager;
