const chai = require('chai');
const expect = chai.expect;


// import DATA? from '../ ?? ;

import Manager from '../src/Manager';

describe('Manager', () => {
  let customer;

  beforeEach(() => {
    manager = new Manager()
  })

  it.skip('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it.skip(('should be an instance of the class Manager', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  });

  it.skip(('should be able to store sleep data in a property', () => {
    expect().to.eql();
  });

});
