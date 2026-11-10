# Angular Material setup

This project uses Angular 21 and Angular Material 21. The Angular CLI schematic was used to install Material and apply its default setup.

## Install

From the project root, run:

```bash
npx ng add @angular/material@^21
```

The schematic asks for a theme and whether to configure global typography and animations. The project was installed with the schematic defaults:

```bash
npx ng add @angular/material@^21 --defaults
```

If running in a non-interactive environment, add `--skip-confirmation`:

```bash
npx ng add @angular/material@^21 --defaults --skip-confirmation
```

The command installs compatible versions of `@angular/material` and its peer package `@angular/cdk`, updates `package.json` and `package-lock.json`, and applies the selected theme setup. This project currently declares `@angular/material` and `@angular/cdk` as `^21.2.14`.

## What the schematic configured

- Added the Material 3 theme and global styles to [`src/styles.scss`](./src/styles.scss).
- Added Roboto and Material Icons font links to [`src/index.html`](./src/index.html).
- Added Material packages to [`package.json`](./package.json) and locked their resolved versions in [`package-lock.json`](./package-lock.json).

## Use a Material component

This is a standalone Angular application, so import each Material component used by a component into its `imports` array. For example, the name input in [`src/app/app.ts`](./src/app/app.ts) imports the form field, label, and input directives:

```ts
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  imports: [MatFormField, MatLabel, MatInput],
  // ...
})
```

Then use those components in the template:

```html
<mat-form-field appearance="outline">
  <mat-label>Name</mat-label>
  <input matInput name="name" />
</mat-form-field>
```

Import only the Material components a standalone component actually uses.

## Verify the setup

```bash
npm start
npm run build
npm test
```
