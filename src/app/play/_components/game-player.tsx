'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Crosshair } from '@/components/crosshair';
import { randomId } from '@/utils/random-id';
import type { Nullable } from '@/types/utils';

export function GamePlayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [ids, setIds] = useState([randomId()]);

  useEffect(() => {
    const interval = setInterval(() => setIds(ids => ids.concat(randomId())), 1000);
    return () => clearInterval(interval);
  }, []);

  function handleClean(id: string) {
    return () => setIds(ids => ids.filter(i => i !== id));
  }
  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <Crosshair containerRef={containerRef} />
      {ids.map((id, idx) => (
        <Target key={id} containerRef={containerRef} onClean={handleClean(id)} zIndex={idx} />
      ))}
    </div>
  );
}

function Target({
  containerRef,
  onClean,
  zIndex,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  onClean: VoidFunction;
  zIndex: number;
}) {
  const params = useSearchParams();
  const url = params.get('target') || '/tom-no-bg.png';

  const [position, setPosition] = useState<Nullable<{ left: number; top: number }>>(null);

  const [elementSize] = useState({ width: 400, height: 400 });

  const [isShooted, setShooted] = useState(false);
  const [timtsestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    const leftMax = containerRect.width - elementSize.width;
    const topMax = containerRect.height - elementSize.height;

    setPosition({
      left: Math.floor(Math.random() * leftMax),
      top: Math.floor(Math.random() * topMax),
    });
  }, [containerRef, elementSize]);

  if (!position) {
    return null;
  }

  if (isShooted) {
    return (
      <Image
        key="explosion"
        src={'/explosion.gif' + `?ts=${timtsestamp}`}
        alt="explosion"
        {...elementSize}
        className="absolute"
        style={{ ...position, zIndex }}
      />
    );
  }

  return (
    <div
      className="absolute grid items-center justify-center bg-transparent"
      style={{ ...elementSize, ...position, zIndex }}
    >
      <Image
        key="target"
        src={url}
        alt="target"
        width={160}
        height={160}
        className="rounded-full"
        priority
        onClick={() => {
          setShooted(true);
          setTimestamp(Date.now());
          setTimeout(onClean, 500);
        }}
        onDragStart={event => event.preventDefault()}
      />
    </div>
  );
}
