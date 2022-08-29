import { PassThrough } from "stream";
import type { EntryContext } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";

const ABORT_DELAY = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let didError = false;

    let { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady: () => {
          let body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set("X-Content-Type-Options", "nosniff");

          responseHeaders.set("Referrer-Policy", "strict-origin");
          responseHeaders.set(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
          );
          // TODO(robertz): get default-src none;
          responseHeaders.set(
            "Content-Security-Policy",
            "img-src 'self' https://static-cdn.sr.se/ https://i.scdn.co/image/; font-src 'self'; object-src 'none';"
          );

          responseHeaders.set("X-Frame-Options", "SAMEORIGIN");

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError: (err) => {
          reject(err);
        },
        onError: (error) => {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
