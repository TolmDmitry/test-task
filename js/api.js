const category = new URL(window.location.href).searchParams.get('category');
async function getResponse(category = "trending") {
  return await fetch(`https://content.guardianapis.com/search?q=${category}&show-tags=all&page-size=20&show-fields=all&order-by=newest&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`);
}
async function start() {
  let response = await getResponse(category);
  let data = await response.json();
  let arr = data.response.results;
  lastNew = arr;
  content.replaceChildren();
  arr.forEach(drawItem);
  document.querySelector(".card").classList.add('main-new');
}
start();
