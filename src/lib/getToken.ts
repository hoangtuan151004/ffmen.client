"use server"; 
import { cookies } from "next/headers";

export async function getCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token?.value;
}