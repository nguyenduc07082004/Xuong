import axios from "axios";



export const getAllProduct = async () =>{
      try{
          const res= await axios.get("http://localhost:3000/products",{});
          return res.data;
      }catch(error){
        console.log(error)
      };
}













export const getAllSubmit = async ()=>{
  try{
    const res=await axios.get("http://localhost:3000/users",{})
    return res.data;
  }catch(error){
     alert(error); console.log(error)
  }
}