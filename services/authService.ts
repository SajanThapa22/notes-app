import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

interface ErrorResponse {
  error: string;
}

const authService = {
  // Register a user
  async register(
    email: string,
    password: string
  ): Promise<Models.User<Models.Preferences> | ErrorResponse | undefined> {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: error.message || "Registration failed. Please try again.",
        };
      }
    }
  },

  // Login
  async login(
    email: string,
    password: string
  ): Promise<Models.Session | ErrorResponse> {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return {
          error:
            error.message || "Login failed. Please check your credentials.",
        };
      }
      return { error: "Unknown error occurred during login." };
    }
  },
  // Get logged-in user
  async getUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },

  // Logout user
  async logout(): Promise<void | ErrorResponse> {
    try {
      await account.deleteSession("current");
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: error.message || "Failed to logout. Please try again.",
        };
      }
    }
  },
};

export default authService;
