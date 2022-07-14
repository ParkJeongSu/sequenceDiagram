import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';


const Sidebar = (props) => {
    const {sidebarList} = props;
    
    let sl;
    if (sidebarList!==null){
         sl = sidebarList.data.map((sidebar) => (
            <ListItemButton key={sidebar.id} onClick={ ( e )=>{e.preventDefault(); props.onClick(sidebar.id); }   } >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={sidebar.sequenceMenuName} />
            </ListItemButton>
          ));
    }

  return (
    <React.Fragment>
        {sl}
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