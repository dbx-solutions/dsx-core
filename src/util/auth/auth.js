import * as settings from './constants.js'

export function issueAuthUrl(dbxAuth, redirectUri) {
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

export function issueAuthTokenFromCode(dbxAuth, redirectUri, authCode) {
  const response = dbxAuth.getAccessTokenFromCode(redirectUri, authCode);
  const authToken = response.result.access_token;

  return authToken;
}
