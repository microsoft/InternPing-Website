# Calendar Management App Documentation

Product documentation for the Microsoft Teams-based Calendar Management App. The site is built with Docusaurus 3 and deployed to GitHub Pages.

## Local development

```bash
npm ci
npm start
```

The development server opens at `http://localhost:3000` and reloads when source files change.

## Validation

```bash
npm run typecheck
npm run build
npm run serve
```

The production site is generated in `build/`. `npm run serve` previews that output locally.

## GitHub Pages deployment

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys every push to `main`. It derives the owner and project path from the GitHub repository, so no account placeholders are stored in configuration.

1. Push this project to a GitHub repository whose default branch is `main`.
2. Open **Settings > Pages** in the repository.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Push to `main` or run **Deploy documentation to GitHub Pages** from the Actions tab.

The published URL is `https://<owner>.github.io/<repository>/`. The workflow sets `SITE_URL` and `BASE_URL` automatically for this project-site format.

For a user or organization site whose repository is named `<owner>.github.io`, change the workflow's `BASE_URL` to `/`.

## Content map

- `/` - Product overview
- `/docs/features` - Product capabilities and roles
- `/docs/architecture` - System flow, security, and reliability
- `/docs/installation` - Tenant and production setup
- `/docs/user-guide` - Member and admin workflows
