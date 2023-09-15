import React, { useEffect, useState } from "react";
import "./navBar.scss";
import { Link } from "react-router-dom";

//MUI
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Stack } from "@mui/material";
import Button1 from "../commun/Button1";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";

//Firebase
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../utils/authContext";

function NavBar() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [active, setActive] = useState(0);
  const [auth, setAuth] = useState(getAuth());
  const { logout } = useAuth();
  const user = auth ? auth.currentUser : null;

  useEffect(() => {}, [auth]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const titles = user
    ? [
        { title: "Home", section: "#announce", target: "_self" },
        { title: "Calendar", section: "/Calender", target: "_self" },
        { title: "Workshops", section: "#workshops", target: "_blank" },
        { title: "About", section: "#members", target: "_self" },
        { title: "Contact", section: "", target: "_self" },
      ]
    : [
        { title: "Home", section: "#announce", target: "_self" },
        { title: "Workshops", section: "#workshops", target: "_self" },
        { title: "About", section: "#members", target: "_self" },
        { title: "Contact", section: "", target: "_self" },
      ];
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer("right", false)}
      onKeyDown={toggleDrawer("right", false)}
    >
      {user && (
        <>
          <List>
            <ListItem>
              <Stack direction="row" spacing={2}>
                {user.photoURL ? (
                  <Avatar src={user?.photoURL} />
                ) : (
                  user.displayName && <Avatar>{user.displayName[0]}</Avatar>
                )}
                <ListItemText primary={user?.displayName} />
              </Stack>
            </ListItem>
            {["Profile", "Log out"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={
                    text == "Log out"
                      ? () => {
                          signOut(auth);
                          logout();
                          setAuth(null);
                        }
                      : () => {
                          console.log("profile");
                        }
                  }
                >
                  <ListItemIcon>
                    {index === 0 ? <AccountCircleIcon /> : <LogoutIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
      )}
      <List>
        {titles.map(({ title, section, targert }) => (
          <div key={title}>
            <ListItem disablePadding>
              <ListItemButton href={section}>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
        {!user && (
          <ListItem
            disablePadding
            sx={{ padding: "20px", display: "flex", justifyContent: "center" }}
          >
            <Link to="/login">
              <Button1 label="Login" />
            </Link>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <div className="navbar">
      <header>
        <div className="club-logo-container">
          <a href="#">
            <img
              src={require("../../assets/images/logo.png")}
              alt="GadzIT"
              id="club-logo"
            />
          </a>
        </div>
        <ul className="nav-links">
          {titles.map(({ title, section, target }, index) => (
            <li key={title}>
              <a
                href={section}
                taget={target}
                id={index == active ? "active" : "non-active"}
                onClick={() => setActive(index)}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>

        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <div>
              <div className="user-logo-container" {...bindToggle(popupState)}>
                {user ? (
                  user.photoURL ? (
                    <Avatar src={user.photoURL} sx={{ cursor: "pointer" }} />
                  ) : (
                    user.displayName && <Avatar>{user.displayName[0]}</Avatar>
                  )
                ) : (
                  <Link to="/login">
                    <Button1 label="Login" />
                  </Link>
                )}
              </div>
              {user && (
                <Popper {...bindPopper(popupState)} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={250}>
                      <Paper>
                        {["Profile", "Log out"].map((text, index) => (
                          <ListItem key={text} disablePadding>
                            <ListItemButton
                              onClick={
                                text == "Log out"
                                  ? () => {
                                      signOut(auth);
                                      logout();
                                      setAuth(null);
                                    }
                                  : () => {
                                      console.log("profile");
                                    }
                              }
                            >
                              <ListItemIcon>
                                {index === 0 ? (
                                  <AccountCircleIcon />
                                ) : (
                                  <LogoutIcon />
                                )}
                              </ListItemIcon>
                              <ListItemText primary={text} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              )}
            </div>
          )}
        </PopupState>

        <div className="menu-logo-container">
          <a href="#">
            <MenuIcon
              sx={{ color: "#fff" }}
              alt="menu"
              id="menu-logo"
              onClick={toggleDrawer("right", true)}
            />
          </a>
        </div>
      </header>
      <React.Fragment key={"right"}>
        <Drawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default NavBar;
