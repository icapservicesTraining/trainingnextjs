// app/lib/actions/user.action.ts
"use server";
import { sql } from '@vercel/postgres';
//import User from "@/models/user.model";
import type { User } from '@/app/lib/definitions';

//import { connectToDB } from "../database/dbConnection";
import bcrypt from 'bcrypt';

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    const userToTest=user.rows[0] as User;
    //const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User Not Found.");
    }
    const isOk = await bcrypt.compare(password, userToTest.password);

    //const isOk = await bcryptjs.compare(password, password);
    console.log("isOk:", isOk);
    if (!isOk) {
      throw new Error("Invalid email or password");
    }
    return { data: userToTest, error: null };
  } catch (error: any) {
    console.log("user", error.message);
    // handleError(error);
    return { data: null, error: error.message };
  }
};
