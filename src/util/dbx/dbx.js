import fetch from 'node-fetch';
import { Dropbox, DropboxAuth } from 'dropbox';

export function createDbxAuth(clientId) {
	const config = {
		fetch,
		clientId: clientId,
	};

	return new DropboxAuth(config);
}

export function createDbxAsTeam(accessToken) {
	const config = {
		fetch,
		accessToken: accessToken,
	};

	return new Dropbox(config);
}

export function createDbxAsUser(accessToken, userId) {
	const config = {
		fetch,
		accessToken: accessToken,
		selectUser: userId,
	};

	return new Dropbox(config);
}
