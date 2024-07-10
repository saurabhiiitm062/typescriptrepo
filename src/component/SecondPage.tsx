import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import DepartmentList from "./DepartmentList";

const SecondPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      //   alert("You must enter your details before accessing this page");
      document.write("You must enter your details before accessing this page");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <DataTable />
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
