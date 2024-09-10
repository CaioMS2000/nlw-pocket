import fastify from "fastify";

const app = fastify();

async function BOOT() {
	await app.listen({
		port: 3333,
	});

	console.log("HTTP Server Running");
}

BOOT();
