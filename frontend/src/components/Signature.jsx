import { useState, useRef } from "react";

const Signature = () => {
  // Default image URL - replace with your default image path
  const defaultImage = "/api/placeholder/128/128";
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setImage(null); // Reset to default image instead of null
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    if (image && image !== defaultImage) {
      const formData = new FormData();
      formData.append("image", image);

      fetch("/your-api-endpoint", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Image uploaded:", data);
          handleClear();
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      alert("Please select a new image first.");
    }
  };

  return (
    <div className="p-4 border-none print:mt-30">
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="non-printable cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1a1 1 0 011-1h6a1 1 0 110 2H8a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>Choose Signature</span>
        </label>

        <div className="mt-2">
          <img
            src={image}
            className={`${
              image ? `size-32 ` : ""
            } border-hidden rounded object-contain bg-white`}
          />
        </div>
      </div>

      <div className="flex justify-baseline">
        <button
          onClick={handleClear}
          className="px-4 py-2 border rounded-sm bg-gray-100 hover:bg-gray-300 non-printable"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
};

export default Signature;
