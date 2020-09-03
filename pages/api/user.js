import { CotterValidateJWT } from "cotter-node";

const getUser = async (req, res) => {
  //Error if there is no "authorization" in header
  if (!("authorization" in req.headers)) {
    res.statusCode = 401;
    res.end("Authorization header missing");
    return;
  }
  //else, retrieve the TOKEN
  //The format of the token is 'Bearer token', thus needs to be split
  const auth = await req.headers.authorization;
  const token = auth.split(" ")[1];

  //Validate the token
  let valid = await CotterValidateJWT(token);
  //If Token is Invalid, respond with error
  if (!valid) {
    res.statusCode = 403;
    res.end("Authorization header is invalid");
    return;
  }
  //Else, return Success Response
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end("success"); //customize
};

export default getUser;
