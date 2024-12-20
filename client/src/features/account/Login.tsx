import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
import logo from "../../assets/etf.png";
import { useAppDispatch } from "../../app/store/configureStore";
import { FieldValues, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { signInUser } from "./accountSlice";
import { LoadingButton } from "@mui/lab";

const Card = styled(MuiCard)(() => ({
  display: "flex",
  borderRadius: 10,
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: "3rem",
  maxWidth: "550px",
  backgroundColor: "secondary.main",

  margin: "auto",
}));

const SignInContainer = styled(Stack)(() => ({
  height: "100vh",
  minHeight: "100%",
  backgroundColor: "secondary.main",
  padding: 2,

  "&::before": {
    content: '""',
    display: "flex",
    position: "absolute",
    zIndex: -1,
    inset: 0,
  },
}));

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));

      navigate(location.state?.from || "/");
    } catch (error: any) {
      console.log(error.data);
    }
  }

  // const theme = useTheme();
  //props: { disableCustomTheme?: boolean }

  return (
    // <AppTheme {...props}>
    <>
      <CssBaseline />
      <Grid
        container
        sx={{
          flexGrow: 1,
          padding: 2,
          backgroundImage: `url(${logo})`,
          backgroundSize: "contain",
          backgroundPosition: "right",
          height: "100vh",
          width: "100%",
          filter: "blur(8px)",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></Grid>

      <SignInContainer direction="column" justifyContent="space-between">
        {/* <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        /> */}
        <Card variant="outlined" sx={{ backgroundColor: "secondary.main" }}>
          {/* <SitemarkIcon /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              mb: 2,
            }}
          >
            Prijava
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                placeholder="your@email.com"
                autoFocus
                fullWidth
                variant="outlined"
                {...register("email", { required: "Email je obavezan." })}
                error={!!errors.email}
                helperText={errors?.email?.message as string}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Lozinka</FormLabel>
              <TextField
                placeholder="••••••"
                type="password"
                id="password"
                variant="outlined"
                {...register("password", { required: "Lozinka je obavezna." })}
                fullWidth
                error={!!errors.password}
                helperText={errors?.password?.message as string}
              />
            </FormControl>
            <br />
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
            >
              Prijavi se
            </LoadingButton>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
            //   startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button> */}
            <Typography
              sx={{
                textAlign: "center",
                fontStyle: "italic",
                fontSize: 13,
                color: "text.disabled",
              }}
            >
              *Za prijavu, koristite Microsoft nalog koji vam je dodijeljen od
              strane fakulteta.
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
    // </AppTheme>
  );
}
