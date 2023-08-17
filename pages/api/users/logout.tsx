import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel";
import { serialize } from "cookie";

connect();

export default async function handler(request, response) {

  try {

    // Clear the "token" cookie by setting it to an empty value and an expired date
    const cookieSerialized = serialize("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set to a date in the past
      path: "/", // Change this path if necessary
    });
    response.setHeader("Set-Cookie", cookieSerialized);

    // Send the JSON response
    return response.status(200).json({
      message: "Logout Successful",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}
