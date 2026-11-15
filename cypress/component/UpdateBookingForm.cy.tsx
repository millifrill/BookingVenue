import UpdateBookingForm from '../../src/components/UpdateBookingForm/UpdateBookingForm';

const booking = {
  startTime: new Date(2026, 11, 23, 17, 0).toISOString(),
  endTime: new Date(2026, 11, 23, 20, 0).toISOString(),
};

describe('UpdateBookingForm', () => {
  beforeEach(() => {
    cy.mount(
      <UpdateBookingForm
        startTime={booking.startTime}
        endTime={booking.endTime}
        onSave={cy.stub().as('onSave')}
      />,
    );
  });

  it('fills in the form with the current date and time of the booking', () => {
    cy.get("[data-cy='update-booking-date']").should(
      'have.value',
      '2026-12-23',
    );
    cy.getByRole('combobox', { name: 'Från' }).should('have.value', '17:00');
    cy.getByRole('combobox', { name: 'Till' }).should('have.value', '20:00');
  });

  it('shows an error and does not save when the end time is before the start time', () => {
    cy.getByRole('combobox', { name: 'Från' }).select('21:00');
    cy.getByRole('combobox', { name: 'Till' }).select('20:00');
    cy.getByRole('button', { name: 'Spara' }).click();
    cy.get("[data-cy='save-booking-btn']").should(
      'contain',
      'Sluttiden måste vara efter starttiden',
    );
    cy.get('@onSave').should('not.have.been.called');
  });

  it('calls onSave with the new start and end time when a valid time is chosen', () => {
    cy.get("[data-cy='update-booking-date']").clear().type('2026-12-24');
    cy.getByRole('combobox', { name: 'Från' }).select('12:00');
    cy.getByRole('combobox', { name: 'Till' }).select('20:00');
    cy.getByRole('button', { name: 'Spara' }).click();
    cy.get('@onSave').should(
      'have.been.calledOnceWith',
      '2026-12-24 12:00:00',
      '2026-12-24 20:00:00',
    );
  });
});
