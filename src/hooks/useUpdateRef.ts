import { useRef } from 'react';
import type { MutableRefObject, RefObject } from 'react';

export function useUpdateRef<T>(value: T): MutableRefObject<T>;
export function useUpdateRef<T>(value: T | null): RefObject<T>;
export function useUpdateRef<T = undefined>(): MutableRefObject<T | undefined>;

export function useUpdateRef(value?: any) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}
