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
Local workout records stay in each visitor's browser and can be exported/imported;
this feature does not create a server-side workout database.
