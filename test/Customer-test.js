import chai from 'chai';
const expect = chai.expect;

import bookingsData from '../data/bookings-test-data';
import roomsData from '../data/rooms';

import Customer from '../src/Customer';

describe('Customer', () => {
  let customer;

  beforeEach(() => {
    customer = new Customer(bookingsData, roomsData)
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of the class Customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
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

});
