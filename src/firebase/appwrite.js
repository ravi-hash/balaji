import { Client, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your endpoint
  .setProject("67cd705d00240a4d87ee"); // Your Project ID

const storage = new Storage(client);

export { storage };