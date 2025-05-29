import { useQueryState } from 'nuqs';
import { z } from 'zod';

const defaultTarget = '/tom-no-bg.png';

export function useQueryTarget() {
  const [target, set] = useQueryState('target', { defaultValue: defaultTarget });
  function setTarget(value?: string) {
    try {
      if (!value) throw new Error();
      value = z.string().url().parse(value);
      set(value);
    } catch {
      set(defaultTarget);
    }
  }
  return [target, setTarget] as const;
}
