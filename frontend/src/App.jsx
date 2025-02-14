import Table from "../src/components/Table";
import Header from "./components/Header";
import ModeOfPayment from "./components/PaymentDropdown";
import UserForm from "./components/UserForm";

const App = () => {
  return (
    <div className="">
      <div>
        <Header></Header>
      </div>
      <div>
        <UserForm></UserForm>
        <Table></Table>
      </div>
      <div>
        <ModeOfPayment></ModeOfPayment>
      </div>
    </div>
  );
};

export default App;
