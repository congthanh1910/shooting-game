"use client";

import { useEffect, useRef, useState } from "react";
import { Crosshair } from "@/components/crosshair";
import { RandomTarget } from "@/components/random-target";
import { randomId } from "@/utils/random-id";

export function GamePlayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [ids, setIds] = useState([randomId()]);

  useEffect(() => {
    const create = () => setIds((ids) => ids.concat(randomId()));
    const interval = setInterval(create, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <Crosshair containerRef={containerRef} />
      {ids.map((id, idx) => (
        <RandomTarget
          key={id}
          containerRef={containerRef}
          onClean={() => setIds((ids) => ids.filter((i) => i !== id))}
          zIndex={idx + 1}
        />
      ))}
    </div>
  );
}
