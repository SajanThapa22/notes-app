import { Data } from "@/types/notes";
import { database } from "./appwrite";

const databaseService = {
  //List documents
  async listDocuments(dbId: string, colId: string) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching documents:", error.message);
        return { error: error.message };
      } else {
        console.error("Unknown error fetching documents:", error);
        return { error: "An unknown error occurred" };
      }
    }
  },

  //Create documents
  async createDocument(dbId: string, colId: string, data: Data, id: string) {
    try {
      const document = await database.createDocument(dbId, colId, id, data);
      return document;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating document", error.message);
        return { error: error.message };
      }
    }
  },

  //Delete documents
  async deleteDocument(dbId: string, colId: string, id: string) {
    try {
      await database.deleteDocument(dbId, colId, id);
      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting document", error.message);
        return { error: error.message };
      }
    }
  },

  async updateDocument(dbId: string, colId: string, id: string, data: Data) {
    try {
      const document = await database.updateDocument(dbId, colId, id, data);
      return document;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating document", error.message);
        return { error: error.message };
      }
    }
  },
};

export default databaseService;
