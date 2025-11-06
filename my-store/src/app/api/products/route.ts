import { NextResponse } from "next/server";

import axiosServerInstance from "@/app/lib/axios-server-instance";

export async function GET() {
  
  const products = await axiosServerInstance.get("/");
  const respProducts = products.data;

  return NextResponse.json(respProducts);
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); 

    const response = await axiosServerInstance.post("/", body);

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create product:", error.message);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: error?.response?.status || 500 }
    );
  }
}