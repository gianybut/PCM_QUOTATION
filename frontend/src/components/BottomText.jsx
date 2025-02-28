import { useState } from "react";

const BottomText = () => {
  const [paragraph1, setParagraph1] =
    useState(`The prices stated at the time of the delivery shall apply.

The order must be subject to down payment of at least 50% of the total money, cash, gcash (0905-342-9588), or online bank transfer (007678005992 BDO). We are hoping to be in service with you.

The delivery fee shall be paid by the client.

There will be additional 6% payment for Sales Invoice and Official Receipt for total contracting price.

Thank you for giving us the opportunity to submit this offer and hoping to receive your valued order soonest. God bless you! More power!`);

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [newParagraph1Text, setNewParagraph1Text] = useState(paragraph1);

  const handleEditParagraph1 = () => {
    setIsModalOpen1(true);
  };

  const handleSaveParagraph1 = () => {
    setParagraph1(newParagraph1Text);
    setIsModalOpen1(false);
  };

  return (
    <div className="bottom-text break-inside-avoid">
      <div className="prose ">
        {/* Key change here */}
        <p className="m-10 whitespace-break-spaces leading-7 text-justify">
          {paragraph1}
        </p>
      </div>

      {/* Edit Button */}
      <button
        onClick={handleEditParagraph1}
        className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded mt-2 flex m-auto non-printable"
      >
        Edit Paragraph
      </button>

      {/* Paragraph 1 Modal */}
      {isModalOpen1 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-3/4 h-3/4">
            <textarea
              className="w-full h-full border border-gray-300 p-2 resize-none"
              value={newParagraph1Text}
              onChange={(e) => setNewParagraph1Text(e.target.value)}
            />
            <div className="mt-2">
              <button
                onClick={handleSaveParagraph1}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen1(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomText;
