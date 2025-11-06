import { NextResponse } from "next/server";
import axiosServerInstance from "@/app/lib/axios-server-instance";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const response = await axiosServerInstance.get(`/${id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Failed to fetch product:", error.message);
    return NextResponse.json(
      { error: "Product not found" },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await request.json();
    const response = await axiosServerInstance.put(`/${id}`, body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Failed to update product:", error.message);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await request.json();
    const response = await axiosServerInstance.patch(`/${id}`, body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Failed to partially update product:", error.message);
    return NextResponse.json(
      { error: "Failed to patch product" },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    await axiosServerInstance.delete(`/${id}`);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete product:", error.message);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: error?.response?.status || 500 }
    );
  }
}
