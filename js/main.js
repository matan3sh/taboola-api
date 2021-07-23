class Fetch {
  constructor() {
    this.apiUrl = 'http://api.taboola.com/1.0/json/';
    this.publisherId = 'taboola-templates';
    this.type = 'desktop';
    this.apiKey = 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4';
    this.sourceId = 'home-test';
  }

  get(count) {
    return fetch(
      `${this.apiUrl}${this.publisherId}/recommendations.get?app.type=${this.type}&app.apikey=${this.apiKey}&count=${count}&source.type=video&source.id=${this.sourceId}&source.url=http://www.site.com/videos/214321562187.html`
    );
  }
}

class UI {
  static async getData(count) {
    const res = await new Fetch().get(count);
    const recommendations = await res.json();
    recommendations.list.forEach((item) => UI.add(item));
  }

  static add(item) {
    const websiteListWrapper = document.querySelector('.wrapper');
    const websiteItem = document.createElement('div');
    websiteItem.innerHTML = `
    <a href=${item.url} target=${
      item.origin === 'sponsored' ? '_blank' : null
    } >
      <img
        src=${item.thumbnail[0].url}
        alt=${item.description || item.name}
        class="item__img"
      />
      <p class="item__title">${item.name}</p>
      <span class="item__category">${item.branding}</span>
    </a>
    `;
    websiteListWrapper.appendChild(websiteItem);
  }
}

class Test {
  static async getData(count) {
    const res = await new Fetch().get(count);
    const resArray = await res.json();
    console.log(`Expect to get an array of length ${count}`);
    console.log('Getting array size: ', resArray.list.length);
  }
}

// Load main widget
document.addEventListener('DOMContentLoaded', UI.getData(9));

// Test
Test.getData(9);
