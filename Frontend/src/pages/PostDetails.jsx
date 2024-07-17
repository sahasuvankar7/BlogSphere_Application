import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from "../components/Comment";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL, IF } from "../url";
import moment from "moment";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const loaderDuration = 50000;
  const navigate = useNavigate();
  // console.log(postId);

  // converting IST table
  const DateTimeComponent = () => {
    const currentDateTime = moment().format("DD:MM:YYYY HH:MM");
  };
  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      // console.log(res.data);
      setPost(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postId]);

  // deleting post
  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(`${URL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      // console.log(res.data);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      // console.log(res.data)
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const postComments = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${URL}/api/comments/create`,
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      fetchComments();
      setComment();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-20 min-h-screen">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl ">
              {post?.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4 ">
            <p>@{post?.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img src={IF + post?.photo} className="w-full mx-auto mt-8" alt="" />
          <p className="mx-auto mt-8">{post?.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>

            {post.categories?.map((c, i) => (
              <div key={i}>
                <div className="flex justify-center items-center space-x-2">
                  <div className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold ">Comments:</h3>

            {/* comments */}
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} fetchComments={fetchComments}/>
            ))}
          </div>
          {/* write a comment */}
          <div className="flex flex-col mt-4 md:flex-row w-full">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="write your comment"
              className="w-[90%] outline-none px-4 mt-4 md:mt-0 py-2"
            />
            <button
              className="bg-black text-white rounded-lg px-4 py-2 md:w-[15%] mt-4 md:mt-0 text-sm "
              onClick={(e) => postComments(e)}
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
