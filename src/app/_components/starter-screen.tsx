'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchImage } from '@/utils/fetch-image';
import { runPromise } from '@/utils/run-promise';

export function StarterScreen() {
  const [target, setTarget] = useState('');
  const [input, getInputValue] = useInputElRef();
  async function handleImage() {
    const url = getInputValue();
    if (!url) return;
    const [isOk] = await runPromise(fetchImage(url));
    if (!isOk) return;
    setTarget(url);
  }

  const queries: Record<string, string> = { target };
  if (!target) delete queries.target;

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <input
          ref={input}
          className="flex h-9 w-96 min-w-0 rounded-md border bg-neutral-100 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-neutral-100 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Your target link"
        />
        <button className="btn h-9" onClick={handleImage}>
          Use
        </button>
      </div>
      <Image src={target || '/tom-no-bg.png'} alt="target url" width={160} height={160} priority />
      <Link
        href={{ pathname: '/play', query: queries }}
        className="btn h-12 px-10 text-xl font-bold"
      >
        Start
      </Link>
    </div>
  );
}

function useInputElRef() {
  const ref = useRef<HTMLInputElement>(null);
  function getValue() {
    if (!ref.current) {
      throw new Error('Can not access ref.current while rendering');
    }
    return ref.current.value;
  }
  return [ref, getValue] as const;
}
