import { $fetch } from 'ofetch';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const path = event.node.req.url?.replace('/api', '') || '';
    const backendUrl = `http://localhost:3001${path}`;

    const response = await $fetch(backendUrl, {
        method: event.node.req.method,
        body: await readBody(event),
        headers: event.node.req.headers,
    })

    return response;
})