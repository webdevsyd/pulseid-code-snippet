/* eslint-disable no-param-reassign */
const path = require('path');
const fs = require('fs');

const config = require('config');
const { parse } = require('node-html-parser');

const host = config.get('urls.host');

// const { version, name } = require('../package.json');

// const artifactName = name.replace('@pulse/', '');
// const cdnUrl = config.get('urls.cdn');
// const release = config.get('releaseBranch');

// const staticsUrl = `${cdnUrl}/artifacts/${artifactName}/${release}/${version}/`;
const staticsUrl = host;

const decorateJsLinks = document => {
  Array.from(document.querySelectorAll('[data-aid="js-link"]')).forEach(a => {
    const src = a.getAttribute('src');
    a.setAttribute('src', `${staticsUrl}/js${src}`);
  });
};

const decorateCssLinks = document => {
  Array.from(document.querySelectorAll('[data-aid="css-link"]')).forEach(a => {
    const href = a.getAttribute('href');
    a.setAttribute('href', `${staticsUrl}/css${href}`);
  });
};

const decorateFavicon = document => {
  const href = document.querySelector('[data-aid="favicon-link"]').getAttribute('href');

  document.querySelector('[data-aid="favicon-link"]').setAttribute('href', staticsUrl + href);
};

const addEnvVars = document => {
  document.querySelector('[data-aid="js-script"]').textContent = [
    `window.PROXY_API_BASE='${host}';`,
  ].join('');
};

const initializeApp = ({ document, apiKey, apiSecret, euid }) => {
  document.querySelector('[data-aid="js-app"]').textContent = [
    `function renderApp({ config }) {
      console.log(config);
      CodeSnippet.config({
        xApiKey: '${apiKey}',
        xApiSecret: '${apiSecret}',
        euid: '${euid}',
        selector: '#app',
      });
      CodeSnippet.render();`,
    `}`,
  ].join('');
};

const generateIndexHTML = ({ apiKey = 'apiKey', apiSecret = 'apiSecret', euid = 'euid', page }) => {
  const indexPath = path.resolve(`./dist/${page}.html`);
  const html = fs.readFileSync(indexPath, 'utf-8');
  const document = parse(html);

  addEnvVars(document);
  initializeApp({ document, apiKey, apiSecret, euid });
  decorateJsLinks(document);
  decorateCssLinks(document);
  decorateFavicon(document);

  return document.toString();
};

module.exports = generateIndexHTML;
