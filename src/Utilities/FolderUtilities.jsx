import { GraphQLClient, gql } from "graphql-request";

const API_KEY = process.env.REACT_APP_API_KEY;
const httpUrl = process.env.REACT_APP_BASE_URL;

const client = new GraphQLClient(httpUrl, {
  headers: {
    authorization: API_KEY ? `api-key ${API_KEY}` : "",
    "user-agent": "MemoMeister Coding Challenge",
  },
});

const CREATE_FOLDER_MUTATION = `
  mutation CreateFolder($input: CreateFolderInputType!) {
    createFolder(input: $input) {
      id
      name
      description
      labels
      emoteIcon
    }
  }
`;

const UPDATE_FOLDER = gql`
  mutation UpdateFolder($input: FolderInputType!) {
    updateFolder(input: $input) {
      folder {
        id
        name
        description
        labels
      }
    }
  }
`;

const MOVE_FOLDERS_TO_BIN_MUTATION = `
  mutation MoveFoldersToBin($ids: [String]!) {
    moveItemsToBin(ids: $ids) {
      success
    }
  }
`;

async function createFolder(input) {
  try {
    const data = await client.request(CREATE_FOLDER_MUTATION, {
      input,
    });
    return data.createFolder;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
}

async function updateFolder(input) {
  try {
    const data = await client.request(UPDATE_FOLDER, { input });
    return data.updateFolder.folder;
  } catch (error) {
    console.error("Error updating folder:", error);
    throw error;
  }
}

async function moveFoldersToBin(ids) {
  try {
    const variables = { ids };
    const data = await client.request(MOVE_FOLDERS_TO_BIN_MUTATION, variables);
    return data.moveItemsToBin.success;
  } catch (error) {
    console.error('Error moving folders to bin:', error);
    throw error;
  }
}

export { createFolder, updateFolder, moveFoldersToBin};