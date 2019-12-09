import * as sapper from '@sapper/app';
import { googleAnalytics } from './gtm';

console.log(process.env.GTM_ID)
sapper.start({
  target: document.querySelector('#sapper')
});

if (process.env.GTM_ID) googleAnalytics(process.env.GTM_ID);
