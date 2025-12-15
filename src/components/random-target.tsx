"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Nullable } from "@/types/utils";

export function RandomTarget({
  containerRef,
  onClean,
  zIndex,
}: {
  containerRef: React.RefObject<Nullable<HTMLElement>>;
  onClean: VoidFunction;
  zIndex: number;
}) {
  const url = useTargetUrl();

  const [position, setPosition] = useState<Nullable<Position>>(null);

  const [isShooted, setShooted] = useState(false);
  const [timestamp] = useState(() => Date.now());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    setPosition(calcPosition(container.getBoundingClientRect()));
  }, [containerRef]);

  if (!position) return null;

  if (isShooted)
    return (
      <Image
        key="explosion"
        src={"/explosion.gif?t=" + timestamp}
        alt="explosion"
        {...elementSize}
        className="absolute"
        style={{ ...position, zIndex }}
      />
    );

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
          setTimeout(onClean, 500);
        }}
        onDragStart={(event) => event.preventDefault()}
      />
    </div>
  );
}

function useTargetUrl() {
  // const params = useSearchParams();
  // return params.get("target") || "/tom-no-bg.png";
  return "/tom-no-bg.png";
}

const elementSize = { width: 400, height: 400 };

function calcPosition(containerRect: DOMRect): Position {
  const leftMax = containerRect.width - elementSize.width;
  const topMax = containerRect.height - elementSize.height;
  return {
    left: Math.floor(Math.random() * leftMax),
    top: Math.floor(Math.random() * topMax),
  };
}
type Position = { left: number; top: number };
