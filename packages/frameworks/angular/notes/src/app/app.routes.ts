import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'change-detection',
    loadChildren: () => import('./change-detection/change-detection.module').then(m => m.ChangeDetectionModule),
  },
  {
    path: 'css-hacks',
    loadChildren: () => import('./css-hacks/css-hacks.module').then(m => m.CssHacksModule),
  },
  {
    path: 'directives',
    loadChildren: () => import('./directives/directives.module').then(m => m.DirectivesModule),
  },
  {
    path: 'dom-abstraction',
    loadChildren: () => import('./dom-abstraction/dom-abstraction.module').then(m => m.DomAbstractionModule),
  },
  {
    path: 'dom-manipulation',
    loadChildren: () => import('./dom-manipulation/dom-manipulation.module').then(m => m.DomManipulationModule),
  },
  {
    path: 'dynamic-components',
    loadChildren: () => import('./dynamic-components/dynamic-components.module').then(m => m.DynamicComponentsModule),
  },
  {
    path: 'expression-changed-after-check',
    loadChildren: () => import('./expression-changed-after-check/expression-changed-after-check.module').then(m => m.ExpressionChangedAfterCheckModule),
  },
];
