/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Link from "next/link";
import { api } from "@pp/trpc/server";
import { Button } from "./(licensing)/_components/Button";

export default async function Landing() {
  const licenses = await api.license.getAllLicenses();

  return (
    <div className="flex h-full flex-col space-y-4 p-8">
      <div className="flex justify-between">
        <h3>Licenses:</h3>
        <Link href="/review_requirements">
          <Button className="border-red-primary bg-red-primary text-white">
            New License
          </Button>
        </Link>
      </div>
      <table className="border-collapse border border-red-50">
        <thead>
          <tr className="bg-red-50 text-left">
            <th className="w-1/2 border border-red-50 p-4">OWNER</th>
            <th className="w-1/2 border border-red-50 p-4">DATE</th>
            <th className="w-1/2 border border-red-50 p-4">EXPIRE</th>
            <th className="w-1/2 border border-red-50 p-4">STATUS</th>
            <th className="w-1/2 border border-red-50 p-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((license) => (
            <tr key={license.id}>
              <td className="w-1/4 border border-red-50 p-4">
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-expect-error */}
                {license.owner.name}
              </td>
              <td className="w-1/4 border border-red-50 p-4">
                {String(new Intl.DateTimeFormat("en-US").format(license?.date))}
              </td>
              <td className="w-1/4 border border-red-50 p-4">
                {String(
                  new Intl.DateTimeFormat("en-US").format(license?.expire),
                )}
              </td>
              <td className="w-1/4 border border-red-50 p-4">
                {license.status}
              </td>
              <td className="w-1/4 border border-red-50 p-4">
                {license.status === "new" ? (
                  <Link href={`/license_pet?licenseId=${license.id}`}>
                    go to step 3
                  </Link>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
