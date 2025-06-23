# privacy bounded routes

Status: accepted

Store normalized route templates and reject query strings or user identifiers at ingestion.

## Consequences

- The constraint is verified by runtime or test contracts.
- Exceptions require an explicit review and migration note.
- The public behavior remains observable without repository-specific tooling.
