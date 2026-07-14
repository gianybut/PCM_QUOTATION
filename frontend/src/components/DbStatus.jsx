const DbStatus = ({ connected }) => {
  return (
    <div className="fixed bottom-2 right-2 non-printable flex items-center gap-1 text-xs bg-white/80 px-2 py-1 rounded shadow-sm z-50">
      <span
        className={`inline-block w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
      />
      <span className="text-gray-600">
        DB: {connected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
};

export default DbStatus;
