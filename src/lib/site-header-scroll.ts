export type SiteHeaderState = {
  hidden: boolean;
  scrolled: boolean;
  showBackToTop: boolean;
  withinTopRange: boolean;
};

type ResolveSiteHeaderStateInput = {
  currentY: number;
};

const HEADER_SCROLLED_THRESHOLD = 12;
export const SITE_CHROME_TOP_VISIBILITY_THRESHOLD = 96;

export function resolveSiteHeaderState({
  currentY,
}: ResolveSiteHeaderStateInput): SiteHeaderState {
  const scrolled = currentY > HEADER_SCROLLED_THRESHOLD;
  const withinTopRange = currentY <= SITE_CHROME_TOP_VISIBILITY_THRESHOLD;

  return {
    hidden: !withinTopRange,
    scrolled,
    showBackToTop: !withinTopRange,
    withinTopRange,
  };
}
