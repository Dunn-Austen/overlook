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

  it('should be able to find user\'s name by id', () => {
    expect(customer.findUserName(1)).to.equal("Leatha Ullrich");
  });

  it('should find a list of available room types by date', () => {
    expect(customer.findAvailableRoomsByOption("2019/11/06", 'residential suite')).to.eql([
        {
          "bedSize": "queen",
          "bidet": true,
          "costPerNight": 358.4,
          "numBeds": 1,
          "number": 1,
          "roomType": "residential suite"
        },

        {
          "bedSize": "full",
          "bidet": false,
          "costPerNight": 294.56,
          "numBeds": 1,
          "number": 15,
          "roomType": "residential suite"
        },

        {
          "bedSize": "queen",
          "bidet": false,
          "costPerNight": 343.95,
          "numBeds": 1,
          "number": 20,
          "roomType": "residential suite"
        },

        {
          "bedSize": "queen",
          "bidet": false,
          "costPerNight": 176.36,
          "numBeds": 2,
          "number": 23,
          "roomType": "residential suite"
        }
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
    expect(customer.findAvailableRoomsByOption("2019/11/06", 'residential suite').length).to.equal(4);
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
    expect(customer.findAvailableRoomsByOption("2019/11/06", 'residential suite')).to.eql([
      {
      number: 1,
      roomType: 'residential suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 358.4
      }
    ]);
  });

});
