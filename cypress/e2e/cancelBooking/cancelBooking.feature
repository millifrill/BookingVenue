Feature: Cancel Booking

    Background:
        Given I have a booking number 'M4N5P6Q7'

    Scenario: A user cancels booking
        When I search for the booking number
        Then I should see the venue 'Festvåningen Hamnen'
        When I click 'Avboka'
        Then I should see message 'Bokning M4N5P6Q7 har raderats.'
        And I should not see the venue 'Festvåningen Hamnen'

    Scenario: A cancelled booking can not be searched for
        Given the booking was cancelled
        When I search for the booking number
        Then I should see message 'Ingen bokning hittades'
