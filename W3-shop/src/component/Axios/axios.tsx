import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Products } from "../../type/Interface";



export const getAllProduct = async () =>{
      try{
          const res= await axios.get("http://localhost:3000/products",{});
          return res.data;
      }catch(error){
        console.log(error)
      };
};

export const productDetail = async () => {
  const { id } = useParams<{ id: string }>();
  try {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

export const deleteProduct = async (productId: number|string) => {
  try {
    const res= await axios.delete(`http://localhost:3000/products/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};


