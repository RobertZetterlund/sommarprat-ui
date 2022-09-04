import type { ReactNode } from "react";
import { useCallback, useMemo, useRef } from "react";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";

interface BarItem {
  id: string;
  value: number;
  label: ReactNode;
  tooltip?: ReactNode;
}

export const Bar = ({ items }: { items: BarItem[] }) => {
  const maxValue = useMemo(
    () => Math.max(...items.map((i) => i.value)),
    [items]
  );
  const ref = useRef<HTMLTableElement>(null);
  const observer = useIntersectionObserver(ref, {
    freezeOnceVisible: true,
    threshold: 0.05,
  });

  const isInView = observer?.isIntersecting;

  const style = useCallback(
    (item: BarItem) =>
      isInView
        ? { width: `${(70 * item.value) / maxValue}%` }
        : { width: "0%" },
    [maxValue, isInView]
  );

  return (
    <table ref={ref} className="w-full">
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className="flex flex-col justify-center gap-1 md:flex-row md:items-center"
          >
            <td className="pb-2 md:w-[40%] md:text-right">{item.label}</td>
            <td className="flex w-full items-center gap-1 self-end pb-2">
              <span
                className="inline-block h-4 w-4 rounded bg-gradient-to-tr from-yellow-500 to-yellow-300 transition-[width] delay-300 duration-500"
                style={style(item)}
              />
              <span
                className="text-inherit opacity-0 delay-300 duration-200"
                style={isInView ? { opacity: 1 } : undefined}
              >
                {item.value}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
