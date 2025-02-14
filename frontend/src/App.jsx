import Table from "../src/components/Table";
import Header from "./components/Header";
import ModeOfPayment from "./components/PaymentDropdown";
import UserForm from "./components/UserForm";
import BottomText from "./components/BottomText";
import Signature from "./components/Signature";

const App = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center m-0 p-0 header-comp">
        <Header></Header>
      </div>


      <div className="form-comp">
        <UserForm></UserForm>
      </div>

      <div>
      <Table></Table>
      </div>

      <div>
        <ModeOfPayment></ModeOfPayment>
        <BottomText></BottomText>
        <Signature></Signature>
      </div>
    </div>
  );
};

export default App;
