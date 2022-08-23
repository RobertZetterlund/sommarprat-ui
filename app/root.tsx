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
  title: "Sommarprat-UI",
  description: "A collection of spotify playlists from Sommar I P1",
  theme: "#60a5fa",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="bg-blue-400">
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
