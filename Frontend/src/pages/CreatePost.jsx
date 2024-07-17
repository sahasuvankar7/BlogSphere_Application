import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };
  const deleteCategory = (index) => {
    let updatedCats = [...cats];
    updatedCats.splice(index, 1);
    setCats(updatedCats);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      // image upload
      try {
        const imageUpload = await axios.post(URL + "/api/upload", data);
        // console.log(imageUpload.data);
        // console.log(post);
      } catch (err) {
        console.log(err);
      }
    }
    // if there is no file of image then it will run this code
    try {
      const res = await axios.post(URL + "/api/posts/create",post, {
        withCredentials: true,
      });
      navigate("/posts/post/"+res.data._id)
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px]  min-h-screen mt-20">
        <h1 className="font-bold md:text-2xl text-xl mt-8"> Create a post</h1>
        <form
          className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
          action=""
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2  border-[0.2px] "
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                type="text"
                className="px-4 py-2  border-[0.2px] e"
                placeholder="Enter post category"
              />
              <div
                className="bg-gray-800 text-white px-4 py-2 font-semibold rounded-md cursor-pointer"
                onClick={addCategory}
              >
                Add
              </div>
            </div>
            {/* Categories */}
            <div className=" flex px-4 mt-3">
              {cats?.map((c, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md "
                >
                  <p>{c}</p>
                  <p
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                    onClick={() => deleteCategory(index)}
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            name=""
            id=""
            cols="30"
            rows="10"
            className="px-4 py-2 border-[0.2px] border-gray-500"
            placeholder="Enter post description"
          />
          <button
            onClick={(e) => handleCreatePost(e)}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md"
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
