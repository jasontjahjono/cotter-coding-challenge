import { CotterValidateJWT } from "cotter-node";

const getUser = async (req, res) => {
  if (!("authorization" in req.headers)) {
    res.statusCode = 401;
    res.end("Authorization header missing");
    return;
  }
  const auth = await req.headers.authorization;
  const token = auth.split(" ")[1];

  let valid = await CotterValidateJWT(token);
  if (!valid) {
    res.statusCode = 403;
    res.end("Authorization header is invalid");
    return;
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ name: "Jason", ID: "123456", role: "admin" });
};

export default getUser;
