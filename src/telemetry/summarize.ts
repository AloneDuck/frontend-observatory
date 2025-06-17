import type { MetricName, MetricObservation } from "../domain/telemetry.js";

export interface MetricSummary { name: MetricName; p75: number; samples: number; trend: "stable" | "regressed" }

export function summarize(observations: MetricObservation[], baseline: Partial<Record<MetricName, number>> = {}): MetricSummary[] {
  return (["LCP", "INP", "CLS", "TTFB"] as const).flatMap((name) => {
    const values = observations.filter((item) => item.name === name).map((item) => item.value).sort((a, b) => a - b);
    if (!values.length) return [];
    const p75 = values[Math.min(values.length - 1, Math.ceil(values.length * 0.75) - 1)]!;
    return [{ name, p75, samples: values.length, trend: baseline[name] !== undefined && p75 > baseline[name]! * 1.1 ? "regressed" as const : "stable" as const }];
  });
}
