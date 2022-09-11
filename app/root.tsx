import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwind from "./tailwind.css";
import globalstyles from "./styles/global.css";
import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: globalstyles },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sommarprat-ui",
  description:
    "A collection of the musical selection of the hosts of Sommar i P1",
  theme: "#1b3e6a",
  viewport: "width=device-width,initial-scale=1",
  "og:image": "/meta-image.png",
  "twitter:image": "/meta-image.png",
});

export default function App() {
  return (
    <html lang="en" className="bg-[#1b3e6a]">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full min-h-screen w-full flex-col justify-between overscroll-x-none text-stone-800">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Footer />
      </body>
    </html>
  );
}
