import { isTelemetryEnvelope, type TelemetryEnvelope } from "../domain/telemetry.js";

export type IngestResult = { accepted: true; envelope: TelemetryEnvelope } | { accepted: false; status: 400 | 413; reason: string };

export function ingestTelemetry(body: unknown, encodedBytes: number): IngestResult {
  if (encodedBytes > 32_768) return { accepted: false, status: 413, reason: "payload exceeds 32 KiB" };
  if (!isTelemetryEnvelope(body)) return { accepted: false, status: 400, reason: "payload does not satisfy telemetry.v1" };
  return { accepted: true, envelope: body };
}
