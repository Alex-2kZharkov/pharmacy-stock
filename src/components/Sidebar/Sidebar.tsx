import { useState } from "react";

import {
  AddShoppingCartOutlined,
  AttachMoneyOutlined,
  DoubleArrowOutlined,
  AdminPanelSettingsRounded,
  ArrowBackIosNewOutlined,
  AssuredWorkloadOutlined,
  GridView,
  LocalPharmacyOutlined,
  PeopleOutlined,
  ShowChartOutlined,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import clsx from "clsx";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useStyles } from "./Sidebar.styles";

export const Sidebar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(true);
  const { pathname } = useLocation();

  const collapseSidebar = () => setIsSideBarExpanded(false);
  const expandSidebar = () => setIsSideBarExpanded(true);

  const collapseButton = (
    <ListItem onClick={collapseSidebar} className={classes.sidebarDisplayItem}>
      <ListItemButton className={classes.listItem}>
        <ListItemIcon>
          <ArrowBackIosNewOutlined />
        </ListItemIcon>
        <ListItemText primary="Скрыть" />
      </ListItemButton>
    </ListItem>
  );

  const expandButton = (
    <ListItem onClick={expandSidebar} className={classes.sidebarDisplayItem}>
      <ListItemButton
        className={clsx(classes.listItem, classes.listItemClosed)}
      >
        <Tooltip title="Раскрыть">
          <ListItemIcon>
            <DoubleArrowOutlined />
          </ListItemIcon>
        </Tooltip>
      </ListItemButton>
    </ListItem>
  );

  const handleTitleClick = () => navigate("/");

  return (
    <Collapse
      orientation="horizontal"
      in={isSideBarExpanded}
      collapsedSize={100}
    >
      <Stack
        spacing={2}
        className={clsx(classes.sidebar, {
          [classes.sideBarClosed]: !isSideBarExpanded,
        })}
      >
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
          {isSideBarExpanded && (
            <div className={classes.panelTitle}>Админ Панель</div>
          )}
        </Stack>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem component={Link} to="/">
              <ListItemButton
                className={clsx(classes.listItem, {
                  [classes.listItemClosed]: !isSideBarExpanded,
                  [classes.listItemActive]: pathname === "/",
                })}
              >
                <ListItemIcon>
                  <GridView />
                </ListItemIcon>
                {isSideBarExpanded && <ListItemText primary="Главная" />}
              </ListItemButton>
            </ListItem>
            <ListItem component={Link} to="/medicines">
              <ListItemButton
                className={clsx(classes.listItem, {
                  [classes.listItemClosed]: !isSideBarExpanded,
                  [classes.listItemActive]: pathname === "/medicines",
                })}
              >
                <ListItemIcon>
                  <LocalPharmacyOutlined />
                </ListItemIcon>
                {isSideBarExpanded && <ListItemText primary="Товары" />}
              </ListItemButton>
            </ListItem>
            <ListItem component={Link} to="/medicine-sales">
              <ListItemButton
                className={clsx(classes.listItem, {
                  [classes.listItemClosed]: !isSideBarExpanded,
                  [classes.listItemActive]: pathname === "/medicine-sales",
                })}
              >
                <ListItemIcon>
                  <AttachMoneyOutlined />
                </ListItemIcon>
                {isSideBarExpanded && <ListItemText primary="Продажи" />}
              </ListItemButton>
            </ListItem>
            <ListItem component={Link} to="/medicine-purchases">
              <ListItemButton
                className={clsx(classes.listItem, {
                  [classes.listItemClosed]: !isSideBarExpanded,
                })}
              >
                <ListItemIcon>
                  <AddShoppingCartOutlined />
                </ListItemIcon>
                {isSideBarExpanded && (
                  <ListItemText primary="Расходы на товары" />
                )}
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                className={clsx(classes.listItem, {
                  [classes.listItemClosed]: !isSideBarExpanded,
                })}
              >
                <ListItemIcon>
                  <ShowChartOutlined />
                </ListItemIcon>
                {isSideBarExpanded && (
                  <ListItemText primary="Административные расходы" />
                )}
              </ListItemButton>
            </ListItem>
            <ListItem component={Link} to="/employees">
              <ListItemButton
                className={clsx(classes.listItem, {
                  [classes.listItemClosed]: !isSideBarExpanded,
                  [classes.listItemActive]: pathname === "/employees",
                })}
              >
                <ListItemIcon>
                  <PeopleOutlined />
                </ListItemIcon>
                {isSideBarExpanded && <ListItemText primary="Сотрудники" />}
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                className={clsx(classes.listItem, {
                  [classes.listItemClosed]: !isSideBarExpanded,
                })}
              >
                <ListItemIcon>
                  <AssuredWorkloadOutlined />
                </ListItemIcon>
                {isSideBarExpanded && <ListItemText primary="Рекомендации" />}
              </ListItemButton>
            </ListItem>
            {isSideBarExpanded ? collapseButton : expandButton}
          </List>
        </nav>
      </Stack>
    </Collapse>
  );
};
