import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormBox from "../components/FormBox";
import formatError from "../utils/formatError";

const Login = () => {
  const navigate = useNavigate();
  const [login, loginContext] = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    login({
      email: data.get("email"),
      password: data.get("password"),
      rememberMe: data.get("rememberMe") ? true : false,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (error?.response?.status === 307) {
          navigate("/");
        }
      });
  };

  return (
    <Container component="main" maxWidth={false} sx={{ maxWidth: "540px" }}>
      <FormBox>
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          {loginContext.isError && (
            <Fade in>
              <Alert severity="error">{formatError(loginContext.error)}</Alert>
            </Fade>
          )}

          <TextField
            error={loginContext.isError}
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
          />
          <TextField
            error={loginContext.isError}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            name="rememberMe"
            label="Remember me"
          />
          <LoadingButton
            loading={loginContext.isLoading}
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </LoadingButton>

          <Grid container>
            <Grid item>
              <Button
                variant="text"
                onClick={() => navigate("/register")}
                sx={{ p: 0 }}
              >
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </FormBox>
    </Container>
  );
};

export default Login;
