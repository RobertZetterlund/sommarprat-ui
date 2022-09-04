import { Outlet } from "@remix-run/react";
import { Footer } from "../../components/layout/footer";
import { Header } from "../../components/layout/header";

export default function IndexWithFooterAndHeader() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
