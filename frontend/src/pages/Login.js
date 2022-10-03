import { useState } from "react";
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
import AuthAPI from "../api/AuthAPI";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    AuthAPI.login(
      data.get("email"),
      data.get("password"),
      data.get("rememberMe") ? true : false
    )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to sign in: " + error.message);
        }
      });

    setLoading(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          my: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          {error && (
            <Fade in={error ? true : false}>
              <Alert severity="error">{error}</Alert>
            </Fade>
          )}

          <TextField
            error={error ? true : false}
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
          />
          <TextField
            error={error ? true : false}
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
            loading={loading}
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
      </Box>
    </Container>
  );
};

export default Login;
