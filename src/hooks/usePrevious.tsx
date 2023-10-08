import { useEffect, useRef } from "react";

export function usePrevious<V>(value: V): V | undefined {
  const ref = useRef<V>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
