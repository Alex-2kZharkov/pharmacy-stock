import {
  AdminPanelSettingsRounded,
  AssuredWorkloadOutlined,
  GridView,
  LocalPharmacyOutlined,
  PeopleOutlined,
  ShowChartOutlined,
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
          <ListItem component={Link} to="/">
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>
                <GridView />
              </ListItemIcon>
              <ListItemText primary="Главная" />
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} to="/medicines">
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>
                <LocalPharmacyOutlined />
              </ListItemIcon>
              <ListItemText primary="Товары" />
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} to="/employees">
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>
                <PeopleOutlined />
              </ListItemIcon>
              <ListItemText primary="Сотрудники" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>
                <ShowChartOutlined />
              </ListItemIcon>
              <ListItemText primary="Спрос" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>
                <AssuredWorkloadOutlined />
              </ListItemIcon>
              <ListItemText primary="Рекомендации" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Stack>
  );
};
