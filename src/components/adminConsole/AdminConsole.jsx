import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi-browser";
import Button2 from "../commun/button2";
import "./adminConsole.scss";
import { ADMIN_PASSWORD, CELLS } from "../../utils/constants";
import { validate } from "../../utils/validation";

//MUI
import { Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//Firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { app, db } from "../../configs/firebaseConfig";
import { useAuth } from "../../utils/authContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const schema = {
  displayName: Joi.string().min(4).required().label("Full Name"),
  email: Joi.string().email().required().label("E-mail"),
  password: Joi.string().min(4).max(16).required().label("Password"),
  cell: Joi.string().required().label("Cell"),
};

function AdminConsole() {
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState(null);
  const [cell, setCell] = useState("Event");
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [key, setKey] = useState("");

  useEffect(() => {
    const getAdmin = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const mappedUsers = querySnapshot.docs.map((doc) => {
        return { uid: doc.id, ...doc.data() };
      });
      setUsers(mappedUsers);
    };
    getAdmin();
  }, []);

  const onSubmit = async (data) => {
    data["cell"] = cell;
    const err = validate(data, schema);
    data["addBy"] = "E97cmIp5pePtVaLtsq33laUr6kf2";
    data["subAdmin"] = false;
    data["admin"] = false;
    data["facebook"] = "";
    data["linkedin"] = "";
    data["instagram"] = "";
    data["role"] = "Member";
    data["description"] = "Hi there! i am a Gadz'IT member";
    data["bureau"] = false;
    setError(err);
    console.log(err);
    if (!err) {
      setUsersList([...usersList, data]);
    }
  };

  const pushUsers = async (list) => {
    console.log(list);
    const succesAdded = [];
    setLoading(true);
    for (let user of list) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(async (userCredentail) => {
          const { password, ...data } = user;
          await setDoc(doc(db, "users", userCredentail.user.uid), data)
            .then(() => {
              succesAdded.push(user.displayName);
            })
            .catch((error) => {
              deleteUser(userCredentail.user);
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setUsersList([]);
    setAddedUsers([...addedUsers, ...succesAdded]);
    setLoading(false);
  };
  if (key === ADMIN_PASSWORD)
    return (
      <div className="console">
        <div className="console__add-user">
          <div className="console__add-user__title">Add Member</div>
          <form
            className="console__add-user__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              error={error ? (error.displayName ? true : false) : false}
              id="outlined-error-helper-text"
              label="Full Name"
              variant="outlined"
              {...register("displayName")}
              helperText={error ? error.displayName : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <DriveFileRenameOutlineIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cell</InputLabel>
              <Select
                inputProps={{ "aria-label": "Without label" }}
                value={cell}
                label="Target"
                onChange={(event) => {
                  setCell(event.target.value);
                }}
                fullWidth
              >
                {CELLS.map(({ name, image }, index) => (
                  <MenuItem value={name} key={index}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={require(`../../assets/logo/${image}.ico`)}
                      ></Avatar>
                      <span>{name}</span>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              error={error ? (error.email ? true : false) : false}
              id="outlined-error-helper-text"
              label="E-mail"
              variant="outlined"
              {...register("email")}
              helperText={error ? error.email : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <TextField
              error={error ? (error.password ? true : false) : false}
              id="outlined-error-helper-text"
              label="Password"
              variant="outlined"
              {...register("password")}
              helperText={error ? error.password : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            {responseError && <Alert severity="error">{responseError}</Alert>}
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button2 type="submit" label="Add" />
            )}
          </form>
          <TableContainer sx={{ marginTop: 10 }} component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Display Name</StyledTableCell>
                  <StyledTableCell align="right">Cell</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Password</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersList.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.displayName}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.cell}</StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.password}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button onClick={() => pushUsers(usersList)}>Push Users</Button>
            )}
          </TableContainer>
          <div>
            <p>
              You added <strong>{addedUsers.length}</strong> members
            </p>
            <ul>
              {addedUsers.map((user, index) => (
                <li key={index}>{user}s</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="console__manage-users">
          <div className="console__add-user__title">Manage Members</div>
        </div>
      </div>
    );
  else {
    return (
      <input
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="admin key..."
        type="password"
      />
    );
  }
}

export default AdminConsole;
