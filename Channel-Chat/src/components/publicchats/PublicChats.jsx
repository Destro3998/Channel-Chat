import "./publicchats.scss";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const PublicChats = () => {
  const [serachText, setSearchedText] = useState("");
  const { isLoading, error, data } = useQuery("posts", () =>
    makeRequest.get("/posts/allposts").then((res) => {
      return res.data;
    })
  );
  console.log(data);
  return (
    <div className="publichcats">
      <div className="search">
        <input
          type="text"
          placeholder="Search Public Chats..."
          onChange={(e) => setSearchedText(e.target.value)}
        />
      </div>
      World Wide Chats Click To follow chats
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data
            .filter(
              (filteredChats) =>
                filteredChats.name.toLowerCase().includes(serachText) ||
                filteredChats.desc.toLowerCase().includes(serachText)
            )
            .map((user, i) => (
              <Link
                key={i}
                to={`/profile/${user.userId}`}
                className="usersProfiles"
              >
                {user.name}
              </Link>
            ))}
    </div>
  );
};

export default PublicChats;
