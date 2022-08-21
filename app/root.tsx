import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Footer } from "./components/layout/footer";
import { Header } from "./components/layout/header";

import tailwind from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sommarprat-UI",
  description: "A collection of spotify playlists from Sommar I P1",
  theme: "#fef3c7",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full min-h-screen w-full flex-col justify-between bg-[#287504] text-stone-800">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
