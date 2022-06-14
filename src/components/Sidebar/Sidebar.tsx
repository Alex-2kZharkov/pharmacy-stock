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
  ClassOutlined,
  ConstructionOutlined,
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

import {
  selectIsSideBarExpanded,
  setIsSidebarExpanded,
} from "../../features/app/appSlice";
import { selectCurrentUser } from "../../features/app/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RoleTypes } from "../../types/common/role.types";

import { useStyles } from "./Sidebar.styles";

export const Sidebar = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSideBarExpanded = useAppSelector(selectIsSideBarExpanded);
  const { pathname } = useLocation();
  const currentUser = useAppSelector(selectCurrentUser);

  const collapseSidebar = () => dispatch(setIsSidebarExpanded(false));
  const expandSidebar = () => dispatch(setIsSidebarExpanded(true));

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
                {isSideBarExpanded && (
                  <ListItemText primary="Справочник товаров" />
                )}
              </ListItemButton>
            </ListItem>
            <ListItem component={Link} to="/medicine-categories">
              <ListItemButton
                className={clsx(classes.listItem, {
                  [classes.listItemClosed]: !isSideBarExpanded,
                  [classes.listItemActive]: pathname === "/medicine-categories",
                })}
              >
                <ListItemIcon>
                  <ClassOutlined />
                </ListItemIcon>
                {isSideBarExpanded && (
                  <ListItemText primary="Справочник категорий товаров" />
                )}
              </ListItemButton>
            </ListItem>
            <ListItem component={Link} to="/medicine-purchases">
              <ListItemButton
                className={clsx(classes.listItem, {
                  [classes.listItemClosed]: !isSideBarExpanded,
                  [classes.listItemActive]: pathname === "/medicine-purchases",
                })}
              >
                <ListItemIcon>
                  <AddShoppingCartOutlined />
                </ListItemIcon>
                {isSideBarExpanded && (
                  <ListItemText primary="Товары на складе" />
                )}
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
            <ListItem component={Link} to="/administrative-purchases">
              <ListItemButton
                className={clsx(classes.listItem, {
                  [classes.listItemClosed]: !isSideBarExpanded,
                  [classes.listItemActive]:
                    pathname === "/administrative-purchases",
                })}
              >
                <ListItemIcon>
                  <ConstructionOutlined />
                </ListItemIcon>
                {isSideBarExpanded && (
                  <ListItemText primary="Административные расходы" />
                )}
              </ListItemButton>
            </ListItem>
            {currentUser?.role?.name === RoleTypes.ADMIN && (
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
            )}

            <ListItem component={Link} to="/recommendations">
              <ListItemButton
                className={clsx(classes.listItem, {
                  [classes.listItemClosed]: !isSideBarExpanded,
                  [classes.listItemActive]: pathname === "/recommendations",
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
