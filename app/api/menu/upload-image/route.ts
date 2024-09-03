//totally copied from chatgpt
import { NextResponse } from "next/server";
import { writeFile, access, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get("image") as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // check the upload directory exists
  const uploadDir = join(process.cwd(), "public", "uploads");
  await ensureDir(uploadDir);

  const uniqueFilename = `${Date.now()}-${file.name}`;
  const path = join(uploadDir, uniqueFilename);

  try {
    await writeFile(path, buffer);
    const imageUrl = `/uploads/${uniqueFilename}`;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ error: "Error saving image" }, { status: 500 });
  }
}

// Utility function to ensure a directory exists
async function ensureDir(dirPath: string) {
  try {
    await access(dirPath);
  } catch (error) {
    await mkdir(dirPath, { recursive: true });
  }
}
