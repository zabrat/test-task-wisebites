export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => func.apply(this, args), waitFor);
  };
}
