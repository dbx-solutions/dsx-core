import * as settings from './constants.js'

export function getAuthUrl(dbxAuth, redirectUri) {
    return dbxAuth.getAuthenticationUrl(
      redirectUri,
      settings.AUTH_STATE,
      settings.AUTH_TYPE,
      settings.AUTH_TOKEN_ACCESS_TYPE,
      settings.AUTH_SCOPE,
      settings.AUTH_INCLUDE_GRANTED_SCOPES,
      settings.AUTH_USE_PKCE
    )
}

export function getAuthTokenFromCode(dbxAuth, redirectUri, authCode) {
  return dbxAuth.getAccessTokenFromCode(redirectUri, authCode);
}
