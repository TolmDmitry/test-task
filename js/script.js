const content = document.querySelector('.content');
const btnTop = document.querySelector('.scroll-up');
const inputSearch = document.querySelector('.input-search[type="text"]');

let lastNew;

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 100);
}

function drawItem(item) {
  let date = new Date(item.webPublicationDate);
  let diffTime = timeSince(date.getTime());
  let newsItemDate = `${diffTime} ago`;
  const newsItem = `
  <div class="card">
      <div class="new-img">
          <a href="details.html?post=${item.id}">
              <img src="${item.fields.thumbnail}" alt="news foto">
          </a>
      </div>
      <div class="new-info">                                      
          <a class="new-title" href="details.html?post=${item.id}">${item.webTitle}</a>
          <p class="new-text">${item.fields.bodyText}</p>
          <div class="more">
              <span class="date">${newsItemDate}</span>
              <a href="details.html?post=${item.id}" class="details">Read more</a>
          </div>
      </div>
  </div>
  `;
  const newsFragment = document.createRange().createContextualFragment(newsItem);
  content.appendChild(newsFragment);
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

inputSearch.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    search(event.target.value);
  }
});

function search(item) {
  let findValue = lastNew.filter((value) => value.webTitle.includes(item));
  if (findValue.length) {
    content.replaceChildren();
    findValue.forEach((card) => drawItem(card));
  } else {
    content.replaceChildren();
    const newsItem = `<div class = 'no-match'>No exact matches found</div>`;
    const newsFragment = document.createRange().createContextualFragment(newsItem);
    content.appendChild(newsFragment);
  }
  let card = document.querySelector('.card');
  card.classList.add('main-new');
}