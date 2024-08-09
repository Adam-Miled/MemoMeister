import { GraphQLClient, gql } from "graphql-request";

const API_KEY = process.env.REACT_APP_API_KEY;
const httpUrl = process.env.REACT_APP_BASE_URL;

const client = new GraphQLClient(httpUrl, {
  headers: {
    authorization: API_KEY ? `api-key ${API_KEY}` : "",
    "user-agent": "MemoMeister Coding Challenge",
  },
});

const MY_PROFILE_MINIMAL = gql`
  query MyUserMinimal {
    me {
      avatar
      fullName
    }
  }
`;

const MY_PROFILE_FULL = gql`
  query MyUserFull {
    me {
      id
      firstName
      lastName
      fullName
      avatar
      phoneNumber
      primaryEmail
      activeCompanyRole
    }
  }
`;

const fetchUserProfileMinimal = async () => {
  try {
    const data = await client.request(MY_PROFILE_MINIMAL);
    localStorage.setItem("userProfileMinimal", JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching minimal user profile:", error);
    throw error;
  }
};

const fetchUserProfileFull = async () => {
  try {
    const data = await client.request(MY_PROFILE_FULL);
    return data;
  } catch (error) {
    console.error("Error fetching full user profile:", error);
    throw error;
  }
};

export { fetchUserProfileMinimal, fetchUserProfileFull };
