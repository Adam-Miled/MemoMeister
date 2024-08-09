import { GraphQLClient, gql } from 'graphql-request';

const API_KEY = process.env.REACT_APP_API_KEY;
const httpUrl = process.env.REACT_APP_BASE_URL;

const client = new GraphQLClient(httpUrl, {
  headers: {
    authorization: API_KEY ? `api-key ${API_KEY}` : '',
    'user-agent': 'MemoMeister Coding Challenge',
  },
});

const UPDATE_DOCUMENT = gql`
  mutation updateDocument($id: String!, $description: String, $labels: [String]) {
    updateDocument(input: { id: $id, description: $description, labels: $labels }) {
      document {
        id
        description
        labels
      }
    }
  }
`;

const MOVE_DOCUMENT_TO_FOLDER = gql`
  mutation moveDocumentToFolder($documentId: String!, $folderId: String!) {
    moveDocumentToFolder(input: { id: $documentId, folderId: $folderId }) {
      document {
        id
        folder {
          id
          name
        }
      }
    }
  }
`;

const MOVE_ITEMS_TO_BIN = gql`
  mutation moveItemsToBin($ids: [String]!) {
    moveItemsToBin(ids: $ids) {
      success
    }
  }
`;

const updateDocument = async (id, description, labels) => {
  try {
    const data = await client.request(UPDATE_DOCUMENT, { id, description, labels });
    return data.updateDocument.document;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

const moveDocumentToFolder = async (documentId, folderId) => {
  try {
    const data = await client.request(MOVE_DOCUMENT_TO_FOLDER, { documentId, folderId });
    return data.moveDocumentToFolder.document;
  } catch (error) {
    console.error('Error moving document to folder:', error);
    throw error;
  }
};

const deleteDocuments = async (ids) => {
  try {
    const data = await client.request(MOVE_ITEMS_TO_BIN, { ids });
    return data.moveItemsToBin.success;
  } catch (error) {
    console.error('Error deleting documents:', error);
    throw error;
  }
};

export { updateDocument, moveDocumentToFolder, deleteDocuments };