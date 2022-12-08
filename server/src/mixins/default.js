export async function defaultRoutes(fastify, options) {
  fastify.get('/health', async function(request, reply) {
    return {ping: `${Date.now()}`};
  });
}
