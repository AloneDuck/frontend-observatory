export const telemetryVersion = "1" as const;
export const metricNames = ["LCP", "INP", "CLS", "TTFB"] as const;
export type MetricName = typeof metricNames[number];

export interface MetricObservation { name: MetricName; value: number; rating: "good" | "needs-improvement" | "poor"; route: string; release: string; observedAt: string }
export interface TelemetryEnvelope { version: typeof telemetryVersion; sessionId: string; observations: MetricObservation[] }

export function isTelemetryEnvelope(value: unknown): value is TelemetryEnvelope {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<TelemetryEnvelope>;
  return candidate.version === telemetryVersion && typeof candidate.sessionId === "string" && candidate.sessionId.length >= 8 && Array.isArray(candidate.observations) && candidate.observations.length > 0 && candidate.observations.length <= 50 && candidate.observations.every((item) => metricNames.includes(item.name) && Number.isFinite(item.value) && item.value >= 0 && /^\/[a-z0-9/_-]*$/i.test(item.route) && !item.route.includes("?") && typeof item.release === "string" && !Number.isNaN(Date.parse(item.observedAt)));
}
