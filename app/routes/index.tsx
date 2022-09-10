import type { IParallax } from "@react-spring/parallax";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";

const pages = 4;

export default function Index() {
  const ref = useRef<IParallax>(null);

  return (
    <div className="bg-[#236C02]">
      <Parallax pages={pages} ref={ref}>
        <ParallaxLayer offset={0.02} speed={-0.5} factor={1}>
          <img
            src={`/landing/bg-1.svg`}
            alt={"Blue sky background with a yellow sun."}
            className="fixed min-h-screen min-w-full bg-gradient-to-b from-[#1b3e6a] to-[#236C02] object-cover"
            width={1512}
            height={982}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.3} factor={2}>
          <img
            src={`/landing/bg-2.svg`}
            alt={"White clouds"}
            className="min-h-screen min-w-full object-cover"
            width={1512}
            height={982}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.1} factor={2}>
          <img
            src={`/landing/bg-3.svg`}
            alt={"A horizontal range of trees in a dark green color"}
            className="min-h-screen min-w-full object-cover"
            width={1512}
            height={982}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.1} factor={2}>
          <img
            src={`/landing/bg-4.svg`}
            alt={"A horizontal range of trees in a light green color"}
            className="absolute min-h-screen min-w-full object-cover"
            width={1512}
            height={982}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0.83} speed={0} factor={pages}>
          <div className="flex h-full flex-col bg-[#236C02] px-4">
            <div className="flex flex-col gap-2 pb-10">
              <h1 className="text-5xl text-slate-100 ">Sommarprat-ui.</h1>
              <h2 className=" text-xl text-slate-200">
                En sammanställning av värdarnas musikval i Sommar i P1.
              </h2>
            </div>

            <div className="mt-4 flex gap-2 rounded bg-slate-900 bg-opacity-40 p-4 text-slate-100">
              <svg
                className="shrink-0 self-center"
                stroke="white"
                fill="white"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
              </svg>
              <p>
                Sommar i P1 is one of the biggest radio shows in Sweden and a
                staple in Swedish culture. Everyone knows the well-known
                signature and the show itself. It is on air every year during
                the summer, and has been ever since its start in 1959. The show
                is made up by interesting Swedish-speaking persons who get free
                hands to create their own hour and a half-long show. They get to
                choose their own music and what they want to talk about. Being a
                host on Sommar i P1 has been compared to receiving a knighthood
                in Sweden.
              </p>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
