import "./chat.scss";
import { IoIosMore } from "react-icons/io";
import { MdOutlineModeComment } from "react-icons/md";
import { Link } from "react-router-dom";
import Comments from "../reply/reply";
import { useContext, useState } from "react";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import { QueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";
import profilePhoto from "../../assets/Person.png";


const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        QueryClient.invalidateQueries(["posts"]);
      },
    }
  );
  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };
  return (
    <div className="chat">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={profilePhoto} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <IoIosMore onClick={() => setMenuOpen(!menuOpen)} />

          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item " onClick={() => setCommentOpen(!commentOpen)}>
            <MdOutlineModeComment />
            Replies
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
