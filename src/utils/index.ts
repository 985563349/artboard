export function shallowEqual(value: any, other: any): boolean {
  if (Object.is(value, other)) {
    return true;
  }

  if (typeof value !== 'object' || value === null || typeof other !== 'object' || other === null) {
    return false;
  }

  const keysA = Object.keys(value);
  const keysB = Object.keys(other);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.hasOwnProperty.call(other, keysA[i]) ||
      !Object.is(value[keysA[i]], other[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}

export function rgbToHex(rgb: string) {
  const matchArray = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)/) ?? [];
  if (!matchArray.length) {
    return null;
  }
  const [, r, g, b] = matchArray;
  return '#' + ((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1);
}
