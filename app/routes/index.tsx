import type { IParallax } from "@react-spring/parallax";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Link } from "@remix-run/react";
import { useRef } from "react";

export default function Index() {
  const ref = useRef<IParallax>(null);

  return (
    <>
      <Parallax pages={2} ref={ref}>
        <ParallaxLayer offset={0} speed={-0.5} factor={2}>
          <img
            src={`/landing/bg-1.png`}
            alt={"Blue sky background with a yellow sun."}
            className="fixed min-h-screen bg-blue-400 object-cover"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.3} factor={2}>
          <img
            src={`/landing/bg-2.png`}
            alt={"White clouds"}
            className="min-h-screen object-cover"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.1} factor={2}>
          <img
            src={`/landing/bg-3.png`}
            alt={"A horizontal range of trees in a dark green color"}
            className="min-h-screen object-cover"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.1} factor={2}>
          <img
            src={`/landing/bg-4.png`}
            alt={"A horizontal range of trees in a light green color"}
            className="absolute min-h-screen object-cover"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0.8} speed={0} factor={2}>
          <div className="flex h-full flex-col bg-[#287504] p-4">
            <div className="pb-10">
              <h1 className="text-4xl text-slate-100 underline">
                Sommarprat-ui.
              </h1>
              <h2 className=" text-xl text-slate-300">
                En sammanställning av värdarnas musikval i Sommar i P1.
              </h2>
            </div>

            {/*<div>
              <p className="text-m  text-slate-200">
                Gå till{" "}
                <Link className="underline" to="playlists">
                  /playlists
                </Link>{" "}
                för att se alla års och välj vilket år som intresserar dig.
                Eller varför inte hoppa till{" "}
                <Link className="underline" to="playlists/2015">
                  2015
                </Link>{" "}
                direkt?
              </p>
  </div>*/}
          </div>
        </ParallaxLayer>
      </Parallax>
    </>
  );
}
