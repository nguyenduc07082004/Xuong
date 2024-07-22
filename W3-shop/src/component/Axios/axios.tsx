import axios from "axios";



export const getAllProduct = async () =>{
      try{
          const res= await axios.get("http://localhost:3000/products",{});
          return res.data;
      }catch(error){
        console.log(error)
      };
};


export const deleteProduct = async (productId: number|string) => {
  try {
    const res= await axios.delete(`http://localhost:3000/products/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};





export const getAllCategories = async () => {
  const response = await axios.get(`http://localhost:3000/categories`);
  return response.data;
};

export const deleteCategory = async (categoryId:number| string) => {
  const response = await axios.delete(`http://localhost:3000/categories/${categoryId}`);
  return response.data;
};


