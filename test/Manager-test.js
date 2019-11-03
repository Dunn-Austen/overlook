const chai = require('chai');
const expect = chai.expect;

import bookingsData from '../data/bookings-test-data';
import roomsData from '../data/rooms';

// import DATA? from '../ ?? ;

import Manager from '../src/Manager';

describe('Manager', () => {
  let manager;

  beforeEach(() => {
    manager = new Manager()
  })

  it.skip('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it.skip(('should be an instance of the class Manager', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  });

  it.skip(('should be able to find a user\'s ID by name', () => {
    expect(manager.findUserID(name).to.eql();
  });

  it.skip(('should find total available rooms by date', () => {
    expect(manager.findTotalAvailableRoomsToday(date).to.eql();
  });

  it.skip(('should find percentage of occupied rooms by date', () => {
    expect(manager.findPercentageOfRoomsOccupiedByDate(date).to.eql();
  });

});
