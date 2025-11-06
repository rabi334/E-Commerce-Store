import { NextResponse } from "next/server";
import axiosadminInstance from "@/app/lib/axios-admin-server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    
    const response = await axiosadminInstance.get("", {
      params: { email, password }
    });

    const user = response.data[0]; 

    if (user) {
      return NextResponse.json({ success: true, user });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}