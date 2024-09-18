import { useState } from "react";
import "./reply.scss";
import profilePhoto from "../../assets/Person.png";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import Subreply from "../subreply/Subreply";

const Comments = ({ postId }) => {
  const [replyOpen, setReplyOpen] = useState(false);

  const [desc, setDesc] = useState("");

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="reply">
      <div className="write">
        <img src={profilePhoto} alt="" />
        <input
          type="text"
          placeholder="write a reply"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment, index) => (
            <div key={index}>
              <div className="comment">
                {/* <img src={"/upload/" + comment.profilePic} alt="" /> */}
                {/* <img src={comment.profilePic} alt="" /> */}
                <div className="info">
                  <b>
                    <span>{comment.name}</span>
                  </b>
                  <p>{comment.desc}</p>
                </div>
                <span className="date">
                  {moment(comment.createdAt).fromNow()}
                </span>
                <button
                  className="subreplybutton"
                  onClick={() => setReplyOpen(!replyOpen)}
                >
                  Reply
                </button>
              </div>
              {replyOpen && <Subreply replyCommentId={comment.id} />}
            </div>
          ))}
    </div>
  );
};

export default Comments;

// import { useContext, useState } from "react";
// import { AuthContext } from "../../context/authContext";
// import "./comments.scss";

// const Comments = () => {
//   const [desc, setDesc] = useState("");

//   const { currentUser } = useContext(AuthContext);
//   const commentss = [
//     {
//       id: 1,
//       name: "john deo",
//       userId: 1,
//       desc: "Your perfect pack for everyday use and walks in the forest",
//       profilePic:
//         "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
//       img: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     },
//     {
//       id: 2,
//       name: "test user",
//       userId: 2,
//       desc: "Your perfect pack for everyday use and walks in the forest",
//       profilePic:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
//       img: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
//     },
//     {
//       id: 3,
//       name: "dummy user",
//       userId: 3,
//       desc: "Your perfect pack for everyday use and walks in the forest",
//       profilePic:
//         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
//       img: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
//     },
//   ];
//   return (
//     <div className="reply">
//       <div className="write">
//         <img src={currentUser.profilePic} alt="" />
//         <input type="text" placeholder="Message" name="" id="" />
//         <button>Send</button>
//       </div>
//       {commentss.map((comment) => (
//         <div className="comment">
//           <img src={comment.profilePic} alt="" />
//           <div className="info">
//             <span>{comment.name}</span>
//             <p>{comment.desc}</p>
//           </div>
//           <span className="date">1 hour ago</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Comments;
