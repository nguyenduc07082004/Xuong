import React from "react";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../../type/Interface";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      await axios.post("http://localhost:3000/register", data);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      alert("Có lỗi xảy ra khi đăng ký");
    }
  };

  return (
    <>
    <Grid  component="main" justifyContent="center">
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
            id="email"
            label="Email"
            {...register("email", {
              required: "Email là bắt buộc",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ",
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Đăng ký
          </Button>
        </form>
      </Grid>
    </Grid>
    </>
  );
};

export default Register;
