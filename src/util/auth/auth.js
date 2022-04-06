import { DropboxAuth } from 'dropbox';
import fetch from 'node-fetch';
import * as settings from './constants.js'

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
