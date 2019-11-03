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

  it.skip('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it.skip('should be an instance of the class Customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });

  it.skip('should find a list of available room types by date', () => {
    expect(customer.findAvailableRoomsByRoomType(date)).to.eql();
  });

});
