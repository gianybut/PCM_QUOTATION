import { useState } from "react";


// Edit text logic

const UserForm = () => {

  const [greeting, setGreeting] = useState("Dear Customer,");
  const [intro, setIntro] = useState("In the name of goodwill! We are pleased to quote you on your requirements for");

  const handleEditGreeting = () => {
    // Logic to open a prompt or modal to edit 'greeting'
    const newGreeting = prompt("Enter new greeting:", greeting);
    if (newGreeting) {
      setGreeting(newGreeting);
    }
  };

    const handleEditIntro = () => {
    // Logic to open a prompt or modal to edit 'intro'
    const newIntro = prompt("Enter new intro:", intro);
    if (newIntro) {
      setIntro(newIntro);
    }
  };


  return (
    <div className="flex flex-col space-y-3 m-10 px-5">
      {/* Name Field */}
      <div className="flex items-center space-x-3">
        <label htmlFor="name" className="w-24 font-semibold">Name</label>
        <input type="text" id="name" className="border-b-1 p-2 w-72 focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* Address Field */}
      <div className="flex items-center space-x-3">
        <label htmlFor="address" className="w-24 font-semibold">Address</label>
        <input type="text" id="address" className="border-b-1 p-2 w-72 focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* Date Field */}
      <div className="flex items-center space-x-3">
        <label htmlFor="date" className="w-24 font-semibold">Date</label>
        <input type="date" id="date" className="p-2 w-48 focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* Editable Text Field */}

      <div className="flex items-center"> {/* Use flexbox for horizontal layout */}
        <p className="font-bold mr-2">{greeting}</p> {/* Add margin for spacing */}
        <button onClick={handleEditGreeting} className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded non-printable">Edit</button>
      </div>

      <div className="flex items-center"> {/* Use flexbox for horizontal layout */}
        <p>{intro}</p>
        <button onClick={handleEditIntro} className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded ml-2 non-printable">Edit</button> {/* Add margin-left */}
      </div>

    </div>
  );
};

export default UserForm;
