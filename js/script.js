const searchInput = document.getElementById('search-input');
const resultsArtists = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

document.addEventListener('input', function() {
    const searchTerm = searchInput.ariaValueMax.toLowerCase;
    if(searchTerm === ''){
        resultPlaylist.classList.add('hidden');
    }
})