import { Configuration, LogLevel } from '@azure/msal-browser'

export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', //`${process.env.REACT_APP_AZURE_AAD_CLIENT_ID}`,
    authority: 'YOUR_AUTHORITY', //`https://${process.env.REACT_APP_AZURE_AAD_TENANT_NAME}.b2clogin.com/${process.env.REACT_APP_AZURE_AAD_TENANT_NAME}.onmicrosoft.com/${process.env.REACT_APP_AZURE_AAD_POLICY_NAME}`,
    knownAuthorities: ['YOUR_KNOWN_AUTHORITIES'], //[`${process.env.REACT_APP_AZURE_AAD_TENANT_NAME}.b2clogin.com`],
    redirectUri: 'http://localhost:3000/', // Replace appropriately
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
}

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
}

export const tokenRequest = {
  scopes: ['User.Read'], // Replace ... with your custom scopes
}

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: 'ENTER_THE_GRAPH_ENDPOINT_HERE/v1.0/me',
}
