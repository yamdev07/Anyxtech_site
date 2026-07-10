/**
 * Le champ "content" des actualités est stocké au format Lexical (l'éditeur
 * riche de Payload). Pour permettre l'édition depuis un simple textarea dans
 * le dashboard, on convertit du texte brut (paragraphes séparés par une
 * ligne vide) vers ce format, et inversement pour pré-remplir le formulaire.
 *
 * Limite assumée : la mise en forme riche existante (gras, liens, listes...)
 * n'est pas éditable depuis ce formulaire simplifié — seul le texte brut par
 * paragraphe l'est. Pour une mise en forme avancée, l'éditeur Payload
 * (/admin) reste disponible.
 */

interface LexicalTextNode {
  type: "text";
  format: number;
  style: string;
  mode: "normal";
  detail: number;
  version: number;
  text: string;
}

interface LexicalParagraphNode {
  type: "paragraph";
  format: string;
  indent: number;
  version: number;
  direction: "ltr";
  children: LexicalTextNode[];
}

export interface LexicalDoc {
  root: {
    type: "root";
    format: string;
    indent: number;
    version: number;
    direction: "ltr";
    children: LexicalParagraphNode[];
  };
}

export function textToLexical(text: string): LexicalDoc {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const children: LexicalParagraphNode[] = (paragraphs.length ? paragraphs : [""]).map((p) => ({
    type: "paragraph",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    children: [
      { type: "text", format: 0, style: "", mode: "normal", detail: 0, version: 1, text: p },
    ],
  }));

  return {
    root: { type: "root", format: "", indent: 0, version: 1, direction: "ltr", children },
  };
}

export function lexicalToText(doc: unknown): string {
  try {
    const root = (doc as LexicalDoc)?.root;
    if (!root?.children) return "";
    return root.children
      .map((node) =>
        (node.children || [])
          .map((c) => c.text || "")
          .join("")
      )
      .join("\n\n");
  } catch {
    return "";
  }
}
