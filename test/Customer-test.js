import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
chai.use(spies);

import bookingsData from '../data/bookings-test-data';
import roomsData from '../data/rooms';
import usersData from '../data/users';

import Customer from '../src/Customer';

describe('Customer', () => {
  let customer;

  beforeEach(() => {
    customer = new Customer(bookingsData, roomsData, usersData)
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of the class Customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });

  it('should be able to store users data in a property', () => {
    expect(customer.users).to.eql(usersData);
  });

  it('should find a list of available room types by date', () => {
    expect(customer.findAvailableRoomsByRoomType("2019/11/06")).to.eql([
      'residential suite',
      'suite',
      'single room',
      'single room',
      'single room',
      'junior suite',
      'junior suite',
      'single room',
      'suite',
      'single room',
      'single room',
      'residential suite',
      'single room',
      'junior suite',
      'single room',
      'residential suite',
      'single room',
      'residential suite',
      'suite',
      'single room'
    ]);
  });

  it('should find a list of available room types by date by inheriting findBookings', () => {
    chai.spy.on(customer, 'findBookings', () => {
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
    expect(customer.findAvailableRoomsByRoomType("2019/11/06").length).to.equal(20);
  });

  it('should find a list of available room types by date by inheriting findRoomsAvailableByDate', () => {
    chai.spy.on(customer, 'findRoomsAvailableByDate', () => {
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
    expect(customer.findAvailableRoomsByRoomType("2019/11/06")).to.eql([
      'residential suite',
      'suite',
      'single room'
    ]);
  });

});
