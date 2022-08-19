const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImg = document.querySelector('.pokemon-image');
const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const buttonPrev = document.querySelector('.button-btn-prev');
const buttonNext = document.querySelector('.button-btn-next');

let search = 1;

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(apiResponse.status === 200){
        const data = await apiResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        search = data.id;
    } else {
        pokemonImg.style.display = none;
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', ()=> {
    console.log("fui clicado");
    if(search > 1){
        search -= 1;
        renderPokemon(search);
    }
});

buttonNext.addEventListener('click', ()=> {
    console.log("fui clicado");
    search += 1;
    renderPokemon(search);
});

renderPokemon(search);

