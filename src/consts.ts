export const SITE_NAME = 'Sam Tate';
export const SITE_BRAND = 'samtate';
export const SITE_TITLE = 'Sam Tate | Digital Minimalism, Dumbphones and Self-Hosting';
export const SITE_DESCRIPTION =
  'Sam Tate writes about digital minimalism, dumbphones, self-hosting, technology, and rebuilding everyday life around fewer apps and interruptions.';

export function postSlug(id: string) {
  return id.replace(/\/index$/, '');
}
