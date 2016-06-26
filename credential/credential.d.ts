declare module 'credential' {

    type HashCallback = (err: Error, hashJSON: HashJSON) => void;
    type VerifyCallback = (err: Error, isValid: boolean) => void;
    
    type Options = {
        keyLength: number,
        work: number
    };
    
    type HashJSON = {
        hash: string,
        salt: string,
        keyLength: number,
        hashMethod: string,
        iterations: number
    };
    
    interface Credential {
        /**
         * @callback verifyCallback
         * @param {Error} err
         * @param {boolean} isValid
         */
        
        /**
         * Takes a stored hash, password input from the user, and a callback, and determines whether or not the user's input matches the stored password. 
         * @param {string} hash - A stored password hash
         * @param {string} input - User's password input
         * @param {verifyCallback} callback - If callback is not provided, verify returns a Promise
         */
        verify(hash: string, input: string, callback?: VerifyCallback): void | Promise<boolean>;

        /**
         * @callback hashCallback
         * @param {Error} err
         * @param {Object} hashJSON
         * @param {string} hashJSON.hash
         * @param {string} hashJSON.salt
         * @param {number} hashJSON.keyLength - Bytes in hash
         * @param {string} hashJSON.hashMethod
         * @param {number} hashJSON.iterations
         */

        /**
         * Takes a new password and creates a unique hash. Passes a JSON encoded object to the callback.
         * @param {string} password
         * @param {hashCallback} callback
         */
        hash(password: string, callback?: HashCallback): void | Promise<HashJSON>;
        
        /**
         * Takes a stored hash, password input from the user, and a callback, and determines whether or not the user's input matches the stored password.
         * @param hash - A stored password hash
         * @param days - Days before expiry
         */
        expired(hash: string, days?: number): boolean;
    }
    
    export function credential(options?: Options): Credential;
}
