Audit the `src/` directory and enforce the project's separation-of-concerns architecture. Follow every step below precisely.

---

## Architecture rules

| What | Where | Naming |
|---|---|---|
| API fetch hooks | `src/hooks/<domain>/use<Action><Domain>.ts` | `useGetBlog.ts`, `useCreateBlog.ts` … |
| Shared types / interfaces | `src/interface/<domain>.ts` OR `src/hooks/<domain>/types.ts` | `blog.ts`, `construction.ts` … |
| SVG icon components | `src/components/icons/<IconName>.tsx` | `IconEdit.tsx`, `Spinner.tsx` … |
| Reusable UI components | `src/components/<category>/<ComponentName>.tsx` | `Button.tsx`, `NextImage.tsx` … |
| Page components | `src/app/**/(page|layout).tsx` | Next.js convention |
| Constants / config | `src/constants/<name>.ts` | `routes.ts` … |
| Utility / lib | `src/lib/<name>.ts` | `prisma.ts`, `auth.ts` … |

---

## Steps

### 1 — Scan for violations

Check every `.tsx` / `.ts` file under `src/` for the following problems. List every violation found before doing any fixes.

**A. Inline SVG in page or component files**
grep for `<svg` in files outside `src/components/icons/`. Each hit is a violation — the SVG must become a named icon component in `src/components/icons/<IconName>.tsx` and be exported from `src/components/icons/index.tsx`.

**B. API fetch calls (`fetch(`, `axios.`) in page or component files**
grep for `fetch(` or `axios.` in files outside `src/hooks/`. Each hit is a violation — the call must move to a hook in `src/hooks/<domain>/use<Action><Domain>.ts` following the existing pattern.

**C. Interface or type declarations in page or component files**
grep for `^interface ` or `^type ` (at the top level, not inside functions) in files under `src/app/` or `src/components/`. Each hit is a violation — the type must move to `src/interface/<domain>.ts` or `src/hooks/<domain>/types.ts` and be re-exported.

**D. Missing barrel `index.ts`**
Every folder under `src/hooks/<domain>/` and `src/interface/` that has files but no `index.ts` is a violation.

---

### 2 — Report

Print a clear summary in this format:

```
=== Structure Audit Report ===

[A] Inline SVGs found:
  - src/app/.../page.tsx  →  move to src/components/icons/<Name>.tsx

[B] fetch() calls in non-hook files:
  - src/components/.../Foo.tsx  →  move to src/hooks/<domain>/use<Action><Domain>.ts

[C] Types declared in page/component files:
  - src/app/.../page.tsx  interface Foo  →  move to src/interface/<domain>.ts

[D] Missing barrel index.ts:
  - src/hooks/<domain>/  →  create index.ts

Total violations: N
```

If there are zero violations for a category, print `✓ None`.

---

### 3 — Fix

After printing the report, ask the user: **"Fix all violations now? (yes / no / list specific files)"**

If approved:

- For **[A]**: create the icon file in `src/components/icons/<Name>.tsx`, add export to `src/components/icons/index.tsx`, replace inline SVG in the source file with the import.
- For **[B]**: create the hook file in `src/hooks/<domain>/use<Action><Domain>.ts` following the existing hook pattern (plain async function returning result, throws on error). Update barrel `index.ts`. Replace the inline fetch in the source file with a call to the hook.
- For **[C]**: move the type/interface to the appropriate `src/interface/<domain>.ts` or `src/hooks/<domain>/types.ts`. Add export there. Replace the local declaration in the source file with an import.
- For **[D]**: create the missing `index.ts` with re-exports for all files in that folder.

After all fixes, run `npx tsc --noEmit` and report the result.

---

### 4 — Final summary

Print which files were created, which were modified, and confirm zero TypeScript errors.
