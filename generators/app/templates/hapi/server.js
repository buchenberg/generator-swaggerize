'use strict'

const Glue = require('glue')
const Path = require('path')
const debug = require('debug')('server')

const manifest = {
  server: {},
  connections: [
    {
      port: 8000
    }
  ],
  registrations: [
    {
      plugin: {
        register: 'blipp'
      }
    },
    {
      plugin: {
        register: 'swaggerize-hapi',
        options: {
          api: Path.resolve('<%=apiPathRel.replace(/\\/g,'/')%>'),
          handlers: Path.resolve('<%=handlerPath.replace(/\\/g,'/')%>')<%if (security) {%>,
          security: Path.resolve('<%=securityPath.replace(/\\/g,'/')%>')<%}%>
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