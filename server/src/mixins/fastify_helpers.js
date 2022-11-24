import * as cors from '@fastify/cors';
import * as jaegerPlugin from '../modules/jaeger-fastify.js';

/**
 * Get the env var CORS and parse it to create an array usable by fastify-cors
 * @returns {array} - array of regexp usable by fastify-cors
 */
export function parseCorsFromENvVars() {
  if (process.env["CORS"] && process.env["CORS"].length > 0) {
    const origin = process.env["CORS"]
    .split(',')
    .map((item) => new RegExp(item));
    fastify.register(cors, { origin });
  }
}

export function registerJaeger(fastify) {
  fastify.register(jaegerPlugin, {
    serviceName: 'user-service',
    config: {
      serviceName: 'ping-server',
      sampler: {
        type: 'const',
        param: 1
      },
      reporter: {
        logSpans: true
      }
    },
    options: {
      // using npm package `simple-json-logger` by default
      // change with whatever you prefer
      logger: {
        info (msg) {
          console.log('INFO ', msg)
        },
        error (msg) {
          console.log('ERROR', msg)
        }
      }
    }
  })
  return null;
}


export async function updateResponseHeaders(fastify) {
  fastify.addHook('preHandler', (request, reply, done) => {
    reply.header("x-version", process.env["npm_package_version"]);
    reply.header("x-service", process.env["npm_package_name:"]);
    done();
  });
  return fastify;
}
