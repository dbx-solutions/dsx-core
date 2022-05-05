export async function listMembers(dbx) {
  const response = await dbx.teamMembersListV2();
  const members = response.result.members;

  return members;
}