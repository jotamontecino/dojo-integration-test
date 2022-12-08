import * as dotenv from 'dotenv';
import Fastify from 'fastify'
import * as fastifySensible from '@fastify/sensible';
const fastify = Fastify({ logger: process.env["LOGGER"] });
import * as fastifyHelpers from './src/mixins/fastify_helpers.js';
import { defaultRoutes } from './src/mixins/default.js';
import * as serviceHandlers from './src/handlers/index.js';
import { routesFromOpenApiSpecs } from './src/modules/openApi.js';
// import * as serviceHandlers from './src/handlers/index.js';

dotenv.config();
fastify.register(fastifySensible)

//## Insert DB decorator
import { createClient } from './src/modules/inMemoryDBProxy.js';
const dbClient = createClient("Planets");
console.log("###############");
dbClient.insertOne({test:1})
dbClient.insertOne({test:2})
dbClient.insertMultiple([{test:3}, {test:4}]);
console.log(dbClient.getById(3));
dbClient.deleteById(3)

console.log(dbClient.getList());
console.log("###############");

const openApiSpecsFile =  await import('./src/open-api.js')
.catch((e) => {
  if (e.code === 'ERR_MODULE_NOT_FOUND') {
    console.error('No OPEN API specification found, please create it inside (src/open-api.json)')
    process.exit(1)
  }
  throw e;
  process.exit(1)
})

const routeSpecLists = routesFromOpenApiSpecs(openApiSpecsFile.openApiSpec, serviceHandlers);
// ##### Configuration of Jaeger Plugin
fastifyHelpers.registerJaeger(fastify)
// ##### Configuration of Cors Plugin
fastifyHelpers.parseCorsFromENvVars(fastify);
fastifyHelpers.updateResponseHeaders(fastify);
defaultRoutes(fastify);

fastify.register(async function publicContext (childServer) {
  childServer.decorate('httpErrors', fastify.httpErrors);
  routeSpecLists.forEach(function(routeSpec) {
    childServer.route(routeSpec);
  });
});


fastify.listen({port: process.env["HTTP_EXPOSED_PORT"], host: process.env["HTTP_EXPOSED_IP"]}, err => {
  if (err) throw err
});
