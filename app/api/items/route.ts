import { NextRequest, NextResponse } from "next/server";
import { getItems, createItem, deleteItem } from "@/lib/db";

// GET all items
export async function GET() {
  try {
    const items = await getItems();
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

// POST create item
export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();
    if (!title || !description) {
      return NextResponse.json({ error: "Title and description required" }, { status: 400 });
    }
    const item = await createItem(title, description);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}

// DELETE item
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await deleteItem(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
