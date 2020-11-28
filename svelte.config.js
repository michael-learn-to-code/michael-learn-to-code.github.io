const sveltePreprocess = require('svelte-preprocess');
const siteMeta = require("./sitemeta.json");

const preprocessOptions = {
  sourceMap: true, // "you would always want sourcemaps for the IDE" – dummdidumm
  defaults: {
    script: "typescript",
    style: "scss",
  },
  scss: {
    // prependData: `@import 'src/scss/global.scss';`
  },
  postcss: true
};

const mode = process.env.NODE_ENV;

const replaceOptions = {
  'process.browser': true,
  'process.env.NODE_ENV': JSON.stringify(mode),
  'process.env.SITE_TITLE': JSON.stringify(siteMeta.title),
  'process.env.SITE_META': JSON.stringify(siteMeta.meta)
}

module.exports = {
  preprocess: sveltePreprocess(preprocessOptions),

  // Export this to allow rollup.config.js to inherit the same preprocess options.
  preprocessOptions,
  replaceOptions,
}