export async function createTag(dbx, tag) {
	const response = await dbx.filesTagsAdd(tag);
	const createdTag = response.result;

	return createdTag;
}

export async function createTagBatch(dbx, tags) {
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	[...tags].reduce(
		(p, _, i) =>
			p
				.then(() => delay(Math.random() * 1000))
				.then(() => createTag(dbx, tags[i])),
		Promise.resolve()
	);
}
