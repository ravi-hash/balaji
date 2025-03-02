import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateHeaderLogo, updateAboutUsContent } from '../../../redux/slice/adminSlice';
import { storage, db } from '../../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './AdminController.scss';

const AdminController = () => {
  const [logo, setLogo] = useState(null);
  const [aboutUs, setAboutUs] = useState('');
  const dispatch = useDispatch();

  // Fetch the logo and aboutUs content from Firestore
  const fetchSettingsFromFirestore = useCallback(async () => {
    const logoRef = doc(db, 'settings', 'header');
    const footerRef = doc(db, 'settings', 'footer');

    const logoSnap = await getDoc(logoRef);
    const footerSnap = await getDoc(footerRef);

    if (logoSnap.exists()) {
      const logoURL = logoSnap.data().logoURL;
      dispatch(updateHeaderLogo(logoURL));
    } else {
      console.log('No logo found in Firestore.');
    }

    if (footerSnap.exists()) {
      const footerContent = footerSnap.data().aboutUsContent;
      setAboutUs(footerContent);
    }
  }, [dispatch]);

  // Fetch settings on component mount
  useEffect(() => {
    fetchSettingsFromFirestore();
  }, [fetchSettingsFromFirestore]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  const handleAboutUsChange = (e) => {
    setAboutUs(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update Logo
    if (logo) {
      const storageRef = ref(storage, `headerLogos/${logo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, logo);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: Track upload progress if needed
        },
        (error) => {
          toast.error('Logo upload failed: ' + error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const logoRef = doc(db, 'settings', 'header');
          await setDoc(logoRef, { logoURL: downloadURL });
          dispatch(updateHeaderLogo(downloadURL));
          toast.success('Logo updated successfully!');
        }
      );
    }

    // Update About Us Content
    if (aboutUs) {
      const footerRef = doc(db, 'settings', 'footer');
      await setDoc(footerRef, { aboutUsContent: aboutUs });
      dispatch(updateAboutUsContent(aboutUs));
      toast.success('About Us content updated successfully!');
    }
  };

  return (
    <div className="admin-controller">
      <h2>Update Header Logo and About Us Content</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="logo">Header Logo:</label>
          <input type="file" id="logo" onChange={handleLogoChange} />
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
