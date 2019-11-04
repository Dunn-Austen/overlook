import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
chai.use(spies);

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

  it('should find total available rooms by date', () => {
    expect(manager.findTotalAvailableRoomsByDate("2019/11/06")).to.equal(20);
  });

  it('should find percentage of occupied rooms by date', () => {
    expect(manager.findPercentageOfRoomsOccupiedByDate("2019/11/06")).to.equal('20%');
  });

  it('should find the total number of vacant rooms by inheriting findBookings', () => {
    chai.spy.on(manager, 'findBookings', () => {
      return [
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
      ];
    });
    expect(manager.findTotalAvailableRoomsByDate("2019/11/06")).to.equal(20);
  });

  it('should find the total number of vacant rooms by inheriting findRoomsAvailableByDate', () => {
    chai.spy.on(manager, 'findRoomsAvailableByDate', () => {
      return [
        {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
        },

        {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
        },

        {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14
        }
      ];
    });
    expect(manager.findTotalAvailableRoomsByDate("2019/11/06")).to.eql(3);
  });

});
