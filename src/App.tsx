import { useMemo, useState } from "react";
import { summarize } from "./telemetry/summarize.js";
import type { MetricObservation } from "./domain/telemetry.js";
import "./styles.css";

const observations: MetricObservation[] = [
  { name: "LCP", value: 2140, rating: "good", route: "/checkout", release: "2026.08.30", observedAt: "2026-08-30T09:00:00Z" },
  { name: "INP", value: 182, rating: "good", route: "/checkout", release: "2026.08.30", observedAt: "2026-08-30T09:01:00Z" },
  { name: "CLS", value: 0.08, rating: "good", route: "/catalog", release: "2026.08.30", observedAt: "2026-08-30T09:02:00Z" },
  { name: "TTFB", value: 840, rating: "needs-improvement", route: "/catalog", release: "2026.08.30", observedAt: "2026-08-30T09:03:00Z" }
];

export default function App() {
  const [route, setRoute] = useState("all");
  const visible = route === "all" ? observations : observations.filter((item) => item.route === route);
  const summaries = useMemo(() => summarize(visible, { LCP: 1900, INP: 170, CLS: 0.1, TTFB: 780 }), [visible]);
  return <main>
    <header><p className="eyebrow">Release intelligence</p><h1>Frontend Observatory</h1><p>Field metrics and performance budgets without collecting personal data.</p></header>
    <section className="toolbar" aria-label="Dashboard filters"><label htmlFor="route">Route</label><select id="route" value={route} onChange={(event) => setRoute(event.target.value)}><option value="all">All routes</option><option value="/checkout">Checkout</option><option value="/catalog">Catalog</option></select><span role="status">Release 2026.08.30 · {visible.length} observations</span></section>
    <section aria-labelledby="vitals-title"><h2 id="vitals-title">Web Vitals p75</h2><div className="grid">{summaries.map((metric) => <article key={metric.name} className={metric.trend}><div><h3>{metric.name}</h3><span className="badge">{metric.trend}</span></div><strong>{metric.p75}</strong><p>{metric.samples} field sample{metric.samples === 1 ? "" : "s"}</p></article>)}</div></section>
  </main>;
}
