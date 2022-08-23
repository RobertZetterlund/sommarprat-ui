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
import font from "../public/fonts/pt-serif-v17-latin-regular.woff";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: globalstyles },
  { rel: "preload", href: font, as: "font", type: "font/woff" },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sommarprat-UI",
  description: "A collection of spotify playlists from Sommar I P1",
  theme: "#287504",
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
