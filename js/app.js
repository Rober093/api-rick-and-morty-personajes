    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
    
        // Mientras haya elementos para mezclar
        while (currentIndex !== 0) {
            // Seleccionar un elemento restante
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // Intercambiar con el elemento actual
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }
    
    function getCharacters(done) {
        const results = fetch("https://rickandmortyapi.com/api/character");
    
        results
            .then(response => response.json())
            .then(data => {
                const shuffledCharacters = shuffle(data.results); // Mezclar los personajes
                const firstSixCharacters = shuffledCharacters.slice(0, 6); // Obtener los primeros 6 personajes
                done(firstSixCharacters);
            });
    }
    
    getCharacters(data => {
        data.forEach(personaje => {
            const article = document.createRange().createContextualFragment(/*html*/ `
          <article>
            <div class="image-container">
              <img src="${personaje.image}" alt="personaje">
            </div>
            <h2><strong>Nombre: </strong>${personaje.name}</h2>
            <span><strong>Estado:</strong>${personaje.status}</span>
            <ul>
                 <li><strong>Última ubicación:</strong><br>${personaje.location.name}</li>
                 <li><strong>Donde se vio por primera vez:</strong><br>${personaje.origin.name}</li>
               </ul>
          </article>
        `);
    
            const main = document.querySelector("main");
            main.append(article);
        });
    });
