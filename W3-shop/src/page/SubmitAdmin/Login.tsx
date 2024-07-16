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
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../component/Axios/axios";

type RegisterFormParams = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormParams>();

  const onSubmit: SubmitHandler<RegisterFormParams> = async (data) => {
    try {
      await getLogin(data); // Gọi hàm getLogin với dữ liệu từ form
      alert("Đăng nhập thành công");
      navigate('/');
    } catch (error) {
      alert(error);
    }
  };

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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar />
          </Box>
          <Typography component="h1" variant="h5" my={2} textAlign={"center"}>
            Đăng nhập
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
                required: "Email là bắt buộc",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Địa chỉ email không hợp lệ",
                },
              })}
              error={!!errors?.email?.message}
              helperText={errors?.email?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Mật khẩu là bắt buộc",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              })}
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Nhớ tôi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item mt={5}>
                <Typography variant="body2">
                  {"Bạn chưa có tài khoản? "}
                  <Link to="/register">Đăng ký</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
