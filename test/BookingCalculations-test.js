const chai = require('chai');
const expect = chai.expect;


// import DATA? from '../ ?? ;

import BookingCalculations from '../src/BookingCalculations';

describe('Manager', () => {
  let customer;

  beforeEach(() => {
    bookingCalculations = new BookingCalculations()
  })

  it.skip('should be a function', () => {
    expect(BookingCalculations).to.be.a('function');
  });

  it.skip(('should be an instance of the class Manager', () => {
    expect(bookingCalculations).to.be.an.instanceOf(BookingCalculations);
  });

  it.skip(('should be able to store sleep data in a property', () => {
    expect().to.eql();
  });

});
