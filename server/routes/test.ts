export default eventHandler(async (event) => {
  if (!event.context.cloudflare) {
    return { counter: "ERR_NO_CONTEXT" };
  }

  // Note that this is `any` type
  const { MY_KV_NAMESPACE } = event.context.cloudflare.env;

  // Note the lack of `cloudflare` type on context
  // event.context.cloudflare

  let ctr = (await MY_KV_NAMESPACE.get("counter")) || 0;
  await MY_KV_NAMESPACE.put("counter", ++ctr);

  return { counter: ctr };
});
