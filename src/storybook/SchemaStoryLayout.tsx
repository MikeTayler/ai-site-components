import type { ReactNode } from "react";
import "./SchemaStoryLayout.css";

export interface SchemaStoryLayoutProps {
  schema: Record<string, unknown>;
  children: ReactNode;
}

/** Renders JSON Schema beside the component (Canvas) for AI / validation reference. */
export function SchemaStoryLayout({ schema, children }: SchemaStoryLayoutProps) {
  return (
    <div className="schema-story-layout">
      <div className="schema-story-layout__canvas">{children}</div>
      <aside className="schema-story-layout__schema" aria-label="Component JSON Schema">
        <h2 className="schema-story-layout__title">JSON Schema</h2>
        <pre className="schema-story-layout__pre">{JSON.stringify(schema, null, 2)}</pre>
      </aside>
    </div>
  );
}
