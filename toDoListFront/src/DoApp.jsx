import ToDoList from "./components/ToDoList";
import "./css/doApp.css";

const DoApp = () => {
  return (
    <>
      <h1 className="text-start">Notes</h1>

      <div className="container">
        <ToDoList />
      </div>
    </>
  );
};

export default DoApp;
