import { Outlet } from "@remix-run/react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export default function IndexWithFooterAndHeader() {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <Header />
      <main className="flex w-full flex-col gap-6 px-4 pt-12 md:px-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
