import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SaveIcon from '@mui/icons-material/Save';
import { mainListItems, secondaryListItems } from "./listItems";
import { useEffect } from "react";
import mermaid from "mermaid";
import TextField from "@mui/material/TextField";
import Sidebar from "./sidebar";
import axios from "axios";
import { Button } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent(props) {
  const [open, setOpen] = React.useState(true);
  const [sequenceText, setsequenceText] = React.useState("");
  const [lastSequenceText, setlastSequenceText] = React.useState("");
  const [sidebarList, setsidebarList] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [sequenceMenuName, setsequenceMenuName] = React.useState(null);

  const getSidebar = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sequences");
      setsidebarList(response);
    } catch (e) {
      console.log(e);
    }
  };

  const getsequenceText = async (id) => {
    try {
      const response = await axios.get("http://localhost:8080/sequence/" + id);
      setId(response.data.id);
      setsequenceMenuName(response.data.sequenceMenuName);
      setsequenceText(response.data.diagramText);
    } catch (e) {
      console.log(e);
    }
  };

  const putSequenceText = async (id) => {
    try {
      let data ={
        id : id,
        sequenceMenuName: sequenceMenuName,
        sequenceText : sequenceText
      }
      const response = await axios.put("http://localhost:8080/sequence/" + id,data);
      setId(response.data.id);
      setsequenceMenuName(response.data.sequenceMenuName);
      setsequenceText(response.data.diagramText);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const nameInput = React.useRef();
  const insertSvg = function (svgCode) {
    nameInput.current.innerHTML = svgCode;
    setlastSequenceText(sequenceText);
    //console.log(svgCode);
  };
  const insertSvglastSequenceText = function (svgCode) {
    nameInput.current.innerHTML = svgCode;
    //console.log(svgCode);
  };
  const handleChange = (event) => {
    event.preventDefault();
    setsequenceText(event.target.value);
  };

  const handleClick = (id) => {
    getsequenceText(id);
  };
  
  const handleSave = (event)=>{
    event.preventDefault();
    putSequenceText(id);
  }
  useEffect(() => {
    console.log("맨 처음 렌더링될 때 한 번만 실행");
    getSidebar();
    mermaid.initialize({ startOnLoad: true });
  }, []);

  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");

    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  });

  useEffect(() => {
    try {
      mermaid.mermaidAPI.render("test", sequenceText, insertSvg);

    } catch (e) {
      console.log(e);
      try {
        mermaid.mermaidAPI.render("test", lastSequenceText, insertSvglastSequenceText);
      } catch(e){
        nameInput.current.innerHTML = '';
        console.log(e);
      }
    }
  }, [sequenceText]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {sequenceMenuName}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Sidebar sidebarList={sidebarList} onClick={handleClick}></Sidebar>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* mermaid diagram */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <div ref={nameInput} className="mermaid">
                    {sequenceText}
                  </div>
                </Paper>
              </Grid>
              {/* mermaid TextField */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    //height: 240,
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={11} sm={11}>
                    </Grid>
                    <Grid item xs={1} sm={1}>
                      <IconButton color="inherit" onClick={handleSave}>
                        <SaveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    label="sequenceText"
                    id="fullWidth"
                    multiline
                    value={sequenceText}
                  ></TextField>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard(props) {
  return <DashboardContent />;
}
