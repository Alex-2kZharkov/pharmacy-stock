import { People, Drafts, Medication } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useStyles } from "./Sidebar.styles";

export const Sidebar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.sidebar}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem component={Link} to="/medicines">
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>
                <Medication />
              </ListItemIcon>
              <ListItemText primary="Лекарства" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Сотрудники" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>
                <Drafts />
              </ListItemIcon>
              <ListItemText primary="Сотрудники" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>
                <Drafts />
              </ListItemIcon>
              <ListItemText primary="Сотрудники" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>
                <Drafts />
              </ListItemIcon>
              <ListItemText primary="Сотрудники" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>
                <Drafts />
              </ListItemIcon>
              <ListItemText primary="Сотрудники" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};
