'use client';

import { useEffect, useState } from 'react';

export function RandomElement({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    const maxLeft = rect.width - 100; // 100 is element width
    const maxTop = rect.height - 100; // 100 is element height

    const left = Math.floor(Math.random() * maxLeft);
    const top = Math.floor(Math.random() * maxTop);

    setPosition({ top, left });
  }, [containerRef]);

  if (position.top === 0) {
    return null;
  }

  return (
    <div
      style={{
        top: position.top,
        left: position.left,
        width: 100,
        height: 100,
        backgroundColor: 'tomato',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
      }}
      className="absolute"
    >
      Random Box
    </div>
  );
}
