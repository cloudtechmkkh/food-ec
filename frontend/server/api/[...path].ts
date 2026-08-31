export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const path = event.node.req.url

  return await $fetch(`${config.apiBase}${path}`)
})