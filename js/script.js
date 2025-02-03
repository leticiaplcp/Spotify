const searchInput = document.getElementById('search_input');
const resultsArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then(response => response.json())
        .then(result => displayResults(result))
}

function displayResults(result) {
    resultPlaylist.classList.add('hidden');
    
    // Garante que a div result-artist esteja visível sempre que houver texto no input
    resultsArtist.classList.remove('hidden');
    
    const gridContainer = resultsArtist.querySelector('.grid-container');
    gridContainer.innerHTML = ''; // Limpa os resultados anteriores

    if (result.length === 0) {
        gridContainer.innerHTML = `<p>Nenhum artista encontrado.</p>`;
        return;
    }

    result.forEach(element => {
        const artistName = element.name.toLowerCase().trim();
        const searchLetter = searchInput.value.toLowerCase().trim();

        if (artistName.startsWith(searchLetter)) {
            const artistCard = document.createElement('div');
            artistCard.classList.add('pesquisa');

            artistCard.innerHTML = `
            <div>
            <h1>Pesquisa recente</h1>
            <div class="artist-card">
                <div class="card-img">
                    <img class="artist-img" src="${element.urlImg}" alt="${element.name}" />
                    <div class="play">
                        <span class="fa fa-solid fa-play"></span>
                    </div>
                </div>
                <div class="card-text">
                    <span class="artist-name">${element.name}</span>
                    <span class="artist-categorie">Artista</span>
                </div>
                </div>
                </div>
            `;

            gridContainer.appendChild(artistCard);
        }
    });

    // Se nenhum artista foi adicionado, exibe a mensagem de "Nenhum artista encontrado"
    if (gridContainer.innerHTML === '') {
        gridContainer.innerHTML = `<p>Nenhum artista encontrado.</p>`;
    }
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden'); // Mostra playlists novamente
        resultsArtist.classList.add('hidden'); // Esconde a div quando o input estiver vazio
    } else {
        resultsArtist.classList.remove('hidden'); // Mostra a div quando o input tiver algo escrito
        requestApi(searchTerm);
    }
});
