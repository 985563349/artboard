function useMachine(
  state: string,
  commands: Record<string, (...args: any[]) => Record<string, Function>>,
  config?: {
    lock?: boolean;
    providers?: any[];
  }
) {
  const { lock, providers } = config ?? {};

  function trigger(this: any, e: { type: string }) {
    if (lock == false && state) {
      const command = commands[state]?.apply(null, providers ?? []);
      command?.[e.type]?.call(this, e);
    }
  }

  return trigger;
}

export default useMachine;
