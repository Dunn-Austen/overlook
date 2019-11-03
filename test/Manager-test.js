import chai from 'chai';
const expect = chai.expect;

import bookingsData from '../data/bookings-test-data';
import roomsData from '../data/rooms';
import usersData from '../data/users';

import Manager from '../src/Manager';

describe('Manager', () => {
  let manager;

  beforeEach(() => {
    manager = new Manager(bookingsData, roomsData, usersData)
  });

  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of the class Manager', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  });

  it('should be able to store users data in a property', () => {
    expect(manager.users).to.eql(usersData);
  });

  it('should be able to find a user\'s ID by name', () => {
    expect(manager.findUserID("Faustino Quitzon")).to.equal(9);
  });

  it.skip('should find total available rooms by date', () => {
    expect(manager.findTotalAvailableRoomsToday(date)).to.eql();
  });

  it.skip('should find percentage of occupied rooms by date', () => {
    expect(manager.findPercentageOfRoomsOccupiedByDate(date)).to.eql();
  });

});
