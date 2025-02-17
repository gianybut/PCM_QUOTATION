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
      <div className="flex justify-center items-center m-0 p-0 header-comp">
        <Header></Header>
      </div>


      <div className="form-comp">
        <UserForm></UserForm>
        <PrintBtn></PrintBtn>
      </div>

      <div className="">
        <MainTable />
      </div>

  
        <ModeOfPayment></ModeOfPayment>
        <BottomText></BottomText>
        <Signature></Signature>
        <SigName></SigName>
    </div>
  );
};

export default App;
