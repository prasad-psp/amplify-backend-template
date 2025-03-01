import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */

/**
 * Important notes
 * - We need to manuall add cognito domain for external sign in provider like google sign in.
 * we need to add this domain in google cloud / creadentials page
 * - User pool domain is automatically created when we use google sign in 
 */
export const auth = defineAuth({
  loginWith: {
    /**
     * Default sign up/in option email & password
     */
    email: true,
    externalProviders: {
      google: {
        /**
         * This values are stored in aws amplify console
         * We can create different values for different env in console for dev & prod
         */
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),

        /** 
         * You can determine the pieces of data you 
         * want to retrieve from each external provider when setting them up in the amplify/auth/resource.ts file using scopes.
         */ 
        scopes: ['email'],

        /**
         * Identity provider (IdP) services store user attributes in different formats. 
         * When using external IdPs with Amazon Cognito user pools,
         *  attribute mapping allows you to standardize these varying formats into a consistent schema.
         */
        attributeMapping: {
          email: 'email'
        },
      },
      /**
       * Using this callback url's when google sign this callback methods are called
       * callback for after user sign in using google sign in provider
       * signout for after user sign out using google sign in provider
       * We need handle this in mobile app using deeplink machanism
       */
      callbackUrls: ["myapp://callback/"],
      logoutUrls: ["myapp://signout/"],
      // domainPrefix: 'myapp-auth'
    },
  },
  // domain: {
  //   hostedUiDomainPrefix: 'myapp-auth', // Replace with your desired prefix
  // },
  userAttributes: {
    email: {
      required: true,
      mutable: true
    }
  }
});
