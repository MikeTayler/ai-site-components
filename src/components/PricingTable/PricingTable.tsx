import "./PricingTable.css";
import type { ReactNode } from "react";
import { joinPath } from "../../lib/joinPath.js";

export type PricingTableVariant = "tier-cards" | "comparison" | "simple";

export interface PricingTier {
  name: string;
  price: string;
  currency?: string;
  features: string[];
  cta?: { label: string; href: string };
}

export interface PricingTableContent {
  heading?: string;
  tiers: PricingTier[];
}

export interface PricingTableSettings {
  maxWidth?: "narrow" | "wide" | "full";
}

export interface PricingTableProps {
  variant: PricingTableVariant;
  content: PricingTableContent;
  settings?: PricingTableSettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<PricingTableSettings> = {
  maxWidth: "wide",
};

export default function PricingTable(props: PricingTableProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { heading, tiers } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  const allFeatures =
    variant === "comparison" ? Array.from(new Set(tiers.flatMap((t) => t.features))) : [];

  return (
    <section
      className={["pricingTable", `pricingTable--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-max-width={settings.maxWidth}
    >
      <div className="pricingTable_inner">
        {heading ? (
          <h2 className="pricingTable_heading" data-content-path={p("content.heading")}>
            {heading}
          </h2>
        ) : null}
        {variant === "comparison" && tiers.length > 0 ? (
          <div className="pricingTable_compareWrap">
            <table className="pricingTable_table">
              <thead>
                <tr>
                  <th className="pricingTable_th" scope="col">
                    Feature
                  </th>
                  {tiers.map((tier, ti) => (
                    <th key={ti} className="pricingTable_th" scope="col">
                      <span data-content-path={p(`content.tiers[${ti}].name`)}>{tier.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feat, fi) => (
                  <tr key={fi}>
                    <td className="pricingTable_td">{feat}</td>
                    {tiers.map((tier, ti) => (
                      <td key={ti} className="pricingTable_td">
                        {tier.features.includes(feat) ? "✓" : "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className="pricingTable_tiers">
            {tiers.map((tier, ti) => (
              <li key={ti} className="pricingTable_tier">
                <h3
                  className="pricingTable_tierName"
                  data-content-path={p(`content.tiers[${ti}].name`)}
                >
                  {tier.name}
                </h3>
                <p className="pricingTable_price">
                  {tier.currency ? (
                    <span
                      className="pricingTable_currency"
                      data-content-path={p(`content.tiers[${ti}].currency`)}
                    >
                      {tier.currency}
                    </span>
                  ) : null}{" "}
                  <span data-content-path={p(`content.tiers[${ti}].price`)}>{tier.price}</span>
                </p>
                <ul className="pricingTable_features">
                  {tier.features.map((f, fi) => (
                    <li key={fi} data-content-path={p(`content.tiers[${ti}].features[${fi}]`)}>
                      {f}
                    </li>
                  ))}
                </ul>
                {tier.cta ? (
                  <a
                    className="pricingTable_cta"
                    href={tier.cta.href}
                    data-content-path={p(`content.tiers[${ti}].cta.label`)}
                  >
                    {tier.cta.label}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
