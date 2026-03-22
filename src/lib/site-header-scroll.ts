export type SiteHeaderState = {
  hidden: boolean;
  scrolled: boolean;
};

type ResolveSiteHeaderStateInput = {
  currentY: number;
  previousY: number;
  hidden: boolean;
  reducedMotion?: boolean;
};

const HEADER_SCROLLED_THRESHOLD = 12;
const HEADER_HIDE_START = 112;
const HEADER_TOP_REVEAL_THRESHOLD = 24;
const HEADER_SCROLL_DELTA_THRESHOLD = 6;

export function resolveSiteHeaderState({
  currentY,
  previousY,
  hidden,
  reducedMotion = false,
}: ResolveSiteHeaderStateInput): SiteHeaderState {
  const scrolled = currentY > HEADER_SCROLLED_THRESHOLD;

  if (reducedMotion) {
    return {
      hidden: false,
      scrolled,
    };
  }

  if (currentY <= HEADER_TOP_REVEAL_THRESHOLD) {
    return {
      hidden: false,
      scrolled,
    };
  }

  if (currentY <= HEADER_HIDE_START) {
    return {
      hidden: false,
      scrolled,
    };
  }

  const delta = currentY - previousY;

  if (Math.abs(delta) < HEADER_SCROLL_DELTA_THRESHOLD) {
    return {
      hidden,
      scrolled,
    };
  }

  if (delta > 0) {
    return {
      hidden: true,
      scrolled,
    };
  }

  return {
    hidden: false,
    scrolled,
  };
}
