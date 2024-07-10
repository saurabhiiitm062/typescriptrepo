import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./component/Form";
import SecondPage from "./component/SecondPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;
