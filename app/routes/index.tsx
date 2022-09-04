import type { IParallax } from "@react-spring/parallax";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";
import { Header } from "../components/layout/header";

export default function Index() {
  const ref = useRef<IParallax>(null);

  return (
    <div className="bg-[#236C02]">
      <Parallax pages={2} ref={ref}>
        <ParallaxLayer sticky={{ start: 0, end: 2 }}>
          <Header />
        </ParallaxLayer>
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
        <ParallaxLayer offset={0.8} speed={0} factor={2}>
          <div className="flex h-full flex-col bg-[#236C02] px-4">
            <div className="flex flex-col gap-2 pb-10">
              <h1 className="text-5xl text-slate-100 ">Sommarprat-ui.</h1>
              <h2 className=" text-xl text-slate-200">
                En sammanställning av värdarnas musikval i Sommar i P1.
              </h2>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
