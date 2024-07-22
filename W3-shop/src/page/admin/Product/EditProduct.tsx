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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Products, Category } from "../../../type/Interface";

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Products | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Products>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data);
        setSelectedCategory(res.data.category);
        setLoading(false);
      } catch (error) {
        console.log('Có lỗi khi tải sản phẩm:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id, navigate]);

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("imageUrl", product.imageUrl);
    }
  }, [product, setValue]);

  const onSubmit: SubmitHandler<Products> = async (data) => {
    if (!selectedCategory) {
      alert("Vui lòng chọn danh mục");
      return;
    }

    try {
      const updatedProduct = { ...data, category: selectedCategory };
      await axios.put(`http://localhost:3000/products/${id}`, updatedProduct);
      alert("Sản phẩm đã được cập nhật thành công");
      navigate("/admin");
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật sản phẩm");
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

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
            Sửa sản phẩm
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
              Sửa sản phẩm
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default EditProduct;
