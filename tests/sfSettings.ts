// sfSettings.ts

/**
 * A utility class containing various Salesforce-related settings and sample data.
 * This class includes configuration settings, sample data for testing, and user details.
 *
 * Author: Mohan Chinnappan
 */
export class SFSettings {

    /**
     * Salesforce login configuration.
     * Contains details required to log in to Salesforce and navigate to specific pages.
     */
    static readonly sfLoginData = {
      orgName: "mohan.chinnappan.n.ea10@gmail.com", // The Salesforce organization alias or username
      homePage: "/lightning/page/home", // The path to the Salesforce Home page
      setupPage: "/lightning/setup/SetupOneHome/home", // The path to the Salesforce Setup page
    };
  
    /**
     * Timeout setting for slow operations, in milliseconds.
     * This is used to define the maximum allowed time for operations that are expected to take longer.
     */
    static readonly SLOW: number = 120000;
  
    /**
     * Timeout setting for medium operations, in milliseconds.
     * This is used for operations that are expected to take a moderate amount of time.
     */
    static readonly MED: number = 90000;
  
    /**
     * List of sample superhero users for testing or user creation scenarios.
     * Each superhero object contains a first name, last name, and email address.
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
     * Defines the level of email deliverability access.
     */
    static readonly emailDeliverabilityData = {
      setTo: "2", // 0: No access, 1: System Email Only, 2: All email
    };
  
    /**
     * URL path for accessing the email deliverability settings in Salesforce.
     */
    static readonly emailDeliverabilityLink = 'email-admin/editOrgEmailSettings.apexp?appLayout=setup&noS1Redirect=true';
  
    /**
     * Locator string for selecting the email deliverability dropdown in Salesforce.
     */
    static readonly emailDeliverabilityLocator = '[id="thePage\\:theForm\\:editBlock\\:sendEmailAccessControlSection\\:sendEmailAccessControl\\:sendEmailAccessControlSelect"]';
  
    /**
     * URL path for accessing the setup audit trail in Salesforce.
     */
    static readonly setupAuditTrailLink = 'setup/org/orgsetupaudit.jsp?setupid=SecurityEvents&retURL=%2Fui%2Fsetup%2FSetup%3Fsetupid%3DSecurity';
  
    /**
     * URL path for accessing the Salesforce Optimizer setup in Salesforce Lightning.
     */
    static readonly lightningUrl = 'lightning/setup/SalesforceOptimizer/home';

    // password rest for all users of the org

    static readonly passwordResetForAllUsersUrl = 'secur/organizationpasswordreset.jsp?setupid=SecurityExpirePasswords&retURL=%2Fui%2Fsetup%2FSetup%3Fsetupid%3DSecurity';

    // security health check url
    static readonly healthCheckUrl = '_ui/security/dashboard/aura/SecurityDashboardAuraContainer?retURL=%2Fui%2Fsetup%2FSetup%3Fsetupid%3DSecurity&setupid=HealthCheck';


    // myDomain url
    static readonly lexMyDomainUrl = '/lightning/setup/OrgDomain/home'
  }
  