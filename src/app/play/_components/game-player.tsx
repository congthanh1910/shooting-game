'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Crosshair } from '@/components/crosshair';
import { useQueryTarget } from '@/hooks/use-query-target';

export function GamePlayer() {
  const [target] = useQueryTarget();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isExploded, setExploded] = useState(false);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-black">
      <Crosshair containerRef={containerRef} />
      {isExploded ? (
        <Image
          src="/explosion.gif"
          alt="explosion"
          width={400}
          height={400}
          className="absolute inset-0 m-auto"
        />
      ) : (
        <Image
          src={target}
          alt="target url"
          width={160}
          height={160}
          className="absolute inset-0 m-auto rounded-full"
          onClick={() => {
            setExploded(true);
            setTimeout(() => setExploded(false), 1000);
          }}
        />
      )}
    </div>
  );
}
