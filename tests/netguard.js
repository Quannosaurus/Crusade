// Shared by the Playwright tests: blocks every request that leaves the machine.
// Each blocked URL is pushed into `list`, so the calling test fails on any external request.
// Local schemes (file:, data:, blob:, about:) are never routed and load normally.
module.exports=async function guard(page,list){
  await page.route(u=>!/^(file|data|blob|about):/.test(u.href),r=>{list.push('external request: '+r.request().url());return r.abort();});
};
