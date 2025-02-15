import Table from "../src/components/Table";
import Header from "./components/Header";
import ModeOfPayment from "./components/PaymentDropdown";
import UserForm from "./components/UserForm";
import BottomText from "./components/BottomText";
import Signature from "./components/Signature";
import Footer from "./components/Footer";
import SigName from "./components/SigName";
const App = () => {
  return (
    <div className="app-container">
      <div className="flex justify-center items-center m-0 p-0 header-comp">
        <Header></Header>
      </div>


      <div className="form-comp">
        <UserForm></UserForm>
      </div>

      <div className="">
      <Table></Table>
      </div>

  
        <ModeOfPayment></ModeOfPayment>
        <BottomText></BottomText>
        <Signature></Signature>
        <SigName></SigName>
    </div>
  );
};

export default App;
