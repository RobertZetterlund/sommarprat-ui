import { useRef } from "react";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";

export const Placement = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.5,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <div
      ref={ref}
      className="grid h-80 w-full grid-cols-3 items-end gap-4 overflow-hidden bg-white px-4"
    >
      <div
        className={`h-36 bg-[#1F7FF3] text-center transition-transform delay-150 duration-700 ${
          !isVisible && "translate-y-36"
        }`}
      >
        2nd
      </div>
      <div
        className={`h-52 bg-[#1F7FF3] text-center transition-transform delay-150 duration-1000 ${
          !isVisible && "translate-y-52"
        }`}
      >
        1st
      </div>
      <div
        className={`h-24 bg-[#1F7FF3] text-center transition-transform delay-150 duration-500 ${
          !isVisible && "translate-y-24"
        }`}
      >
        3rd
      </div>
    </div>
  );
};
