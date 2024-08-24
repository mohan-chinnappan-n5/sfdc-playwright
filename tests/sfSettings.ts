// sfSettings.ts

/**
 * A utility class containing various Salesforce-related settings and sample data.
 * This class includes configuration settings, sample data for testing, and user details.
 *
 * Author: Mohan Chinnappan
 */
export class SFSettings {
  // Salesforce login configuration
  static readonly sfLoginData = {
    orgName: "mohan.chinnappan.n.ea10@gmail.com", // The Salesforce organization alias or username
    homePage: "/lightning/page/home", // The Salesforce Home page path
    setupPage: "/lightning/setup/SetupOneHome/home", // The Salesforce Setup page path
  };

  /**
   * Timeout setting for slow operations, in milliseconds.
   * This is used to define the maximum allowed time for slow operations.
   */
  static readonly SLOW: number = 120000;

  /**
   * Timeout setting for medium operations, in milliseconds.
   * This is used for operations that are expected to take moderate time.
   */
  static readonly MED: number = 90000;

  /**
   * List of sample superhero users for testing or user creation scenarios.
   * Each superhero includes their first name, last name, and email address.
   */
  static readonly superHeroes = [
    {
      firstName: "Clark",
      lastName: "Kent",
      email: "clark.kent@dailyplanet.com",
    },
    {
      firstName: "Bruce",
      lastName: "Wayne",
      email: "bruce.wayne@wayneenterprises.com",
    },
    {
      firstName: "Diana",
      lastName: "Prince",
      email: "diana.prince@themyscira.gov",
    },
    {
      firstName: "Peter",
      lastName: "Parker",
      email: "peter.parker@dailybugle.com",
    },
    {
      firstName: "Tony",
      lastName: "Stark",
      email: "tony.stark@starkindustries.com",
    },
  ];

  /**
   * Sample account data for testing or creation scenarios.
   * Each account includes a name and a number.
   */
  static readonly sampleAccounts = [
    { name: "MCTest10", number: "101010" },
    { name: "MCTest11", number: "111111" },
  ];

  /**
   * Configuration data for setting email deliverability in Salesforce.
   */
  static readonly emailDeliverabilityData = {
    setTo: "2", // 0: No access, 1: System Email Only, 2: All email
  };
}
