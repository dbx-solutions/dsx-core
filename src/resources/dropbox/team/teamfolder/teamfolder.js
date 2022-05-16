export async function createTeamFolder(dbx, name) {
	const response = await dbx.teamTeamFolderCreate({name: name});
	const createdTeamFolder = response.result;

	return createdTeamFolder;
}
