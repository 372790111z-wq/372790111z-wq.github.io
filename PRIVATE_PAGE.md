# Private page deployment

`/private/training` is handled by `api/training.js`. Public files contain a generic
password form and an AES-256-GCM encrypted payload only. The deployment environment
variable `FITNESS_PRIVATE_CONFIG` (Secret, Production) holds the independent content
key, salted password verifier, and session signing key. Never commit its value.

Private content is edited outside this public repository. To regenerate the payload:

```sh
node scripts/pack-fitness.cjs /absolute/local/private/source /absolute/local/private/config.json
```

Commit only the encrypted output. The packer does not read or embed the local docs,
record backups, or annotation archives. Existing sessions expire after 12 hours;
logout expires the browser cookie. Failed-attempt limits are in-process best effort,
not a distributed rate limiter. Content responses are no-store and noindex.

The Git repository also deploys to a second Vercel project. A project without this
secret fails closed for the private route. Main-site static pages are unchanged.
The v3 implementation used browser-local records. Version 4 adds the protected
synchronization service described below. Exports/imports remain available.

## Record synchronization (v4)

`/private/sync` (rewritten to `/api/training-sync`) verifies the same signed cookie on every read/write and checks
same-origin JSON POST requests. The connected **private** Blob store is available
via `BLOB_STORE_ID` and Vercel OIDC; no storage credential is sent to the browser.
The document `fitness/state-v1.enc.json` is additionally AES-GCM encrypted with a
purpose-derived key. Reads bypass cache; writes use ETag conditions and retry
conflicts. The first write uses create-only semantics. Missing config fails closed.

The client keeps a per-operation durable outbox, server snapshot, and one-time
legacy backup. Existing browser record keys remain compatibility caches. Deletions
leave tombstones; operation receipts make retries idempotent. Conflicting revisions
need explicit resolution. Do not clear browser storage while pending changes exist.
The shared private password denotes one shared data space, not separate users.

Run `npm test` for authentication, concurrency, migration, offline and conflict tests.
Local fixture tests are not evidence of deployed database synchronization. Verify
production with two isolated clients; create and delete only clearly labeled test
records. Production records must never be copied into this public repository.
