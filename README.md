# VasAtis Website

Static, multilingual replacement for the existing VasAtis WordPress website.
The project preserves the public site structure while removing WordPress, PHP,
the database dependency, the contact-form backend, and the chat widget.

## Project Status

Current version: `0.0.0`

The local development server is available at `http://localhost:5173/` when
running `npm run dev`.

## Architecture

- Vite with vanilla HTML, CSS, and JavaScript
- Hungarian and English locale resources in `src/i18n/`
- Persistent language and light/dark theme preferences via `localStorage`
- Static contact flow using prefilled `mailto:` links to `vasatis@vasatis.com`
- GitHub Pages deployment workflow in `.github/workflows/deploy-pages.yml`
- GitHub Pages test builds use the `/vasatis/` base path

## Migration Checklist

### Source Recovery

- [x] Download the WordPress `public_html` archive from SiteGround.
- [x] Export the WordPress MySQL database.
- [x] Extract the source locally for content and asset recovery.
- [x] Exclude local backups and database exports from Git.

### Static Application Foundation

- [x] Initialize the Vite project.
- [x] Create the shared header, footer, responsive layout, and original visual assets.
- [x] Add Hungarian and English locale files.
- [x] Add persistent light/dark mode and language switching.
- [x] Replace the WordPress contact form with prefilled email requests.
- [x] Remove the Collect.chat dependency.

### Public URLs and Content

- [x] Add route handling for the homepage and core legacy URLs.
- [x] Add route handling for residential, corporate, projects, aluminium fence, FAQ, contact, and privacy pages.
- [x] Recover the primary service category structure.
- [x] Recover the full FAQ question list.
- [x] Recover the primary reference-project category structure.
- [x] Replace primary residential and corporate route summaries with recovered WordPress service descriptions.
- [ ] Replace remaining short route summaries with the full approved WordPress text.
- [x] Convert the FAQ into accessible expandable question-and-answer sections.
- [x] Build the primary reference-project gallery using recovered images and detailed descriptions.
- [ ] Add the missing detailed content to the aluminium fence page.
- [x] Update the privacy notice structure for email-only contact and the removal of WordPress and Collect.chat.
- [ ] Obtain client legal approval for the final privacy notice wording.
- [ ] Confirm all contact details, service areas, references, and customer reviews with the client.

### SEO and Production Readiness

- [x] Preserve the primary legacy URL inventory.
- [x] Record the Search Console coverage baseline: 11 indexed URLs, 13 existing 404 URLs, 11 discovered-but-not-indexed URLs, and 4 noindex URLs on 2026-09-04.
- [x] Add a canonical production URL sitemap.
- [x] Prevent test deployments from being indexed using `noindex` and `robots.txt`.
- [x] Add a GitHub Pages fallback for direct legacy route testing.
- [x] Recover and implement per-page title, description, and canonical metadata from AIOSEO.
- [x] Implement per-page Open Graph metadata.
- [x] Add `LocalBusiness` structured data.
- [ ] Verify the final sitemap and robots directives before production deployment.
- [x] Obtain Google Search Console access and record the index coverage baseline.
- [x] Preserve the Google Search Console HTML verification file for the production site root.
- [ ] Export and review Search Console performance data when the Search results report becomes available.
- [ ] Define one-to-one `301` redirects for any URL that cannot be retained.

### GitHub Pages Test Deployment

- [x] Add the GitHub Actions Pages workflow.
- [x] Configure the workflow to enable the repository Pages site automatically.
- [x] Validate a production build with the GitHub Pages base path.
- [x] Commit the initial static project to the temporary repository.
- [x] Push `main` to `https://github.com/kgergo1713/vasatis.git`.
- [x] Enable GitHub Actions as the repository Pages source.
- [x] Deploy the initial test site to `https://kgergo1713.github.io/vasatis/`.
- [ ] Test desktop, mobile, internal links, direct URLs, and email links on the deployed Pages URL.

### Production Handover

- [ ] Transfer the project to the client-owned GitHub repository.
- [ ] Configure the chosen production host and custom domain.
- [ ] Configure DNS without changing the live site until acceptance testing is complete.
- [ ] Submit the final sitemap through Google Search Console.
- [ ] Monitor index coverage, crawl errors, and Core Web Vitals after launch.

## Local Development

Prerequisite: Node.js 22 or newer.

```powershell
cd C:\VSCode\Vasatis
npm install
npm run dev
```

Create a production build with:

```powershell
npm run build
```

To reproduce the GitHub Pages test build locally:

```powershell
$env:GITHUB_ACTIONS = 'true'
npm run build
Remove-Item Env:GITHUB_ACTIONS
```

## Backup Handling

`public_html.zip`, the MySQL `.sql` export, and the `source/` recovery folder
are intentionally ignored by Git. They can contain credentials, personal data,
and large WordPress dependencies. Keep them only in secure local storage.

## Deployment

The temporary test deployment uses GitHub Pages from the `main` branch through
GitHub Actions. The workflow deploys the generated `dist/` directory.

The production deployment must preserve `https://vasatis.com` and its legacy
paths. DNS must not be changed before the content, SEO, and routing checklist
has been approved.

## License

This project is licensed under the [MIT License](LICENSE).

## Feedback and Support

- Feedback: [info@geri-soft.com](mailto:info@geri-soft.com)
- Support: [Revolut](https://revolut.me/kgergo1713)

## Changelog

### 0.0.0

#### New Feature

- Initial static VasAtis migration foundation with multilingual presentation,
  theme selection, legacy route handling, and GitHub Pages test deployment.