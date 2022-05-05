import express from 'express';
import { getAuthTokenFromCode, getAuthUrl } from './src/util/auth/auth.js';
import { createDbxAuth, createDbxAsTeam, createDbxAsUser } from './src/util/dbx/dbx.js';
import templates from './templates/templates.js';
import { createFolder, createFolderBatch } from './src/resources/dropbox/user/folder/folder.js';
import { createTagBatch } from './src/resources/dropbox/user/tag/tag.js';
import { createFileRequestBatch } from './src/resources/dropbox/user/fileRequest/fileRequest.js';
import { listMembers } from './src/resources/dropbox/team/member/member.js'

const clientId = '4jadbzm3a71wkfb';
const redirectUri = 'http://localhost:8080/auth';
const app = express();
const dbxAuth = createDbxAuth(clientId);
const token = 'sl.BHBnG2IxWgjUYr_kkmkANn-fkaie2Kv3_Lv7Vg-itijLMovqRfASwxNY9DZvonXyk5PbIO1o5KERBrf6FljrDDvOkl-caAcSrvkm96uYfC2JiynArvLWN-SKWVEFUReKo8QdH1Foe9fJ7tJVhk0';

app.get('/', (req, res) => {
  res.send('DSX Folder Templates')
});

app.get('/login', (req, res) => {
	getAuthUrl(dbxAuth, redirectUri).then((authUrl) => {
			console.log(authUrl)
			res.writeHead(302, { Location: authUrl });
			res.end();
	})
});

app.get('/auth', (req, res) => {
	const { code } = req.query;

	getAuthTokenFromCode(dbxAuth, redirectUri, code).then((response) => {
			console.log(response.result.access_token)
			res.writeHead(302, { Location: '/' });
			res.end();
	})
});

app.get('/members', (req, res) => {
	const dbx = createDbxAsTeam(token);
	listMembers(dbx).then((result) => {
		console.log(result.members)
	})
});

app.get('/template', (req, res) => {
	const userId = 'dbmid:AABJH7yGy0RdY_wQvDnc7Y6WDHa1rRpRGN4'
	const dbx = createDbxAsUser(token, userId);
	const template = templates.video_production;

	const rootName = 'Project Hummus';
	const rootPath = template.root.path + rootName;
	const {subFolderPaths, subFolderTags, subFolderFileRequests} = prepareSubFolders(rootPath, template.sub_folders);

	createFolder(dbx, rootPath, false)
	.then(() => {
		createFolderBatch(dbx, subFolderPaths, false)
		.then(() => {
			createTagBatch(dbx, subFolderTags)
		})
		.then(() => {
			createFileRequestBatch(dbx, subFolderFileRequests)
		})
	})
});

function prepareSubFolders(rootPath, subFolders) {
	let paths = [];
	let tags = [];
	let fileRequests = [];

	subFolders.forEach(subFolder => {
		const subFolderPath = rootPath + '/' + subFolder.name;
		const hasSubFolders = 'sub_folders' in subFolder;
		const hasTags = 'tags' in subFolder;
		const hasFileRequest = 'file_request' in subFolder;

		paths.push(subFolderPath);
		if (hasSubFolders) {
			const { subFolderPaths, subFolderTags, subFolderFileRequests } = prepareSubFolders(subFolderPath, subFolder.sub_folders);
			paths.push.apply(paths, subFolderPaths);
			tags.push.apply(tags, subFolderTags);
			fileRequests.push.apply(fileRequests, subFolderFileRequests);
		}

		if (hasTags) {
			subFolder.tags.forEach(tagName => {
				tags.push({
					path: subFolderPath,
					tag_text: tagName
				});
			})
		}

		if (hasFileRequest) {
			fileRequests.push({
				title: subFolder.file_request.title,
				destination: subFolderPath
			});
		}
	});

	return { subFolderPaths: paths, subFolderTags: tags, subFolderFileRequests: fileRequests };
}

app.listen(8080);