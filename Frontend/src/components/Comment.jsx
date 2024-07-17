import React, { useState, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

const Comment = ({ c, post, fetchComments }) => {
  const { user } = useContext(UserContext);
  const postId = useParams().id;
  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState(c.comment);

  const handleEditComment = async (commentId) => {
    try {
      await axios.put(
        `${URL}/api/comments/${commentId}`,
        { comment: editComment },
        { withCredentials: true }
      );
      setIsEditing(false);
      fetchComments(); // Refresh the comments list after editing
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCommnet = async (commentId) => {
    try {
      const res = await axios.delete(`${URL}/api/comments/${commentId}`, {
        withCredentials: true,
      });
      fetchComments(); // Refresh the comments list after deleting
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg mb-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {user?._id === c?.userId ? (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
                onClick={() => setIsEditing(!isEditing)}
              >
                <BiEdit />
              </p>
            </div>
          ) : (
            ""
          )}
          {user?._id === c?.userId ? (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
                onClick={() => handleDeleteCommnet(c._id)}
              >
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="flex flex-col mt-2">
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={() => handleEditComment(c._id)}
            className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      ) : (
        <p className="px-4 my-2">{c.comment}</p>
      )}
    </div>
  );
};

export default Comment;
