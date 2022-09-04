import { Outlet } from "@remix-run/react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export default function IndexWithFooterAndHeader() {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <Header />
      <main className="w-full pt-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
