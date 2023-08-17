import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the token from the cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // You can use the decodedToken to fetch additional user data if needed
    const userData = {
      id: decodedToken.id,
      username: decodedToken.username,
      email: decodedToken.email,
    };

    // Send the user data as a response
    res.status(200).json({
      message: "User data retrieved successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
