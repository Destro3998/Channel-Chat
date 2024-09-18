import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.scss";

const Home = () => {
  return (
    <div className="pagebody">
      <div className="home">
        <Share />
        <Posts />
      </div>
    </div>
  );
};

export default Home;
