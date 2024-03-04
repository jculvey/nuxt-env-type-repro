export default eventHandler(async (event) => {
  if (!event.context.cloudflare) {
    return { counter: "ERR_NO_CONTEXT" };
  }

  const { MY_KV_NAMESPACE } = event.context.cloudflare.env;

  // Note that .get and .put are 'any'
  let ctr = (await MY_KV_NAMESPACE.get("counter")) || 0;
  await MY_KV_NAMESPACE.put("counter", ++ctr);

  return { counter: ctr };
});
