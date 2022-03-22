import {
  AdminPanelSettingsRounded,
  People,
  Drafts,
  Medication,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useStyles } from "./Sidebar.styles";

export const Sidebar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleTitleClick = () => navigate("/");

  return (
    <Stack spacing={2} className={classes.sidebar}>
      <Stack
        direction="row"
        alignItems="center"
        className={classes.panel}
        onClick={handleTitleClick}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          className={classes.panelIconContainer}
        >
          <AdminPanelSettingsRounded className={classes.panelIcon} />
        </Stack>
        <div className={classes.panelTitle}>Админ Панель</div>
      </Stack>
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
          <ListItem component={Link} to="/employees">
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
    </Stack>
  );
};
