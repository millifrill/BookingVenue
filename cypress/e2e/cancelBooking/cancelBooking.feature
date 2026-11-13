Feature: Cancel Booking

    Background:
        Given I have a booking number 'M4N5P6Q7'

    Scenario: A user cancels booking
        When I search for the booking number
        And I click 'Avboka'
        Then I should see confirmation 'Avbokning lyckades! M4N5P6Q7 har raderats.'
        And I should not see the venue 'Festvåningen Hamnen'

    Scenario: A cancelled booking can not be searched for
        Given The booking was cancelled
        When I search for the booking number
        Then I should see confirmation 'Ingen bokning hittades'