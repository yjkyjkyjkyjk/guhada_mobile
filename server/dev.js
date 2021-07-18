const express = require('express');
const next = require('next');
const mobxReact = require('mobx-react');
const app = next({ dev: true, conf: { baseUrl: '../' } });
const handle = app.getRequestHandler();
const returnUrls = require('../routes/returnUrls');
const routes = require('../routes');
const PORT = 80;

mobxReact.useStaticRendering(true);

app.prepare().then(() => {
  const server = express();

  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use('/public', express.static('public'));

  /**
   * custom route setting
   */
  for (const route of returnUrls) {
    server[route.method](route.url, route.handler);
  }
  for (const route of routes) {
    server.get(route.asPath, (req, res) => {
      app.render(req, res, route.pagePath, {
        ...req.params,
        ...req.query,
      });
    });
  }

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Dev mode ready on http://localhost`);
  });
});
