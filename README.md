# Frontend Observatory

A release-aware Web Vitals platform. It accepts a versioned telemetry envelope, rejects malformed or oversized batches, evaluates route budgets, and exposes regressions in an accessible dashboard.

## Quality gates

`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e` exercise the public contracts.
