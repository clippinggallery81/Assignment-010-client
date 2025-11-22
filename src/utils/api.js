import { auth } from "../firebase/firebase.config";

// Helper function to get auth headers with Firebase token
export const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  return {
    "Content-Type": "application/json",
  };
};

// Helper function to make authenticated API requests
export const authenticatedFetch = async (url, options = {}) => {
  const headers = await getAuthHeaders();
  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
};
