// utils.ts

const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const execEnv = { env: { ...process.env, FORCE_COLOR: "0" } };

/**
 * A utility class containing various helper methods.
 * 
 * @author Mohan Chinnappan
 */
export class Utils {

    /**
     * Extracts the base URL (protocol + domain) from a given URL string.
     * 
     * @param url - The full URL string from which to extract the base URL.
     * @returns The base URL or null if the provided URL is invalid.
     * 
     * @example
     * const baseUrl = Utils.extractBaseUrl("https://example.com/path?query=123");
     * console.log(baseUrl); // Output: "https://example.com"
     */
    static extractBaseUrl(url: string): string | null {
        try {
            const urlObj = new URL(url);
            return urlObj.origin;
        } catch (e) {
            console.error("Invalid URL provided:", e);
            return null;
        }
    }

    // salesforce.com url to force.com convertor

    static sf2lexUrl(url: string ): string | null {
        try {
            return  url.replace('.my.salesforce.com', '.lightning.force.com');
        } catch (e) {
            console.error("Invalid URL provided:", e);
            return null;
        }
    }

    /**
     * Opens a Salesforce organization in a browser window and extracts relevant details.
     * 
     * This method executes a Salesforce CLI command to open the specified organization,
     * retrieves the URL, and extracts the base URL using the extractBaseUrl method.
     * 
     * @param orgName - The alias or username of the Salesforce organization.
     * @param page - The specific page or path within the Salesforce org to open.
     * @returns A promise resolving to an object containing the instance URL and other details.
     * 
     * @example
     * const result = await Utils.sfLogin('myOrgAlias', '/lightning/setup/SetupOneHome/home');
     * console.log(result.instanceUrl); // Output: "https://myOrgInstance.salesforce.com"
     */
    static sfLogin = async (orgName: string, page: string): Promise<{ instanceUrl: string; [key: string]: any }> => {
        const cmd = `sf org:open -o ${orgName} --path ${page} --url-only --json`;
        console.log(`Executing command: ${cmd}`);
        
        try {
            let sfOutput = await exec(cmd, execEnv);
            let results = JSON.parse(sfOutput.stdout.trim());
            results.instanceUrl = Utils.extractBaseUrl(results.result.url);
            console.log(`Login successful. Instance URL: ${results.instanceUrl}`);
            return results;
        } catch (error) {
            console.error("Error executing Salesforce login command:", error);
            throw error;
        }
    }

 
    /*
       Command to create a SFDX Project
    */

    static createSFDXProject = projectName => {
        return `sf project generate -n projectName`
    }

    /*
       getting the CustomField metadata using sfdx
       Note: make to run them inside a sfdx project
    */

    static getCustomFieldCmd = (object, field, orgName) => {
        return `sf force source retrieve -m CustomField:${object}.${field} -o ${orgName}`
    }

    static deployCustomFieldCmd = (object, field, orgName) => {
        return `sf project deploy start -m CustomField:${object}.${field} -o ${orgName}`
    }

}
