# release aware baselines

Status: accepted

Compare each release with a named baseline instead of mixing unrelated traffic windows.

## Consequences

- The constraint is verified by runtime or test contracts.
- Exceptions require an explicit review and migration note.
- The public behavior remains observable without repository-specific tooling.
