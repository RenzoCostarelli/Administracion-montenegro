import Lenis from "lenis";

let _lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return _lenis;
}

export function initLenis() {
  _lenis = new Lenis();
  const lenis = _lenis;

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  if (document.getElementById("loader")) {
    lenis.stop();
  }

  window.addEventListener("loader:done", () => {
    lenis.start();
  });

  document.addEventListener("astro:after-swap", () => {
    lenis.scrollTo(0, { immediate: true });
  });

  return lenis;
}
