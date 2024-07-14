import {
    Avatar,
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography,
  } from "@mui/material";
  import axios from "axios";
  
  import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../component/Axios/axios";
  
  type RegisterFormParams = {
    email: string;
    password: string;
  };
  
  
  const Login = () => {
    const navigate = useNavigate() ; 
  
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<RegisterFormParams>()
    const onSubmit: SubmitHandler<RegisterFormParams> = async (data) => {
      try {
        getLogin;
        alert("Login successful")
        navigate('/')
      } catch (error) {
        alert(error)
      }
    }
  
    return (
      <>
        <Grid container component="main" justifyContent={"center"}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={1}
            square
            p={5}
          >
            <div>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar></Avatar>
              </Box>
              <Typography component="h1" variant="h5" my={2} textAlign={"center"}>
                Login
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  id="email"
                  autoComplete="current-email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  error={!!errors?.email?.message}
                  helperText={errors?.email?.message}
                  name="email"
  
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password is min length 6 characters",
                    },
                  })}
                  error={!!errors?.password?.message}
                  helperText={errors?.password?.message}
  
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item mt={5}>
                    <Typography variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </>
    );
  };
  
  export default Login;
  