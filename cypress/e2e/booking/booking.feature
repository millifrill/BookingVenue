Feature: Book a venue

  Scenario: A visitor books a venue and gets a booking number
    Given I am on the page of the venue "Konferensrum Ljuset"
    When I choose a date next week from "10:00" to "12:00"
    And I confirm the booking as "Anna" "Svensson"
    Then I should see that the booking is confirmed
    And I should see a booking number
