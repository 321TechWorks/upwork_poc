"use server";

import { api } from "@pp/trpc/server";
import { redirect } from "next/navigation";

export async function addToCart(id: number) {
  await api.license.addToCart({ id });

  redirect("/");
}
