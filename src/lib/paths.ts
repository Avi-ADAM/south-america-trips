import { base } from '$app/paths';

/** Prefix a site-absolute path ("/img/x.jpg") with the deploy base path. */
export const u = (path: string) => `${base}${path}`;
