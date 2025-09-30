import { NextResponse } from "next/server";

import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";

import User, { IUserDoc } from "@/database/user.model";

export async function GET(): Promise<APIResponse<IUserDoc[]>> {
  try {
    await dbConnect();

    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(request: Request): Promise<APIResponse<IUserDoc>> {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate user schema
    const validatedUser = UserSchema.safeParse(body);
    if (!validatedUser.success)
      throw new ValidationError(validatedUser.error.flatten().fieldErrors);

    const { email, username } = validatedUser.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new Error("Username already exists");

    // Create user
    const newUser = await User.create(validatedUser.data);

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
