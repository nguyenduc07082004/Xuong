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
import { Products } from "../../../type/Interface";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Products>();

  const onSubmit: SubmitHandler<Products> = async (data) => {
    try {
      await axios.post("http://localhost:3000/products", data);
      alert("Sản phẩm đã được thêm thành công");
      navigate("/admin");
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm sản phẩm");
    }
  };

  return (
    <>
      <Grid container component="main" justifyContent="center">
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
            Thêm sản phẩm mới
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Tên sản phẩm"
              autoFocus
              {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
              error={!!errors?.name?.message}
              helperText={errors?.name?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mô tả"
              id="description"
              {...register("description", { required: "Mô tả là bắt buộc" })}
              error={!!errors?.description?.message}
              helperText={errors?.description?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Giá"
              type="number"
              id="price"
              {...register("price", {
                required: "Giá là bắt buộc",
                min: { value: 1000, message: "Giá phải có ít nhất 4 chữ số" },
                max: {
                  value: 99999999,
                  message: "Giá phải có tối đa 8 chữ số",
                },
              })}
              error={!!errors?.price?.message}
              helperText={errors?.price?.message}
              InputProps={{ inputProps: { min: 1000, max: 99999999 } }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="URL hình ảnh"
              id="imageUrl"
              {...register("imageUrl", {
                required: "URL hình ảnh là bắt buộc",
              })}
              error={!!errors?.imageUrl?.message}
              helperText={errors?.imageUrl?.message}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Thêm sản phẩm
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddProduct;
