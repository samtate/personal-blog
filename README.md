# Small Signals

A static personal weblog built with Astro and edited through Sveltia CMS. Posts
and their images are ordinary files committed to Git.

## Local development

```sh
npm install
npm run dev
```

Commit the generated `package-lock.json` file so subsequent local and CI installs use
the exact dependency graph.

The production build is written to `dist/`:

```sh
npm run build
```

## Writing

Posts are stored as self-contained folders:

```text
src/content/posts/my-post/
├── index.md
└── pasted-image.png
```

The deployed browser editor is available at `/admin/`. During local Astro
development, open the exact URL `/admin/index.html`; this preserves Sveltia's
local-repository workflow and avoids Astro's live reload resetting the editor.
Before using the remote workflow, replace
`YOUR_GITHUB_USERNAME/personal-blog` in `public/admin/config.yml` with the real
GitHub repository. The configured token sign-in stores the GitHub token in the
browser, so only use the editor on a trusted device and restrict `/admin/` to a
private network or VPN at the reverse proxy.

For local-only editing, click **Work with Local Repository** and select this
project's root folder. Sveltia writes the content files directly; commit them
with Git when ready. No GitHub repository or access token is required for this
workflow.

The rich-text body accepts pasted and dropped images. Sveltia saves each image
beside the post's `index.md`; Astro processes the relative Markdown image during
the static build.

## GitHub Actions deployment

The deployment workflow needs one repository variable:

- `SITE_URL`: the public origin, for example `https://blog.example.com`

It also needs these repository or production-environment secrets:

- `TS_AUTHKEY`: an ephemeral, pre-authorized Tailscale auth key for GitHub Actions
- `DEPLOY_HOST`: server hostname or IP
- `DEPLOY_PORT`: SSH port; optional, defaults to `22`
- `DEPLOY_USER`: restricted deployment account
- `DEPLOY_PATH`: absolute directory served by the web server; never `/`
- `SSH_PRIVATE_KEY`: private key dedicated to this deployment
- `SSH_KNOWN_HOSTS`: pinned `known_hosts` entry for the home server

The deployment uses `rsync --delete`, so the deployment account should be
restricted to a dedicated website directory. Generate `SSH_KNOWN_HOSTS` from a
trusted network and compare its fingerprint with the server before adding it to
GitHub.

The NAS Caddy service is defined in `deploy/caddy/`. Copy that directory's
`Caddyfile` and `compose.yml` into `/volume1/docker-nfs/samtatemeuk/`, alongside
the `site/`, `caddy-data/`, and `caddy-config/` directories, then start it with
`docker compose up -d`. The deployment path should be
`/volume1/docker-nfs/samtatemeuk/site`.

The NAS already owns ports 80/443 with its built-in nginx, so this Caddy
container listens on NAS port 8080. Add a NAS reverse-proxy rule for
`sa.mtate.me.uk` from HTTPS to `http://127.0.0.1:8080`; Caddy serves the
static files behind that proxy.

For a public repository, keep using GitHub-hosted runners. Do not attach a
general-purpose self-hosted runner on the home network.

## Customization

Change the site title and description in `src/consts.ts`. Replace the starter
post and About text whenever you are ready. `.env.example` documents the local
canonical URL setting.
