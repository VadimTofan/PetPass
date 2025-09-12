import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import db from "";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db("users").where({ email: session.user.email }).first();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await req.json();

  const payload = {
    ...body,

    owner_user_id: user.id,
  };

  const [pet] = await db("pets").insert(payload).returning("*");
  return NextResponse.json(pet, { status: 201 });
}
