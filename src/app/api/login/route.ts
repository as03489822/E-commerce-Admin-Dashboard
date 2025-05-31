import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/config/dbConnect"; 

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

      console.log(email , password);
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    console.log('19',user)
    if (!user) {
        return NextResponse.json({ message: 'Incorrect email' }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 400 });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username : user.username,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1y' }
    );

    return NextResponse.json({ message: 'Login successful', token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: 'Error logging in' }, { status: 500 });
  }
}
