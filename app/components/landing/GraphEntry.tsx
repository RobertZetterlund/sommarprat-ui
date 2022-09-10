import type { ReactNode } from "react";

export const GraphEntry = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-12 flex w-full flex-col justify-between gap-12 text-slate-50">
      {children}
    </div>
  );
};
