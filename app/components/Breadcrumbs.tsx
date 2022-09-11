import type { RouteMatch } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { useMatches, useLocation } from "@remix-run/react";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { useMemo } from "react";

export type BreadcrumbRenderer<TData> = (
  routematch: RouteMatch,
  data: TData
) => string;
export type BreadcrumbHandle<TData> = { breadcrumb: BreadcrumbRenderer<TData> };

type RouteMatchWithBreadCrumbsHandler<TData = {}> = RouteMatch & {
  handle: BreadcrumbHandle<TData>;
};

// Should only get the text to render, and handle highlighting itself?
export const Breadcrumb = ({
  children,
  to,
  active = false,
}: {
  children: ReactNode;
  to: string;
  active?: boolean;
}) => {
  return (
    <Link
      to={to}
      className={`capitalize ${active ? "text-yellow-300" : "text-slate-50"}`}
    >
      {children}
    </Link>
  );
};

export const Breadcrumbs = () => {
  const matches = useMatches();

  const customHandler = matches.find<RouteMatchWithBreadCrumbsHandler>(
    (match): match is RouteMatchWithBreadCrumbsHandler =>
      match.handle?.breadcrumb
  );

  const location = useLocation();
  const subPaths = useMemo(() => {
    const pathname = location.pathname;
    let parts = pathname.split("/").slice(1);
    parts = parts.at(-1) === "" ? parts.slice(0, -1) : parts;
    return parts.map((_p, index) => parts.slice(0, index + 1).join("/"));
  }, [location.pathname]);

  const paths = useMemo(
    () =>
      [{ link: "/", text: "Home" }]
        .concat(
          subPaths.slice(0, customHandler ? -1 : undefined).map((link) => ({
            link,
            text: link.split("/").at(-1)!,
          }))
        )
        .concat(
          customHandler
            ? [
                {
                  link: location.pathname,
                  text: customHandler.handle.breadcrumb(
                    customHandler,
                    customHandler.data
                  ),
                },
              ]
            : []
        ),
    [customHandler, location.pathname, subPaths]
  );

  return (
    <nav className="mb-auto">
      <ol className="flex items-center gap-2">
        {paths.map((path, idx) => {
          const isLast = paths.length - 1 === idx;
          return (
            <Fragment key={path.text + idx}>
              <Breadcrumb to={path.link} active={isLast}>
                {path.text}
              </Breadcrumb>
              {!isLast && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11C1.44772 11 1 11.4477 1 12C1 12.5523 1.44772 13 2 13L2 11ZM22.7071 12.7071C23.0976 12.3166 23.0976 11.6834 22.7071 11.2929L16.3431 4.92893C15.9526 4.53841 15.3195 4.53841 14.9289 4.92893C14.5384 5.31946 14.5384 5.95262 14.9289 6.34315L20.5858 12L14.9289 17.6569C14.5384 18.0474 14.5384 18.6805 14.9289 19.0711C15.3195 19.4616 15.9526 19.4616 16.3431 19.0711L22.7071 12.7071ZM2 13L22 13V11L2 11L2 13Z"
                    fill="white"
                  />
                </svg>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
