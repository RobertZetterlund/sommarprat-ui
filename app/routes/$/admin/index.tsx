import type { Episode } from "@prisma/client";
import { Form } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { db } from "../../../utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const year = form.get("year");
  const json = form.get("json");

  const arr = JSON.parse(json as any) as Omit<Episode, "yearAired">[];

  await Promise.all(
    arr.map(async (ep) => {
      await db.episode.create({
        data: { yearAired: parseInt(year as string), ...ep },
      });
    })
  );
  return null;
};

export default function Index() {
  return (
    <div className="m-auto flex w-full items-center justify-center py-5 px-10 text-center">
      <Form method="post">
        <textarea name="json"></textarea>
        <select name="year">
          {[...Array(2022 - 2005).keys()]
            .map((n) => n + 2005)
            .map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
        </select>
        <button className="bg-emerald-700" type="submit">
          lets go
        </button>
      </Form>
    </div>
  );
}
