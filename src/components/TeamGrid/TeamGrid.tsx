import "./TeamGrid.css";
import type { ReactNode } from "react";
import { joinPath } from "../../lib/joinPath.js";

export type TeamGridVariant = "cards" | "headshots" | "detailed";

export interface TeamMember {
  name: string;
  role?: string;
  bio?: string;
}

export interface TeamGridContent {
  heading?: string;
  members: TeamMember[];
}

export interface TeamGridSettings {
  maxWidth?: "narrow" | "wide" | "full";
}

export interface TeamGridProps {
  variant: TeamGridVariant;
  content: TeamGridContent;
  settings?: TeamGridSettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<TeamGridSettings> = {
  maxWidth: "wide",
};

export default function TeamGrid(props: TeamGridProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { heading, members } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  return (
    <section
      className={["teamGrid", `teamGrid--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-max-width={settings.maxWidth}
    >
      <div className="teamGrid_inner">
        {heading ? (
          <h2 className="teamGrid_heading" data-content-path={p("content.heading")}>
            {heading}
          </h2>
        ) : null}
        <ul className="teamGrid_list">
          {members.map((member, i) => (
            <li key={i} className="teamGrid_card">
              <div className="teamGrid_avatar" aria-hidden />
              <div className="teamGrid_meta">
                <h3 className="teamGrid_name" data-content-path={p(`content.members[${i}].name`)}>
                  {member.name}
                </h3>
                {member.role ? (
                  <p className="teamGrid_role" data-content-path={p(`content.members[${i}].role`)}>
                    {member.role}
                  </p>
                ) : null}
                {member.bio && (variant === "detailed" || variant === "cards") ? (
                  <p className="teamGrid_bio" data-content-path={p(`content.members[${i}].bio`)}>
                    {member.bio}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
