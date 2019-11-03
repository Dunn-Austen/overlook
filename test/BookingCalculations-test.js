import chai from 'chai';
const expect = chai.expect;

import bookingsData from '../data/bookings-test-data';
import roomsData from '../data/rooms';

import BookingCalculations from '../src/BookingCalculations';

describe('BookingCalculations', () => {
  let bookingCalculations;

  beforeEach(() => {
    bookingCalculations = new BookingCalculations(bookingsData, roomsData)
  });

  it('should be a function', () => {
    expect(BookingCalculations).to.be.a('function');
  });

  it('should be an instance of the class Manager', () => {
    expect(bookingCalculations).to.be.an.instanceOf(BookingCalculations);
  });

  it('should be able to store bookings data in a property', () => {
    expect(bookingCalculations.bookings).to.eql(bookingsData);
  });

  it('should be able to store rooms data in a property', () => {
    expect(bookingCalculations.rooms).to.eql(roomsData);
  });

  it('should be able to find all bookings for a specific date', () => {
    expect(bookingCalculations.findBookings("2019/11/06")).to.eql([
      {
      id: 1572293130156,
      userID: 19,
      date: "2019/11/06",
      roomNumber: 18,
      roomServiceCharges: [ ]
      },

      {
      id: 1572293130160,
      userID: 16,
      date: "2019/11/06",
      roomNumber: 7,
      roomServiceCharges: [ ]
      },

      {
      id: 1572293130160,
      userID: 30,
      date: "2019/11/06",
      roomNumber: 11,
      roomServiceCharges: [ ]
      },

      {
      id: 1572293130161,
      userID: 50,
      date: "2019/11/06",
      roomNumber: 14,
      roomServiceCharges: [ ]
      },

      {
      id: 1572293130163,
      userID: 39,
      date: "2019/11/06",
      roomNumber: 21,
      roomServiceCharges: [ ]
      }
    ]);
  });

  it('should be able to find all bookings for a specific user', () => {
    expect(bookingCalculations.findBookings(9)).to.eql([
      {
      id: 1572293130161,
      userID: 9,
      date: "2019/11/07",
      roomNumber: 5,
      roomServiceCharges: [ ]
      },

      {
      id: 1572293130161,
      userID: 9,
      date: "2019/11/05",
      roomNumber: 20,
      roomServiceCharges: [ ]
      }
    ]);
  });

  it('should be able to find available rooms by date', () => {
    expect(bookingCalculations.findRoomsAvailableByDate("2019/11/06").length).to.equal(20);
  });

  it('should be able to find total spent by a customer', () => {
    expect(bookingCalculations.findRevenue(9)).to.eql(684.12);
  });

  it('should be able find to total revenue by date', () => {
    expect(bookingCalculations.findRevenue("2019/11/06")).to.eql(1822.31);
  });

});
