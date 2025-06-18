import { describe, expect, it } from "vitest";
import { isTelemetryEnvelope } from "../src/domain/telemetry.js";
import { ingestTelemetry } from "../src/collector/ingest.js";

const valid = { version: "1", sessionId: "anon-12345", observations: [{ name: "LCP", value: 2100, rating: "good", route: "/checkout", release: "r42", observedAt: "2026-08-30T09:00:00Z" }] };
describe("telemetry.v1", () => {
  it("accepts privacy-bounded observations", () => expect(isTelemetryEnvelope(valid)).toBe(true));
  it("rejects query strings and oversized batches", () => { expect(isTelemetryEnvelope({ ...valid, observations: [{ ...valid.observations[0], route: "/checkout?email=x" }] })).toBe(false); expect(ingestTelemetry(valid, 32_769)).toMatchObject({ accepted: false, status: 413 }); });
});
