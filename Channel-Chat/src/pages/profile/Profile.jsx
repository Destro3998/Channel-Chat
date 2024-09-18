import "./Profile.scss";
import { AiTwotoneMail } from "react-icons/ai";
import profilePhoto from "../../assets/Person.png";
import coverPic from "../../assets/cover.png";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  console.log(userId);
  const { isLoading, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="pagebody">
      <div className="profile">
        {isLoading ? (
          "loading"
        ) : (
          <>
            <div className="images">
              <img src={coverPic} alt="" className="cover" />

              <img src={profilePhoto} alt="" className="profilePic" />
            </div>
            <div className="profileContainer">
              <div className="uInfo">
                <div className="left"></div>
                <div className="center">
                  <span>{data.name}</span>
                  <div className="info">
                    <div className="item">
                      <AiTwotoneMail />
                      <span>{data.email}</span>
                    </div>
                  </div>
                  {rIsLoading ? (
                    "loading"
                  ) : userId === currentUser.id ? (
                    <h4>Your Profile</h4>
                  ) : (
                    <button onClick={handleFollow}>
                      {relationshipData.includes(currentUser.id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  )}
                </div>
                <div className="right"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
