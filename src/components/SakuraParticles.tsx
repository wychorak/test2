import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useStore } from "../store/useStore";

export function SakuraParticles() {
  const [init, setInit] = useState(false);
  const sakuraStorm = useStore((state) => state.sakuraStorm);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 pointer-events-none z-50"
      options={{
        fullScreen: { enable: false },
        particles: {
          color: {
            value: ["#E8B4BC", "#ffffff", "#f4d1d6"],
          },
          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: sakuraStorm ? 15 : 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: sakuraStorm ? 300 : 30,
          },
          opacity: {
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
            value: { min: 0.1, max: 0.8 },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 4 },
          },
          wobble: {
            enable: true,
            distance: 10,
            speed: 10,
          },
        },
        detectRetina: true,
      }}
    />
  );
}
