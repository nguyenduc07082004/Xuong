import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { Email } from "../../type/Interface";
import { useNavigate } from "react-router-dom";



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
};
export const getRegister:SubmitHandler<Email> = async (data)=>{
  try{
    await axios.post("http://localhost:3000/users",data)
  }catch(error){
     alert(error); console.log(error)
  }
};