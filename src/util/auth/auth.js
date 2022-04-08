import { DropboxAuth } from 'dropbox';
import fetch from 'node-fetch';
import * as settings from './constants.js'


/**
 * Get a URL that can be used to authenticate users for the Dropbox API.
 * 
 * @param {String} clientId - The ID of the app client
 * @param {String} redirectUri - A URL to redirect the user to after
 * authenticating. This must be added to your app through the admin interface.
 * @returns {Promise<String>} - Url to send user to for Dropbox API authentication
 * returned in a promise
 */
export function getAuthUrl(clientId, redirectUri) {
    const config = {
        fetch,
        clientId: clientId
    };
    const dbx = new DropboxAuth(config);

    return dbx.getAuthenticationUrl(
      redirectUri, 
      settings.AUTH_STATE, 
      settings.AUTH_TYPE,
      settings.AUTH_TOKEN_ACCESS_TYPE,
      settings.AUTH_SCOPE,
      settings.AUTH_INCLUDE_GRANTED_SCOPES,
      settings.AUTH_USE_PKCE
    );
}

  /**
   * Get an OAuth2 access token from an OAuth2 Code.
   * 
   * @param {String} clientId - The ID of the app client
   * @param redirectUri A URL to redirect the user to after authenticating.
   *   This must be added to your app through the admin interface.
   * @param code An OAuth2 code.
   * 
   * @returns {Object} An object containing the token and related info (if applicable)
   */
export function getAuthTokenFromCode(client_id, redirectUri, authCode) {
  const config = {
    fetch,
    clientId: client_id,
  };

  const dbx_auth = new DropboxAuth(config);

  return dbx_auth.getAccessTokenFromCode(redirectUri, code)
}