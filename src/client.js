import * as sapper from '@sapper/app';
import { googleAnalytics } from './gtm';

sapper.start({
  target: document.querySelector('#sapper')
});

if (process.env.GTM_ID) googleAnalytics(process.env.GTM_ID);
