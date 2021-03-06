import { useState, SyntheticEvent } from "react";

import { AdminPanelSettingsRounded } from "@mui/icons-material";
import { Alert, Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import clsx from "clsx";
import { Formik, Form, Field, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import { useNavigate } from "react-router-dom";

import { LOCAL_STORAGE_CURRENT_USER_PROPERTY } from "../../constants/names.constants";
import { useLazyLoginQuery } from "../../services/api/user.api";
import { useAppDispatch } from "../../store/hooks";
import { setCredentials } from "../app/authSlice";

import { loginValidationSchema } from "./Login.schema";
import { useStyles } from "./Login.styles";

export const Login = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { error }] = useLazyLoginQuery();
  const [open, setOpen] = useState(false);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = async (values: FormikValues) => {
    try {
      const {
        access_token,
        user: { _doc: currentUser },
      } = await login({
        username: values.email,
        password: values.password,
      }).unwrap();

      const credentials = { token: access_token, user: currentUser };
      localStorage.setItem(
        LOCAL_STORAGE_CURRENT_USER_PROPERTY,
        JSON.stringify(credentials)
      );

      dispatch(setCredentials(credentials));
      navigate("/");
    } catch {
      setOpen(true);
    }
  };

  return (
    <>
      {" "}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.page}
      >
        <Box className={classes.container}>
          <Stack alignItems="center" spacing={1}>
            <Box className={classes.panelIconContainer}>
              <AdminPanelSettingsRounded className={classes.panelIcon} />
            </Box>
            <div className={classes.panelTitle}>?????????? ????????????</div>
          </Stack>
          <Typography
            variant="h5"
            className={classes.loginTitle}
            style={{
              fontWeight: 500,
              marginTop: 24,
            }}
          >
            ?????????? ?? ?????????? ????????????
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.loginSubTitle}
            style={{ fontWeight: 200 }}
          >
            ?????????????? ?????? email ?? ???????????? ????????
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={submitHandler}
            validationSchema={loginValidationSchema}
          >
            {() => {
              return (
                <Form className={classes.form}>
                  <Typography
                    variant="subtitle1"
                    className={classes.label}
                    style={{ fontWeight: 700 }}
                  >
                    EMAIL
                  </Typography>
                  <Field
                    className={clsx(classes.filledInput, {
                      [classes.errorField]: !!error,
                    })}
                    style={{ borderColor: "#F0F1F7 !important" }}
                    autoFocus
                    id="email"
                    name="email"
                    placeholder="Email ??????????"
                    fullWidth
                    variant="outlined"
                    component={TextField}
                    margin="dense"
                    isError={!!error}
                  />
                  <Typography
                    variant="subtitle1"
                    className={classes.label}
                    style={{ fontWeight: 700 }}
                  >
                    ????????????
                  </Typography>
                  <Field
                    type="password"
                    className={clsx(classes.filledInput, {
                      [classes.errorField]: !!error,
                    })}
                    id="password"
                    name="password"
                    placeholder="????????????"
                    fullWidth
                    variant="outlined"
                    component={TextField}
                    margin="dense"
                  />
                  <Button
                    className={classes.loginButton}
                    variant="contained"
                    type="submit"
                  >
                    ??????????
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Stack>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        key="bottomcenter"
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
          elevation={12}
        >
          ???? ?????????????? ?????????? ?? ???????????? ??????????????. ????????????????????, ?????????????????? ????????????????????????
          ?????????????????? ????????????
        </Alert>
      </Snackbar>
    </>
  );
};
