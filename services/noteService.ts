import { ID, Models, Query } from "react-native-appwrite";
import databaseService from "./databaseService";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

//Appwrite database and collection id
const dbId = requiredEnv("EXPO_PUBLIC_APPWRITE_DB_ID");
const colId = requiredEnv("EXPO_PUBLIC_APPWRITE_COL_NOTES_ID");

const noteService = {
  async getNotes(user_id: string) {
    if (!user_id) {
      console.error("Error: Missing userId in getNotes()");
      return {
        data: [],
        error: "User ID is missing",
      };
    }

    try {
      const response = await databaseService.listDocuments(dbId, colId, [
        Query.equal("user_id", user_id),
      ]);
      return { data: response.data as Models.Document[], error: null };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching notes: ", error.message);
      }
    }

    // if (!Array.isArray(response)) {
    //   return { error: response.error };
    // }
  },

  async addNote(user_id: string, text: string) {
    if (!text) {
      return { error: "Note text cannot be empty" };
    }

    const data = {
      text: text,
      createdAt: new Date().toISOString(),
      user_id: user_id,
    };

    const response = await databaseService.createDocument(
      dbId,
      colId,
      data,
      ID.unique()
    );

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },

  async updateNote(id: string, text: string) {
    if (!text) {
      return { error: "Note text cannot be empty" };
    }
    const data = {
      text: text,
    };
    const response = await databaseService.updateDocument(
      dbId,
      colId,
      id,
      data
    );

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },

  async deleteNote(id: string) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }
    return { success: true };
  },
};

export default noteService;
