'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Crosshair } from '@/components/crosshair';
import { useQueryTarget } from '@/hooks/use-query-target';

export function GamePlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-black">
      <Crosshair containerRef={containerRef} />
      <Target />
    </div>
  );
}

function Target() {
  const [url] = useQueryTarget();
  const [isShooted, setShooted] = useState(false);
  const [count, setCount] = useState(0);
  if (isShooted)
    return (
      <Image
        key="explosion"
        src={'/explosion.gif' + `?c=${count}`}
        alt="explosion"
        width={400}
        height={400}
        className="absolute inset-0 m-auto"
      />
    );
  return (
    <Image
      key="target"
      src={url}
      alt="target"
      width={160}
      height={160}
      className="absolute inset-0 m-auto rounded-full"
      onClick={() => {
        setShooted(true);
        setCount(count => count + 1);
        setTimeout(() => setShooted(false), 500);
      }}
    />
  );
}
