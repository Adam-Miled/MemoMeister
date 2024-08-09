import { GraphQLClient, gql } from 'graphql-request';

const API_KEY = process.env.REACT_APP_API_KEY;
const httpUrl = process.env.REACT_APP_BASE_URL;

const client = new GraphQLClient(httpUrl, {
  headers: {
    authorization: API_KEY ? `api-key ${API_KEY}` : '',
    'user-agent': 'MemoMeister Coding Challenge',
  },
});

const CREATE_DOCUMENT_TEXT_MUTATION = `
  mutation createDocumentText($textContent: String!, $backgroundColor: String!) {
    createDocumentText(
      textContent: $textContent
      backgroundColor: $backgroundColor
    ) {
      id
      textContent
      textContentBackground
    }
  }
`;

const CREATE_DOCUMENT_FILE = gql`
  mutation createDocumentFile($file: Upload!) {
    createDocumentFile(file: $file) {
      id
      downloadUrl
    }
  }
`;

export async function createDocumentText(textContent, backgroundColor) {
  try {
    const variables = {
      textContent,
      backgroundColor,
    };
    const response = await client.request(CREATE_DOCUMENT_TEXT_MUTATION, variables);
    return response.createDocumentText;
  } catch (error) {
    console.error('Error creating document text:', error);
    throw error;
  }
}

export async function createFileDocument(file) {
  try {
    const variables = { file };
    const response = await client.request(CREATE_DOCUMENT_FILE, variables);
    return response.createDocumentFile;
  } catch (error) {
    console.error('Error creating file document:', error);
    throw error;
  }
}