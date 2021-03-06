import BookingCalculations from "./BookingCalculations";

class Manager extends BookingCalculations {
  constructor(bookings, rooms, users) {
    super(bookings, rooms);
    this.users = users
  }

  findAllGuestNames() {
    let userInfo = this.users.map(user => {
      return user.name
    })

    return userInfo
  }

  findUserID(name) {
    let userInfo = this.users.find(user => {
      return user.name === name
    })
    console.log(userInfo);
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
