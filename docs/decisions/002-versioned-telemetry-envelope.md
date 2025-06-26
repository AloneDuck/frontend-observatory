# versioned telemetry envelope

Status: accepted

Require an explicit schema version so browser and collector deployments can evolve independently.

## Consequences

- The constraint is verified by runtime or test contracts.
- Exceptions require an explicit review and migration note.
- The public behavior remains observable without repository-specific tooling.
