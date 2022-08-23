export async function listSharedLinks(dbx) {
	const response = await dbx.sharingListSharedLinks();

	return response.result.links;
}
