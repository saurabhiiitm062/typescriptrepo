import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#d8edec",
  padding: "20px",
  backgroundSize: "cover", // Cover the entire box with the background image
  backgroundPosition: "center", // Center the background image
});

const StyledTextField = styled(TextField)({
  width: "100%",
  maxWidth: "400px",
  marginBottom: "20px",
  backgroundColor: "white", // White background for text fields
  borderRadius: "5px", // Rounded corners
  "& .MuiInputBase-root": {
    borderRadius: "5px", // Ensure input field has rounded corners
  },
});

const StyledButton = styled(Button)({
  marginTop: "20px",
  width: "100%",
  maxWidth: "200px",
  backgroundColor: "#b9aec2",
  color: "white",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
  "&:disabled": {
    backgroundColor: "#cccccc",
    color: "#666666",
  },
});

const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false); // State to track error display
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && phone && email) {
      localStorage.setItem("user", JSON.stringify({ name, phone, email }));
      navigate("/second-page");
    } else {
      setShowError(true); // Show error message if fields are empty
    }
  };

  return (
    <FormContainer>
      <StyledTextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <StyledTextField
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        margin="normal"
      />
      <StyledTextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      {showError && ( // Conditional rendering of error message
        <p>Please fill out all the necessary details</p>
      )}
      <StyledButton variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </StyledButton>
    </FormContainer>
  );
};

export default Form;
