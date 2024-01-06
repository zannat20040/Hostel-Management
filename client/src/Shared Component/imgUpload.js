import axios from "axios";

export const imgUpload=async image=>{
  if (!image) {
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4Z890CsvaOHje-24k9qtfsP4r3nPV7KfREHvPks7rw&s"; // Replace with your desired default value or handle it in another way
  }

    const formData = new FormData();
    formData.append("image", image);

    const {data} = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_key}`,
      formData
    )
    const photo_url  = data.data.display_url
    
    return photo_url ;
}