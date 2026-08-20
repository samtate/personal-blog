export const SITE_TITLE = 'samtate';
export const SITE_DESCRIPTION =
  'Digital minimalism, hobbies, and whatever else interests me.';

export function postSlug(id: string) {
  return id.replace(/\/index$/, '');
}
