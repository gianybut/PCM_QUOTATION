const PrintBtn = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="">
      <button
        onClick={handlePrint}
        className="bg-green-500 text-white p-2 rounded non-printable"
      >
        Print
      </button>
    </div>
  );
};

export default PrintBtn;
