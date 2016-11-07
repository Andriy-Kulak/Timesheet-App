import {renderComponent, expect} from '../test_helper';
import Timesheet from '../../src/components/timesheets/timesheet';
import sinon from 'sinon';

describe('Timesheet Component', () => {
  let component;
  let sandbox;
  let localStorage;
  let sessionStorage;
  beforeEach(() => {
    sandbox = sinon.sanbox.create();
    component = renderComponent(Timesheet);

    window.localStorage = 'test123';
    window.sessionStorage = 'test234';
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('shows correct text', () => {
    expect(component).to.conain('Work Type');
  });

  afterEach(() => {
    sandbox.restore();
  });
});
