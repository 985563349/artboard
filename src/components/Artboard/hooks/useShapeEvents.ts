function useShapeEvents(
  listeners: Record<string, (...rest: any[]) => void>,
  config?: {
    lock?: boolean;
    providers?: any[];
  }
) {
  function trigger(this: any, e: { type: string }) {
    if (config?.lock == false) {
      listeners[e.type]?.apply(this, [e].concat(config?.providers ?? []));
    }
  }

  return trigger;
}

export default useShapeEvents;
