import React, { useState, useRef } from 'react';

const Signature = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // 1. Preview the image (optional but recommended):
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the data URL for preview
      };
      reader.readAsDataURL(file);

      // 2. Store the file object (for later upload):
      // You can store the file object directly in state, or if you are uploading right away,
      // you can send the file directly from here.
      // setImage(file); // If you're not previewing
    } else {
      setImage(null); // Clear preview if no file selected
    }
  };

  const handleUpload = () => {
    if (image) {
      // Here you would typically use `fetch` or `axios` to send the `image` to your server.
      // Example using fetch (replace with your actual API endpoint):

      const formData = new FormData();
      formData.append('image', image); // 'image' is the name your server expects

      fetch('/your-api-endpoint', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Image uploaded:', data);
          // Handle success (e.g., show a success message)
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          // Handle error (e.g., show an error message)
        });


      // If you are storing the file object instead of the dataURL:
      // const formData = new FormData();
      // formData.append('image', image); // 'image' is the name your server expects

      // fetch('/your-api-endpoint', {
      //   method: 'POST',
      //   body: formData,
      // })
      // ... (rest of the fetch code)
    } else {
      alert('Please select an image first.');
    }
  };


  const handleClear = () => {
    setImage(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = ''; // clear the input
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*" // Optional: restrict to image files
        onChange={handleImageChange}
        ref={fileInputRef} // ref for clearing the input
      />
      {image && (
        <div>
          <img src={image} alt="Preview" style={{ maxWidth: '300px' }} />
        </div>
      )}
      <button onClick={handleUpload} disabled={!image}>Upload</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default Signature;