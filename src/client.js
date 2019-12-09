import * as sapper from '@sapper/app';
import { googleAnalytics } from './gtm';
import { googleAdsense } from './adsense'

sapper.start({
  target: document.querySelector('#sapper')
});

if (process.env.GTM_ID) googleAnalytics(process.env.GTM_ID);
if (process.env.GOOGLE_ADSENSE_ID) {
  googleAdsense(process.env.GOOGLE_ADSENSE_ID)
}
