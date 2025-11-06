import { NextResponse } from "next/server";
import axiosServerInstance from "@/app/lib/axios-server-instance";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const response = await axiosServerInstance.get(`/${params.id}`);
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
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const response = await axiosServerInstance.put(`/${params.id}`, body);
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
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const response = await axiosServerInstance.patch(`/${params.id}`, body);
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
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await axiosServerInstance.delete(`/${params.id}`);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete product:", error.message);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: error?.response?.status || 500 }
    );
  }
}
