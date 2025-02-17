import Header from "./components/Header.jsx";
import ModeOfPayment from "./components/PaymentDropdown.jsx";
import UserForm from "./components/UserForm.jsx";
import BottomText from "./components/BottomText.jsx";
import Signature from "./components/Signature.jsx";
import SigName from "./components/SigName.jsx";
import PrintBtn from "./components/PrintBtn.jsx";
import MainTable from "./components/MainTable.jsx";
import ProductModal from "./components/ProductModal.jsx";
import AddNewProduct from "./components/AddNewProduct.jsx";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <UserForm />

      <div className="flex flex-col justify-center items-center">
        <AddNewProduct />
      </div>

      <MainTable />
      <ModeOfPayment />
      <BottomText />
      <Signature />
      <SigName />
    </div>
  );
};

export default App;
