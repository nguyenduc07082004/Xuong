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
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getRegister } from "../../component/Axios/axios";
import { Email } from "../../type/Interface";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Email>();

  const password = watch("password", "");

  const onSubmit: SubmitHandler<Email> = async (data) => {
    try {
      await getRegister(data); // Giả sử getRegister là một hàm nhận dữ liệu đăng ký
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Grid container component="main" justifyContent="center">
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square p={5}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar />
        </Box>
        <Typography component="h1" variant="h5" my={2} textAlign="center">
          Đăng ký
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Tên đăng nhập"
            autoFocus
            {...register("username", { required: "Tên đăng nhập là bắt buộc" })}
            error={!!errors?.username?.message}
            helperText={errors?.username?.message}
          />
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Xác nhận mật khẩu"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            {...register("confirmPassword", {
              validate: (value) => value === password || "Mật khẩu không khớp",
            })}
            error={!!errors?.confirmPassword?.message}
            helperText={errors?.confirmPassword?.message}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Nhớ tôi"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Đăng ký
          </Button>
          <Grid container>
            <Grid item mt={5}>
              <Typography variant="body2">
                {"Bạn đã có tài khoản? "}
                <Link to="/login">Đăng nhập</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;
