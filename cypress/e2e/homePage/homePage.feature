Feature: HomePage - venue list

A user visits BookingVenue site

Background:
Given I am on the HomePage

  Scenario: A user visits BookingVenue site
    Then I should see a list of 10 venue items

  Scenario: A user clicks on "Visa lokal" button to see more information about the venue
  When I click on "Visa lokal" button on "Konferensrum Ljuset" venue item
  Then I should be redirected to a page with more information about "Konferensrum Ljuset" venue
