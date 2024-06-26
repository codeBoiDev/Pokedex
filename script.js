async function searchPokemon() {
    const input = document.getElementById("num-pokemon").value
    const pokemon = await getPokemonByNum(input)

    if (pokemon == false) {
        alert(`The Pokemon ${input} doesn't exist!`)
    }
    else {
        const response = {
            name: getPokemonName(pokemon),
            img: getPokemonImg(pokemon),
            types: getPokemonType(pokemon)
        };
        response
        console.log(response)

        printPokemon(response)
    }
}

async function getPokemonByNum(num) {
    const url = `https://pokeapi.co/api/v2/pokemon/${num}`

    let response = null;
    await fetch(url)
        .then((response) => response.json())
        .then((data) => response = data)
        .catch((error) => {
            console.log(error)
            response = false;
        })

    return response;
}

function getPokemonName(pokemon) {
    return pokemon.forms[0].name
}

function getPokemonImg(pokemon) {
    return pokemon.sprites.front_default
}

function getPokemonType(pokemon) {
    let types = [];

    pokemon.types.forEach((type) => {
        types.push(type.type.name);
    })
    return types;
}

function printPokemon(pokemon) {

    let typesHtml = "";
    pokemon.types.forEach((type) => {
        typesHtml += `<div class="type ${type}">${type}</div>`
    })
    const html = `
        <div id="img-pokemon">
            <img src="${pokemon.img}" alt="">
        </div>
        <div id="about-pokemon">
            <div id="name">${pokemon.name}</div>
            <div id="types">
                ${typesHtml}
            </div>
        </div>`;

    const modal = document.getElementById("modal")
    modal.style.display = 'flex'
    modal.innerHTML = html
}