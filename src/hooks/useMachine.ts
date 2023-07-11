import { useEffect, useRef } from 'react';

function useMachine(
  state: string,
  machines: Record<string, (...args: any[]) => Record<string, Function>>,
  config?: {
    lock?: boolean;
    providers?: any[];
  }
) {
  const { lock = false, providers = [] } = config ?? {};
  const actionsRef = useRef<any>(null);

  useEffect(() => {
    const actions: any = {};

    Object.entries(machines).forEach(([type, machine]) => {
      actions[type] = machine.apply(null, providers);
    });

    actionsRef.current = actions;
  }, [machines, ...providers]);

  function trigger(this: any, e: { type: string }) {
    if (lock || !state) {
      return;
    }
    const handler = actionsRef.current?.[state]?.[e.type];
    handler?.call(this, e);
  }

  return trigger;
}

export default useMachine;
