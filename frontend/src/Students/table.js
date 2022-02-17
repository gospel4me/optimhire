import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { createStyles, makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";


function createData(students, score) {
  return { students, score };
}
const useStyles = makeStyles(
  createStyles({
    name: { "font-size": "50px" },
  })
);

const rows = [createData("students", ""), createData("score", "")].sort(
  (a, b) => (a.students < b.score ? -1 : 1)
);

const blue = {
  200: "#A5D8FF",
  400: "#3399FF",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 6px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : grey[100]};
  }
  `
);

const CustomTablePagination = styled(TablePaginationUnstyled)(
  ({ theme }) => `
  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }
  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }
  & .MuiTablePaginationUnstyled-select {
    padding: 2px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    border-radius: 50px;
    background-color: transparent;
    &:hover {
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    }
    &:focus {
      outline: 1px solid ${
        theme.palette.mode === "dark" ? blue[400] : blue[200]
      };
    }
  }
  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }
  & .MuiTablePaginationUnstyled-actions {
    padding: 2px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    border-radius: 50px;
    text-align: center;
  }
  & .MuiTablePaginationUnstyled-actions > button {
    margin: 0 8px;
    border: transparent;
    border-radius: 2px;
    background-color: transparent;
    &:hover {
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    }
    &:focus {
      outline: 1px solid ${
        theme.palette.mode === "dark" ? blue[400] : blue[200]
      };
    }
  }
  `
);

export default function UnstyledTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isNameFocused, setIsNamedFocused] = React.useState(false);
  const [name, setName] = React.useState("");
  const classes = useStyles(props);
  const [students, setStudents] = useState(null);
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);

  const getStudents = async () => {
    const URL = `http://localhost:5000/api/students/`;
    const res = await axios.get(URL);
    return res.data;
  };

  useEffect(() => {
    try {
      getStudents().then((data) => {
        console.log(data.data);
        setStudents(data.data);
        
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const findAverageAge = (arr) => {
    const { length } = arr;
    return arr.reduce((acc, val) => {
      return acc + val.score / length;
    }, 0);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
const handleUpdateScore =(score,id)=>{
  const scoreUpdate=localStorage.getItem('studentData')
  const newArr = scoreUpdate?.map(obj => {
    if (obj._id === id) {
      const newStudent= {...obj, score:score};
      setStudents(newStudent)

    }
    });  

}

  return (
    <Root sx={{ width: 500, maxWidth: "100%", margin: "10% auto" }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>Students</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {!students
            ? "No Data Available"
            : students.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td style={{ width: 120 }} align="right">
                    {isNameFocused ? (
                      <Typography
                        className={classes.name}
                        onClick={() => {
                          setIsNamedFocused(true);
                        }}
                      >
                        {row.score}
                      </Typography>
                    ) : (
                      <TextField
                        autoFocus
                        inputProps={{ className: classes.name }}
                        value={name?name:row.score}
                        onChange={(event) =>handleUpdateScore(event.target.value, row._id)}
                        onBlur={(event) => setIsNamedFocused(false)}
                      />
                    )}{}
                  </td>
                </tr>
              ))}
          <tr>
            <td> Average:</td>
            <td> {students ? findAverageAge(students) : "loading..."}</td>
          </tr>

          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </tbody>

        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              componentsProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
     
 
       </tfoot>
      </table>
    </Root>
  );
}
