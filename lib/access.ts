/** Vrai uniquement si la requête vient d'un administrateur connecté. */
export const isAdmin = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);
