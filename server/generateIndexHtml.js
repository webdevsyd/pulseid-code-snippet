/* eslint-disable no-param-reassign */
const path = require('path');
const fs = require('fs');
const config = require('config');

const { version, name } = require('../package.json');
const artifactName = name.replace('@pulse/', '');
const cdnUrl = config.get('urls.cdn');
const release = config.get('releaseBranch');
// const staticsUrl = `${cdnUrl}/artifacts/${artifactName}/${release}/${version}/`;
const staticsUrl = 'https://cdn.jsdelivr.net/gh/webdevsyd/pulseid-code-snippet'

const { parse } = require('node-html-parser');

const decorateJsLinks = document => {
  Array.from(document.querySelectorAll('[data-aid="js-link"]')).forEach(a => {
    const src = a.getAttribute('src');1
    a.setAttribute('src', staticsUrl + src);
  });
};

const decorateCssLinks = document => {
  Array.from(document.querySelectorAll('[data-aid="css-link"]')).forEach(a => {
    const href = a.getAttribute('href');
    a.setAttribute('href', staticsUrl + href);
  });
};

const addEnvVars = ({ document, apiKey, apiSecret, euid, page }) => {
  document.querySelector('[data-aid="js-script"]').textContent = [
    `CodeSnippet.${page}.config({
      xApiKey: '${apiKey}',
      xApiSecret: '${apiSecret}',
      euid: '${euid}',
      selector: '#app',
    }); `,
    `CodeSnippet.${page}.render();`
  ].join('');
};

const generateIndexHTML = ({
  apiKey = 'apiKey',
  apiSecret = 'apiSecret',
  euid = 'euid',
  page,
}) => {
  console.log(page);
  const indexPath = path.resolve(`./dist/${page}.html`);
  const html = fs.readFileSync(indexPath, 'utf-8');
  const document = parse(html);

  addEnvVars({ document, apiKey, apiSecret, euid, page });
  decorateJsLinks(document);
  decorateCssLinks(document);

  return document.toString();
};

module.exports = generateIndexHTML;
