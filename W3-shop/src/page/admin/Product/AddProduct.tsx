import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Products, Category } from "../../../type/Interface";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Products>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<Products> = async (data) => {
    if (!selectedCategory) {
      alert("Vui lòng chọn danh mục");
      return;
    }

    try {
      const newProduct = { ...data, category: selectedCategory };
      await axios.post("http://localhost:3000/products", newProduct);
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
              id="title"
              label="Tên sản phẩm"
              autoFocus
              {...register("title", { required: "Tên sản phẩm là bắt buộc" })}
              error={!!errors?.title?.message}
              helperText={errors?.title?.message}
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
                min: { value: 10, message: "Giá phải có ít nhất 4 chữ số" },
                max: {
                  value: 99999999,
                  message: "Giá phải có tối đa 8 chữ số",
                },
              })}
              error={!!errors?.price?.message}
              helperText={errors?.price?.message}
              InputProps={{ inputProps: { min: 10, max: 99999999 } }}
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
            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel id="category-label">Danh mục</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as string)}
                label="Danh mục"
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
