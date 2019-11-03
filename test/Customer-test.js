const chai = require('chai');
const expect = chai.expect;


// import DATA? from '../ ?? ;

import Customer from '../src/Customer';

describe('Customer', () => {
  let customer;

  beforeEach(() => {
    customer = new Customer()
  })

  it.skip('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it.skip(('should be an instance of the class Customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });

  it.skip(('should be able to store sleep data in a property', () => {
    expect().to.eql();
  });

});
