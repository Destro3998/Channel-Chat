import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getSubReply = (req, res) => {
  const q = `SELECT sr.id, sr.desc, sr.createdAt, sr.replyUserId FROM subreply sr INNER JOIN comments c ON sr.replyCommentId = c.id 
WHERE c.id = ? ORDER BY sr.createdAt DESC`;
  db.query(q, [req.query.replyCommentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addSubReply = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO subreply(`desc`,`createdAt`, `replyUserId`, `replyCommentId`) VALUES (?)";
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.replyCommentId,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("reply has been created.");
    });
  });
};
