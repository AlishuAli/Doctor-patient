
import React, { useState } from 'react';
import { storage, database } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; 
function Contact() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(''); 

  const handleEvent = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
     
      const imgRef = ref(storage, `files/${uuidv4()}`);
      await uploadBytes(imgRef, file);

     
      const fileUrl = await getDownloadURL(imgRef);

     
      const data = collection(database, 'fileUploads');
      await addDoc(data, { description, imageUrl: fileUrl });

      alert('File uploaded successfully with description!');
      setFile(null);
      setDescription(''); 
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  return (
    <div  class="upload">
      <h1>Upload Img</h1>
      <input
        type='file'
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        type='text'
        placeholder='Enter description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleEvent}>Upload</button>
    </div>
  );
}

export default Contact;


