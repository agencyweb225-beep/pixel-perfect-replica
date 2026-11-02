<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Brand tokens, fonts, sock patterns and animations live only in src/styles.css; components use semantic utilities (bg-ink, bg-brand, pattern-sock-*) so the brand can be re-themed in one place.
- Portfolio entries live in src/lib/projects.ts and services in src/lib/services.ts; pages render from these arrays so content can be added without touching layouts.
- Contact form inserts directly into the contact_submissions table (anon INSERT only, no read access) so submissions are stored without exposing them publicly.
