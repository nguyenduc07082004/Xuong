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
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Category } from "../../../type/Interface";


const EditCategory: React.FC = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Category>();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/categories/${categoryId}`);
        setCategory(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Có lỗi khi tải danh mục:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
    }
  }, [category, setValue]);

  const onSubmit: SubmitHandler<Category> = async (data) => {
    try {
      await axios.put(`http://localhost:3000/categories/${categoryId}`, data);
      alert("Danh mục đã được cập nhật thành công");
      navigate("/admin");
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật danh mục");
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
            Sửa danh mục
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sửa danh mục
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default EditCategory;
