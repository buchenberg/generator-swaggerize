'use strict'

const Glue = require('glue');
const Path = require('path');
const debug = require('debug')('server');
require('dotenv').config();

const environment = {
    api: {
        host: process.env.API_HOST || 'localhost',
        port: process.env.API_PORT || 9999
    },
    ui: {
        host: process.env.UI_HOST || 'localhost',
        port: process.env.UI_PORT || 9999
    },
    ws: {
        port: process.env.WS_PORT || 9991
    }
};

// const tlsEnabled = process.env.TLS_ENABLED || false;

// const tls = {
//     key: fs.readFileSync(Path.resolve(process.env.TLS_KEY_PATH || '/dev/null')),
//     cert: fs.readFileSync(Path.resolve(process.env.TLS_CERT_PATH || '/dev/null'))
// };

const manifest = {
  server: {},
  connections: [
   {
      host: environment.api.host,
      port: environment.api.port,
      labels: 'api',
      routes: {
          cors: {
              origin: ['*']
          }
      }

    }
  ],
  registrations: [
      {
        plugin: 'inert'
      },
      {
        plugin: 'vision'
      },
      {
        plugin: 'blipp'
      },
      {
         plugin: {
                register: 'swaggerize-hapi',
                options: {
                    api: Path.resolve('<%=apiPathRel.replace(/\\/g,' / ')%>'),
                    docspath: '/swagger',
                    handlers: Path.resolve('<%=handlerPath.replace(/\\/g,' / ')%>') <%if (security) {%>,
                    security: Path.resolve('<%=securityPath.replace(/\\/g,' / ')%>') <%}%>
                }
            }
      },
      {
          plugin: {
              register: 'hapi-swaggered-ui',
              options: {
                  swaggerEndpoint: '/swagger',
                  path: '/swagger-ui',
                  title: 'Figaro Mock API',
                  swaggerOptions: {}
              }
          }
      }
  ]
}

const options = {
  relativeTo: __dirname
}

Glue.compose(manifest, options, (err, server) => {
  if (err) {
    throw err
  }
  server.start(() => {
    server.plugins.swagger.setHost(server.info.host + ':' + server.info.port);
    debug('App running on %s:%d', server.info.host, server.info.port);
  })
})