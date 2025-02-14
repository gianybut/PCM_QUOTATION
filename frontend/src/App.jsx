import Table from "../src/components/Table";
import Header from "./components/Header";
import ModeOfPayment from "./components/PaymentDropdown";
import UserForm from "./components/UserForm";
import BottomText from "./components/BottomText";
import Signature from "./components/Signature";

const App = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center">
        <Header></Header>
      </div>
      <div>
        <UserForm></UserForm>
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
