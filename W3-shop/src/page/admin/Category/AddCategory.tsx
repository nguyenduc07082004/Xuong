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
import { Category } from "../../../type/Interface";

const AddCategory: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>();

  const onSubmit: SubmitHandler<Category> = async (data) => {
    try {
      await axios.post("http://localhost:3000/categories", data);
      alert("Danh mục đã được thêm thành công");
      navigate("/admin");
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm danh mục");
    }
  };

  return (
    <>
      <Grid component="main" justifyContent="center">
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
            Thêm danh mục mới
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Tên danh mục"
              autoFocus
              {...register("name", { required: "Tên danh mục là bắt buộc" })}
              error={!!errors?.name?.message}
              helperText={errors?.name?.message}
         
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Mô tả"
              autoFocus
              {...register("description", { required: "Tên danh mục là bắt buộc" })}
              error={!!errors?.description?.message}
              helperText={errors?.description?.message}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Thêm danh mục
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddCategory;
