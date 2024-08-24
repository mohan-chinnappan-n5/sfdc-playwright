// utils.ts

const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const execEnv = { env: { ...process.env, FORCE_COLOR: "0" } };


/**
 * A utility class containing various helper methods.
 */
export class Utils {

    /**
     * Extracts the base URL from a given URL string.
     * 
     * @param url - The full URL string from which to extract the base URL.
     * @returns The base URL or null if the provided URL is invalid.
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

    static sfLogin = async (orgName, page) => {
        const cmd = `sf org:open -o ${orgName} --path ${page} --url-only --json`;
        console.log(cmd);
        let sfOutput = await exec(cmd, execEnv);
        let results = JSON.parse(sfOutput.stdout.trim());
        results.instanceUrl = Utils.extractBaseUrl(results.result.url);
        console.log(results);
        return results;
      }

}
