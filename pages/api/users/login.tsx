
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel";
import { serialize } from "cookie"; // Import the serialize function

connect();

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { email, password } = request.body;
    console.log(request.body);

    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user.username);
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Set the token cookie using the response.setHeader method
    const cookieSerialized = serialize("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: "/", // Change this path if necessary
    });
    response.setHeader("Set-Cookie", cookieSerialized);


    // Send the JSON response
    response.json({
      message: "Login Successful",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    response.json({ error: "Internal server error" }, { status: 500 });
  }
}
