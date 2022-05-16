export async function createFileRequest(dbx, fileRequest) {
	const response = await dbx.fileRequestsCreate(fileRequest);
	const createdFileRequest = response.result;

	return createdFileRequest;
}

export async function createFileRequestBatch(dbx, fileRequests) {
	const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
	[...fileRequests].reduce( (p, _, i) =>
			p.then(() => delay(Math.random() * 1000))
			 .then(() => createFileRequest(dbx, fileRequests[i]))
	, Promise.resolve());
}
