import { Outlet } from "@remix-run/react";
import { Breadcrumbs } from "../components/Breadcrumbs";

export default function IndexWithFooterAndHeader() {
  return (
    <main className="mb-auto flex h-full w-full flex-col gap-6 p-4 md:px-12">
      <Breadcrumbs />
      <Outlet />
    </main>
  );
}
