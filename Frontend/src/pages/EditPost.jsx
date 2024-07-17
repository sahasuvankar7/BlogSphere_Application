import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [existingFile, setExistingFile] = useState(null); // it will store the existing file of the post
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const postId = useParams().id;
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

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
      photo: existingFile,
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
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title || "");
      setDesc(res.data.desc || "");
      setExistingFile(res.data.photo || null); // use sperate state to store the existing file of the post
      setCat(res.data.categories || "");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-20 min-h-screen">
        <h1 className="font-bold md:text-2xl text-xl mt-8"> Update your post</h1>
        <form
          className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
          action=""
        >
          <input
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 border-[0.2px]"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="px-4"
          />

          {/* if there is any existing photo in the edit section then if want to change it then we can easily change it , if we don't then the existing image will be uploading */}
          {existingFile && !file && (
            <div className="flex flex-col mt-2">
              <p>Current Image:</p>
              <img
                src={`${URL}/images/${existingFile}`}
                alt="current Post"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat || ""}
                onChange={(e) => setCat(e.target.value)}
                type="text"
                className="px-4 py-2 border-[0.2px]"
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
            <div className="flex px-4 mt-3">
              {cats?.map((c, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
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
            name=""
            id=""
            cols="30"
            rows="10"
            className="px-4 py-2 border-[0.2px] border-gray-500"
            placeholder="Enter post description"
            value={desc || ""}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md"
            onClick={(e) => handleUpdatePost(e)}
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
