import { useState, useCallback, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import { useSpring, animated } from "@react-spring/web";
import useElementSize from "../../../../hooks/useElementSize";

interface BarItem {
  id: string;
  value: number;
  label: ReactNode;
  tooltip?: ReactNode;
}

// Urgh, this is kinda how it is done in tailwind???
const barColors = {
  orange: "from-orange-500 to-orange-300",
  red: "from-red-500 to-red-300",
  yellow: "from-yellow-500 to-yellow-300",
} as const;

export const Bar = ({
  items,
  color,
  noAnimation = false,
}: {
  items: BarItem[];
  color: "orange" | "red" | "yellow";
  noAnimation?: boolean;
}) => {
  const maxValue = useMemo(
    () => Math.max(...items.map((i) => i.value)),
    [items]
  );

  const inViewRef = useRef<HTMLDivElement>(null);
  const [sizeRef, { height }] = useElementSize();
  const observer = useIntersectionObserver(inViewRef, {
    freezeOnceVisible: true,
    threshold: 0.05,
  });

  const isInView = observer?.isIntersecting || noAnimation;

  const style = useCallback(
    (item: BarItem) =>
      isInView
        ? { width: `${(70 * item.value) / maxValue}%` }
        : { width: "0%" },
    [maxValue, isInView]
  );

  const [showMore, setShowMore] = useState<boolean>(false);

  const tableStyles = useSpring({
    height: showMore ? height : 500,
    config: {
      duration: 1000,
    },
  });

  const buttonStyles = useSpring({
    opacity: showMore ? 0 : 1,
    config: {
      duration: 200,
    },
  });

  return (
    <animated.div
      ref={inViewRef}
      style={tableStyles}
      className="relative overflow-hidden"
    >
      <table ref={sizeRef} className="w-full">
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="flex flex-col justify-center gap-1 md:flex-row md:items-center"
            >
              <td className="pb-2 md:w-[40%] md:text-right">{item.label}</td>
              <td className="flex w-full items-center gap-1 self-end pb-2">
                <span
                  className={`inline-block h-4 w-4 rounded bg-gradient-to-tr ${barColors[color]} transition-[width] delay-100 duration-500`}
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
      <animated.div
        className={`absolute bottom-0 flex h-24 w-full items-center justify-center rounded bg-gradient-to-t from-[#1b3e6a] ${
          showMore && "pointer-events-none"
        }`}
        style={buttonStyles}
      >
        <button
          className="flex h-full w-full items-end justify-center"
          onClick={() => setShowMore(true)}
        >
          <span className="rounded border px-4 hover:opacity-95">
            Expandera
          </span>
        </button>
      </animated.div>
    </animated.div>
  );
};
