import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "data",
  "portfolio.json"
);

export async function GET() {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(file);

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/portfolio error:", error);

    return NextResponse.json(
      {
        error: "Failed to load portfolio",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const password = request.headers.get("x-admin-password");

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const currentFile = await fs.readFile(
      filePath,
      "utf-8"
    );

    const currentData = JSON.parse(currentFile);

    const updatedData = {
      ...currentData,

      ...(body.skills !== undefined && {
        skills: body.skills,
      }),

      ...(body.jobs !== undefined && {
        jobs: body.jobs,
      }),
    };

    await fs.writeFile(
      filePath,
      JSON.stringify(updatedData, null, 2),
      "utf-8"
    );

    return NextResponse.json(updatedData);
  } catch (error) {
    console.error("PUT /api/portfolio error:", error);

    return NextResponse.json(
      {
        error: "Failed to save portfolio",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}