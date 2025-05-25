import { Platform } from "react-native";
import { Client, Databases } from "react-native-appwrite";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

const config = {
  endpoint: requiredEnv("EXPO_PUBLIC_APPWRITE_ENDPOINT"),
  projectId: requiredEnv("EXPO_PUBLIC_APPWRITE_PROJECT_ID"),
  db: requiredEnv("EXPO_PUBLIC_APPWRITE_DB_ID"),
  col: { notes: requiredEnv("EXPO_PUBLIC_APPWRITE_COL_NOTES_ID") },
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

switch (Platform.OS) {
  case "ios":
    client.setPlatform(requiredEnv("EXPO_PUBLIC_APPWRITE_BUNDLE_ID"));
    break;
  case "android":
    client.setPlatform(requiredEnv("EXPO_PUBLIC_APPWRITE_PACKAGE_NAME"));
    break;
}

const database = new Databases(client);

export { client, config, database };
