import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";

const DepartmentListContainer = styled(List)({
  width: "100%",
  maxWidth: 360,
  border: "1px solid #ccc",

  backgroundColor: "#ffffff",
  borderRadius: "5px",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  overflow: "hidden",
  margin: "auto",
  marginTop: 60,
  minWidth: "100%",
  "@media (max-width: 600px)": {
    maxWidth: "100%",
  },
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: "8px 16px",
  border: "1px solid #black",

  "&.MuiListItem-button": {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
}));

const StyledCheckbox = styled(Checkbox)({
  color: "#1976d2",
});

// Define the mock data
const data = [
  {
    department: "Engineering",
    subDepartments: ["Software", "Hardware"],
  },
  {
    department: "Sales",
    subDepartments: ["Domestic", "International"],
  },
  {
    department: "Business And Services",
    subDepartments: [
      "Accounting and Accounting Services",
      "Auction",
      "Business Services - Genral",
    ],
  },
];

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleExpandClick = (department: string) => {
    setExpanded((prev) => ({ ...prev, [department]: !prev[department] }));
  };

  const handleSelect = (department: string, isSub: boolean = false) => {
    setSelected((prev) => {
      const newSelected = { ...prev, [department]: !prev[department] };
      if (!isSub) {
        data
          .find((d) => d.department === department)
          ?.subDepartments.forEach(
            (sub) => (newSelected[sub] = !prev[department])
          );
      } else {
        const parent = data.find((d) =>
          d.subDepartments.includes(department)
        )?.department;
        if (
          parent &&
          data
            .find((d) => d.department === parent)
            ?.subDepartments.every((sub) => newSelected[sub])
        ) {
          newSelected[parent] = true;
        } else if (parent) {
          newSelected[parent] = false;
        }
      }
      return newSelected;
    });
  };

  return (
    <DepartmentListContainer>
      {data.map((item) => (
        <div key={item.department}>
          <StyledListItem
            button // Ensure ListItem is registered as a button
            onClick={() => handleExpandClick(item.department)} // Handle expand click
            sx={{ pl: 4 }} // Moved the sx here for padding left
          >
            <StyledCheckbox
              checked={selected[item.department] || false}
              onChange={() => handleSelect(item.department)}
            />
            <ListItemText primary={item.department} />
            {expanded[item.department] ? <ExpandLess /> : <ExpandMore />}
          </StyledListItem>
          <Collapse in={expanded[item.department]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subDepartments.map((sub) => (
                <StyledListItem key={sub} button={false}>
                  <StyledCheckbox
                    checked={selected[sub] || false}
                    onChange={() => handleSelect(sub, true)}
                  />
                  <ListItemText primary={sub} />
                </StyledListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </DepartmentListContainer>
  );
};

export default DepartmentList;
