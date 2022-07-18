import * as React from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import CssBaseline from '@mui/material/CssBaseline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Sidebar = (props) => {
    const {sidebarList} = props;
    const [open, setOpen] = React.useState(false);
    const [display, setdisplay] = React.useState('');
    const [text, setText] = React.useState('');
    const handleOpenSequence = () => 
    {
      setOpen(true);
      setdisplay('Sequence');
    };
    const handleOpenMessange = () => {
      setOpen(true);
      setdisplay('Message');
    };
    const handleText = (event)=>{
      event.preventDefault();
      setText(event.target.value);
    }

    const handleClose = () => setOpen(false);
    const clickModal = (event)=>{
      event.preventDefault();
      if(display ==='Sequence'){
        props.createSequence(text);
      }
      else{
        props.createMessage(text);
      }
      setText("");
    }

    let sl= null;
    if (sidebarList!==null)
    {
         sl = sidebarList.data.map((sidebar) => (
           <ListItemButton
             key={sidebar.id}
             onClick={(e) => {
               e.preventDefault();
               props.onClick(sidebar.id);
             }}
           >
             <ListItemIcon>
               <AssignmentIcon />
             </ListItemIcon>
             <ListItemText primary={sidebar.sequenceMenuName} />
           </ListItemButton>
         ));
    }

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        create
      </ListSubheader>
      <ListItemButton onClick={handleOpenSequence}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Sequence" />
      </ListItemButton>
      <ListItemButton onClick={handleOpenMessange}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Message" />
      </ListItemButton>
      <ListSubheader component="div" inset>
        Sequence List
      </ListSubheader>
      {sl}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create {display}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please Input {display}
          </Typography>
          <CssBaseline />
          <br></br>
          <TextField required label="Required" defaultValue="" onChange={handleText} value={text} />
          <CssBaseline />
          <br></br>
          <br></br>
          <Button 
            variant="contained" 
            endIcon={<SendIcon />}
            onClick={clickModal}
            >
            Send
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Sidebar;


/*
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItemButton>
    </React.Fragment>
*/