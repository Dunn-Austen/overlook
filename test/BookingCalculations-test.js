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

  it.skip('should be an instance of the class Manager', () => {
    expect(bookingCalculations).to.be.an.instanceOf(BookingCalculations);
  });

  it.skip('should be able to store bookings data in a property', () => {
    expect(bookingCalculations.bookings).to.eql(bookingsData);
  });

  it.skip('should be able to store bookings data in a property', () => {
    expect(bookingCalculations.rooms).to.eql(roomsData);
  });

  it.skip('should be able to find all bookings for a specific date', () => {
    expect(bookingCalculations.findBookings(date)).to.eql();
  });

  it.skip('should be able to find all bookings for a specific user', () => {
    expect(bookingCalculations.findBookings(id)).to.eql();
  });

  it.skip('should be able to find available rooms by date', () => {
    expect(bookingCalculations.findRoomsAvailableByDate(date)).to.eql();
  });

  it.skip('should be able to find total spent by a customer', () => {
    expect(bookingCalculations.findRevenue(id)).to.eql();
  });

  it.skip('should be able find to total revenue by date', () => {
    expect(bookingCalculations.findRevenue(date)).to.eql();
  });

});
