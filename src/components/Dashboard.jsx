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
import { useEffect } from "react";
import mermaid from "mermaid";
import TextField from "@mui/material/TextField";
import Sidebar from "./sidebar";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
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
  const [messageList, setMessageList] = React.useState([]);

  const [messageId, setMessageId] = React.useState(null);
  const [messageExampleContent, setMessageExampleContent] = React.useState("");
  const [messageDescription, setMessageDescription] = React.useState("");
  let ServerAddress = "http://localhost:8080";
  const nameInput = React.useRef();
  const useStyles = makeStyles({
    white:{
      backgroundColor:'white'
    }
  });
  const classes = useStyles();

  const getSidebar = async () => {
    try {
      const response = await axios.get(ServerAddress+"/sequences");
      setsidebarList(response);
    } catch (e) {
      console.log(e);
    }
  };

  const getsequenceText = async (id) => {
    try {
      const response = await axios.get(ServerAddress+"/sequence/" + id);
      setId(response.data.id);
      setsequenceMenuName(response.data.sequenceMenuName);
      setsequenceText(response.data.diagramText === null ? '' :response.data.diagramText );
      setlastSequenceText(response.data.diagramText === null ? '' :response.data.diagramText);
    } catch (e) {
      console.log(e);
    }
  };

  const putSequenceText = async (id) => {
    try {
      let data ={
        id : messageId,
        sequenceMenuName: sequenceMenuName,
        sequenceText : sequenceText
      }
      const response = await axios.put(ServerAddress+"/sequence/" + id,data);
      setId(response.data.id);
      setsequenceMenuName(response.data.sequenceMenuName);
      setsequenceText(response.data.diagramText);
    } catch (e) {
      console.log(e);
    }
  };

  const putMessageDefinition = async (messageId) => {
    try {
      let data ={
        id : messageId,
        messageExampleContent: messageExampleContent,
        messageDescription : messageDescription
      }
      const response = await axios.put(ServerAddress+"/message/" + messageId,data);
      setMessageId(response.data.id);
      setMessageExampleContent(response.data.exampleMessageContent);
      setMessageDescription(response.data.messageDescription);
    } catch (e) {
      console.log(e);
    }
  };

  const createSequenceMenuName = async (sequenceMenuName) => {
    try {
      let data ={
        sequenceMenuName: sequenceMenuName
      }
      const response = await axios.post(ServerAddress+"/sequence/",data);
      setsidebarList(response);
    } catch (e) {
      console.log(e);
    }
  };

  const createMessageName = async (messageName) => {
    try {
      let data ={
        messageName: messageName
      }
      const response = await axios.post(ServerAddress+"/message/",data);
      setMessageList(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getMessageList = async () => {
    try {
      const response = await axios.get(ServerAddress+"/messages/");
      setMessageList(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  
  const getMessagebyMessageName = async (messageName) => {
    try {
      if (messageName==="")
      {
        setMessageId("");
        setMessageExampleContent("");
        setMessageDescription("");
      }
      else
      {
        const response = await axios.get(ServerAddress+"/message/"+messageName);
        setMessageId(response.data.id);
        setMessageExampleContent(response.data.exampleMessageContent ===null ? "" : response.data.exampleMessageContent);
        setMessageDescription(response.data.messageDescription=== null ? "" : response.data.messageDescription);
        console.log(response);
      }
      
    } catch (e) {
      console.log(e);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  
  const insertSvg = function (svgCode) {
    nameInput.current.innerHTML = svgCode;
    setlastSequenceText(sequenceText);
    console.log(svgCode);
  };
  const insertSvglastSequenceText = function (svgCode) {
    nameInput.current.innerHTML = svgCode;
    console.log(svgCode);
  };
  const handleChange = (event) => {
    event.preventDefault();
    setsequenceText(event.target.value);
  };

  const handelChangeExampleMessageContent = (event)=>{
    event.preventDefault();
    setMessageExampleContent(event.target.value);
  }

  const handelChangeMessageDescription = (event)=>{
    event.preventDefault();
    setMessageDescription(event.target.value)
  }

  const handleClick = (id) => {
    getsequenceText(id);
  };
  
  const handleSave = (event)=>{
    event.preventDefault();
    putSequenceText(id);
  }

  const handleSelected = (event) =>{
    event.preventDefault();
    getMessagebyMessageName(event.target.textContent);
  }

  const handleSaveMessageDefinition = (event)=>{
    event.preventDefault();
    putMessageDefinition(messageId);
  }

  useEffect(() => {
    console.log("맨 처음 렌더링될 때 한 번만 실행");
    getSidebar();
    getMessageList();
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
      mermaid.mermaidAPI.render("diagram", sequenceText, insertSvg);

    } catch (e) {
      console.log(e);
      try {
        mermaid.mermaidAPI.render("diagram", lastSequenceText, insertSvglastSequenceText);
      } catch(e){
        nameInput.current.innerHTML = "sequenceDiagram";
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
            <Stack spacing={2} sx={{ width: 300 }} className={classes.white}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={messageList.map((message) => message.messageName)}
              onChange={handleSelected}
              renderInput={(params) => (
                <TextField {...params} label="messageName" />
              )}
            />
            </Stack>
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
            <Sidebar
              sidebarList={sidebarList}
              onClick={handleClick}
              createSequence={createSequenceMenuName}
              createMessage={createMessageName}
            ></Sidebar>
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

          <Container
            maxWidth="lg"
            sx={{ mt: 4, mb: 4 }}
          >
            <Grid container spacing={3}>
              {/* mermaid diagram */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <div ref={nameInput} className="mermaid"
                  >
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
                    <Grid item xs={11} sm={11}></Grid>
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
            
          </Container>
          {/* Message Definition */}
          <Container
            maxWidth="lg"
            sx={{ mt: 4, mb: 4 }}
          >
            <Grid container spacing={3}>
              {/* Message Example Content */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Grid container spacing={1}>
                    <Grid item xs={11} sm={11}></Grid>
                    <Grid item xs={1} sm={1}>
                      <IconButton color="inherit" onClick={handleSaveMessageDefinition}>
                        <SaveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    onChange={handelChangeExampleMessageContent}
                    label="Message Example Content"
                    id="fullWidth"
                    multiline
                    value={messageExampleContent}
                  ></TextField>
                </Paper>
              </Grid>
              {/* Message Description */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={11} sm={11}></Grid>
                    <Grid item xs={1} sm={1}>
                      <IconButton color="inherit" onClick={handleSaveMessageDefinition}>
                        <SaveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    onChange={handelChangeMessageDescription}
                    label="Message Description"
                    id="fullWidth"
                    multiline
                    value={messageDescription}
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
