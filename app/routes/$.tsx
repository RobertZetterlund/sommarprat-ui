import { Outlet } from "@remix-run/react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export default function IndexWithFooterAndHeader() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-between">
      <Header />
      <main className="my-auto flex h-full w-full flex-col gap-6 px-4 pt-12 md:px-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
