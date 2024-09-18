import "./Subreply.scss";
import { useState } from "react";
// import { useContext, useState } from "react";
// import "./comments.scss";

// import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
// import moment from "moment";

const Subreply = ({ replyCommentId }) => {
  console.log(replyCommentId);
  const [desc, setDesc] = useState("");
  // const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["subReply"], () =>
    makeRequest
      .get("/subreply?replyCommentId=" + replyCommentId)
      .then((res) => {
        return res.data;
      })
  );

  console.log(data);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/subreply", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["subReply"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, replyCommentId });
    setDesc("");
  };

  return (
    <div className="subReply">
      <div className="write">
        <input
          type="text"
          placeholder="write a reply"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Nested Reply</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment, index) => (
            <div key={index}>
              <div className="comment">
                <div className="info">
                  <b>

                  <span>{comment.name}</span>
                  </b>
                  <p>{comment.desc}</p>
                </div>
                <span className="date">
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Subreply;
