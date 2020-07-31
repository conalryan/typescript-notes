import * as singleSpa from 'single-spa';

const name = 'app1';
/* The app can be a resolved application or a function that returns a promise that resolves with the javascript application module.
 * The purpose of it is to facilitate lazy loading -- single-spa will not download the code for a application until it needs to.
 * In this example, import() is supported in webpack and returns a Promise, but single-spa works with any loading function that returns a Promise.
 */
const app = () => import('./app1/app1.js');

/* single-spa does some top-level routing to determine which application is active for any url. You can implement this routing any way you'd like.
 * One useful convention might be to prefix the url with the name of the app that is active, to keep your top-level routing simple.
 */
const activeWhen = '/app1';

singleSpa.registerApplication({ name, app, activeWhen });

singleSpa.start();