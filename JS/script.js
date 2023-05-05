const apikey = "d8b02dc109d7a677a61793797397e470";
const ts = "1000";
const hash = "15aa89127ec7f5cc41b3362aa8c68a9b";

const marvel = {
  render: async () => {
    const url = `https://gateway.marvel.com/v1/public/characters?limit=8&ts=${ts}&apikey=${apikey}&hash=${hash}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      const heroes = json.data.results.map((hero) => {
        const urlHero = hero.urls[0].url;

        return `
          <div class="hero-container">
            <h2>${hero.name}</h2>
            <a href="${urlHero}" target="_blank">
              <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="thumbnail">
            </a>
            <br><br>
            <a href="#" data-collection-uri="${hero.series.collectionURI}" class="series-link">Ver series</a><br>
            <a href="#" data-collection-uri="${hero.comics.collectionURI}" class="comics-link">Ver comics</a><br>
            <a href="#" data-collection-uri="${hero.events.collectionURI}" class="events-link">Ver eventos</a><br>
            <a href="#" data-collection-uri="${hero.stories.collectionURI}" class="stories-link">Ver historias</a><br>
          </div>
        `;
      });

      const container = document.querySelector('#marvel-row');
      container.innerHTML = heroes.join('');

      document.querySelectorAll('.series-link').forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          marvel.showCollection(event.currentTarget.dataset.collectionUri, 'series');
        });
      });

      document.querySelectorAll('.comics-link').forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          marvel.showCollection(event.currentTarget.dataset.collectionUri, 'comics');
        });
      });

      document.querySelectorAll('.events-link').forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          marvel.showCollection(event.currentTarget.dataset.collectionUri, 'eventos');
        });
      });

      document.querySelectorAll('.stories-link').forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          marvel.showCollection(event.currentTarget.dataset.collectionUri, 'historias');
        });
      });

    } catch (error) {
      console.error(error);
    }
  },

  showCollection: async (collectionUri, collectionType) => {
    const url = `${collectionUri}?&ts=${ts}&apikey=${apikey}&hash=${hash}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      const items = json.data.results.map(item => `<li>${item.title}</li>`).join('');

      const newWindow = window.open();
      newWindow.document.write(`
        <html>
          <head>
            <title>Lista de ${collectionType}</title>
          </head>
          <body>
            <ul>${items}</ul>
          </body>
        </html>
      `);

    } catch (error) {
      console.error(error);
    }
  }
};

marvel.render();
