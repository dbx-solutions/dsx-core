export async function createFolder(dbx, path, autoRename) {
	const response = await dbx.filesCreateFolderV2({path: path, autorename: autoRename});
	const createdFolder = response.result;

	return createdFolder;
}

export async function createFolderBatch(dbx, paths, autoRename) {
	const response = await dbx.filesCreateFolderBatch({paths: paths, autorename: autoRename})
	const createdFolders = response.result;

	return createdFolders;
}
