import { AdminPanelSettingsRounded } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import { useStyles } from "./Login.styles";

export const Login = () => {
  const classes = useStyles();

  return (
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
          <div className={classes.panelTitle}>Админ Панель</div>
        </Stack>
        <Typography
          variant="h5"
          className={classes.loginTitle}
          style={{
            fontWeight: 500,
            marginTop: 24,
          }}
        >
          Войти в Админ Панель
        </Typography>
        <Typography
          variant="subtitle1"
          className={classes.loginSubTitle}
          style={{ fontWeight: 200 }}
        >
          Введите ваш email и пароль ниже
        </Typography>

        <Formik initialValues={{ name: "" }} onSubmit={() => alert("@@@@@@@@")}>
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
                  className={classes.filledInput}
                  style={{ borderColor: "#F0F1F7 !important" }}
                  autoFocus
                  id="email"
                  name="email"
                  placeholder="Email адрес"
                  fullWidth
                  variant="outlined"
                  component={TextField}
                  margin="dense"
                />
                <Typography
                  variant="subtitle1"
                  className={classes.label}
                  style={{ fontWeight: 700 }}
                >
                  ПАРОЛЬ
                </Typography>
                <Field
                  type="password"
                  className={classes.filledInput}
                  autoFocus
                  id="password"
                  name="password"
                  placeholder="Пароль"
                  fullWidth
                  variant="outlined"
                  component={TextField}
                  margin="dense"
                />
                <Button className={classes.loginButton} variant="contained">
                  Войти
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Stack>
  );
};
