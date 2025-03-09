// Import Appwrite client and storage
import { Client, Storage } from "appwrite";

// Initialize Appwrite Client
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite Endpoint URL
  .setProject("67cd705d00240a4d87ee"); // Appwrite Project ID

// Initialize Storage
const storage = new Storage(client);

// Define the bucket ID for file operations
const bucketId = "67cd74c3003bf8668e7f"; // Appwrite Storage Bucket ID

// Export the storage instance and bucket ID for use in other files
export { storage, bucketId };
