import Header from "./components/Header";
import ModeOfPayment from "./components/PaymentDropdown";
import UserForm from "./components/UserForm";
import BottomText from "./components/BottomText";
import Signature from "./components/Signature";
import SigName from "./components/SigName";
import PrintBtn from "./components/PrintBtn";
import MainTable from "./components/MainTable";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <UserForm />
      <MainTable />
      <ModeOfPayment />
      <BottomText />
      <Signature />
      <SigName />
    </div>
  );
};

export default App;
