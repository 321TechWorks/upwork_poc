import { api } from "@pp/trpc/server";

export async function GET(
  _: Request,
  { params: { id } }: { params: { id: string } },
) {
  const license = await api.license.getLicensesById({ id: parseInt(id) });

  return Response.json({ license });
}
