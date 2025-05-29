'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryTarget } from '@/hooks/use-query-target';

export function StarterScreen() {
  const [target, setTarget] = useQueryTarget();

  const input = useRef<HTMLInputElement>(null);

  return (
    <div>
      <GameName />
      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <input
            className="flex h-9 w-96 min-w-0 rounded-md border bg-neutral-100 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-neutral-100 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            ref={input}
            placeholder="Your target link"
          />
          <button className="btn h-9" onClick={() => setTarget(input.current?.value)}>
            Use
          </button>
        </div>
        <Image src={target} alt="target url" width={160} height={160} priority />
        <Link
          href={{ pathname: '/play', query: { target } }}
          className="btn h-12 px-10 text-xl font-bold"
        >
          Start
        </Link>
      </div>
    </div>
  );
}

function GameName({
  fontSize = 'clamp(2rem, 8vw, 8rem)',
  enableHover = true,
}: {
  fontSize?: number | string;
  enableHover?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement & { cleanup?: () => void }>(null);

  useEffect(() => {
    let animationFrameId: number;
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const computedFontFamily = window.getComputedStyle(canvas).fontFamily || 'sans-serif';

      const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
      let numericFontSize: number;

      if (typeof fontSize === 'number') {
        numericFontSize = fontSize;
      } else {
        const temp = document.createElement('span');
        temp.style.fontSize = fontSize;
        document.body.appendChild(temp);
        const computedSize = window.getComputedStyle(temp).fontSize;
        numericFontSize = parseFloat(computedSize);
        document.body.removeChild(temp);
      }

      const text = 'Shooting game';

      const offscreen = document.createElement('canvas'),
        offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      const fontWeight = 900;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      const metrics = offCtx.measureText(text);

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0,
        actualRight = metrics.actualBoundingBoxRight ?? metrics.width,
        actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize,
        actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(actualLeft + actualRight),
        tightHeight = Math.ceil(actualAscent + actualDescent);

      const extraWidthBuffer = 10,
        offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = '#ffffff';
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);

      const horizontalMargin = 50,
        verticalMargin = 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      ctx.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset,
        interactiveTop = verticalMargin,
        interactiveRight = interactiveLeft + textBoundingWidth,
        interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false;
      const fuzzRange = 30;

      const run = () => {
        if (isCancelled) return;
        ctx.clearRect(
          -fuzzRange,
          -fuzzRange,
          offscreenWidth + 2 * fuzzRange,
          tightHeight + 2 * fuzzRange,
        );
        const baseIntensity = 0.18,
          hoverIntensity = 0.5;
        const intensity = isHovering ? hoverIntensity : baseIntensity;
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
        }
        animationFrameId = window.requestAnimationFrame(run);
      };

      run();

      const isInsideTextArea = (x: number, y: number) =>
        x >= interactiveLeft &&
        x <= interactiveRight &&
        y >= interactiveTop &&
        y <= interactiveBottom;

      const handleMouseMove = (event: MouseEvent) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleMouseLeave = () => {
        isHovering = false;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!enableHover) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleTouchEnd = () => {
        isHovering = false;
      };

      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);
      }

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseleave', handleMouseLeave);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
        }
      };

      canvas.cleanup = cleanup;
    };

    init();

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrameId);
      if (canvas.cleanup) {
        canvas.cleanup();
      }
    };
  }, [enableHover, fontSize]);

  return <canvas ref={canvasRef} height={110} />;
}
