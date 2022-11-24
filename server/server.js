require('dotenv').config();

const fastify = require('fastify')({ logger: process.env["LOGGER"] });
fastify.register(require('@fastify/sensible'))

const fastifyHelpers = require('./src/mixins/fastify_helpers');


const openApiSpecs = require('./src/open-api.json');
if (!openApiSpecs) {
  throw new Error ('No OPEN API specification found, please create it inside (src/open-api.json)');
  process.exit(1);
}
const serviceHandlers = require('./src/handlers')
const routeSpecLists = require('./src/modules/openApi').routesFromOpenApiSpecs(openApiSpecs, serviceHandlers);
// ##### Configuration of Jaeger Plugin
fastifyHelpers.registerJaeger(fastify)
// ##### Configuration of Cors Plugin
fastifyHelpers.parseCorsFromENvVars(fastify);
fastifyHelpers.healthRoute(fastify);
fastifyHelpers.updateResponseHeaders(fastify);

fastify.register(async function publicContext (childServer) {
  childServer.decorate('httpErrors', fastify.httpErrors);
  routeSpecLists.forEach(function(routeSpec) {
    childServer.route(routeSpec);
  });
});


fastify.listen({port: process.env["HTTP_EXPOSED_PORT"], host: process.env["HTTP_EXPOSED_IP"]}, err => {
  if (err) throw err
});
