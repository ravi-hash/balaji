import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateHeaderLogo, updateAboutUsContent } from '../../../redux/slice/adminSlice';
import { Client, Storage, ID } from 'appwrite';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { toast } from 'react-toastify';
import './AdminController.scss';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('67cd705d00240a4d87ee'); // Your Project ID

const storage = new Storage(client);
const bucketId = '67cd74c3003bf8668e7f'; // Your Appwrite Bucket ID

const AdminController = () => {
  const [logo, setLogo] = useState(null);
  const [logoURL, setLogoURL] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const dispatch = useDispatch();

  // Fetch Firestore (About Us) & Appwrite (Logo)
  const fetchSettings = useCallback(async () => {
    try {
      // **Fetch About Us from Firestore**
      const footerRef = doc(db, 'settings', 'footer');
      const footerSnap = await getDoc(footerRef);
      if (footerSnap.exists()) {
        const footerContent = footerSnap.data().aboutUsContent;
        setAboutUs(footerContent);
        dispatch(updateAboutUsContent(footerContent));
      } else {
        console.log('No About Us content found.');
      }

      // **Fetch Logo from Appwrite**
      const fileList = await storage.listFiles(bucketId);
      if (fileList.total > 0) {
        const latestFile = fileList.files[fileList.total - 1]; // Get latest uploaded logo
        const fileURL = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${latestFile.$id}/view?project=67cd705d00240a4d87ee`;
        
        setLogoURL(fileURL);
        dispatch(updateHeaderLogo(fileURL));
      } else {
        console.log('No logo found in Appwrite.');
      }
      
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Handle File Selection for Logo
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  // Handle About Us Change
  const handleAboutUsChange = (e) => {
    setAboutUs(e.target.value);
  };

  // Upload Logo to Appwrite
  const uploadLogoToAppwrite = async () => {
    if (!logo) return;

    try {
      const response = await storage.createFile(bucketId, ID.unique(), logo);
      const fileURL = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${response.$id}/view?project=67cd705d00240a4d87ee`;

      setLogoURL(fileURL);
      dispatch(updateHeaderLogo(fileURL));
      toast.success('Logo uploaded successfully!');
    } catch (error) {
      console.error('Logo upload failed:', error);
      toast.error('Upload failed: ' + error.message);
    }
  };

  // Submit Handler for Both Logo and About Us
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload Logo to Appwrite
    if (logo) {
      await uploadLogoToAppwrite();
    }

    // Update About Us in Firestore
    if (aboutUs) {
      try {
        const footerRef = doc(db, 'settings', 'footer');
        await setDoc(footerRef, { aboutUsContent: aboutUs });
        dispatch(updateAboutUsContent(aboutUs));
        toast.success('About Us content updated successfully!');
      } catch (error) {
        console.error('Error updating About Us:', error);
        toast.error('Failed to update About Us content.');
      }
    }
  };

  return (
    <div className="admin-controller">
      <h2>Update Header Logo and About Us Content</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="logo">Header Logo:</label>
          <input type="file" id="logo" onChange={handleLogoChange} />
          {logoURL && <img src={logoURL} alt="Current Logo" style={{ width: '150px', marginTop: '10px' }} />}
        </div>
        <div>
          <label htmlFor="aboutUs">About Us Content:</label>
          <textarea
            id="aboutUs"
            value={aboutUs}
            onChange={handleAboutUsChange}
            rows={4}
            style={{ width: '100%' }}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default AdminController;
