function getRandomInt(min, max) {
    // me devuelve un numero entero expecificandome min y max
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // se dispara cuando html cartga y el evento se activa 
    const ramdom = getRandomInt(1, 152);
    // es para obtenefr los numeros aleatorios en este rangio 
    fetchData(ramdom);
  });
  
  const fetchData = async (id) => {
    // pasa el numero aleatorio como argumento tomando el id para hacer el get
    // post 
    try {
      console.log(id);
  
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
    //   una vez que recibe se convierte en json 
  
      console.log(data);
  
      const pokemon = {
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        imgJuego: data.sprites.front_default,
        imgCvg: data.sprites.other.dream_world.front_default,
        nombre: data.name,
        experiencia: data.base_experience,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        especial: data.stats[3].base_stat,
      };
  
      pintarCard(pokemon);
    //   llama varias funciones pasando el objeto 
    } catch (error) {
      console.log(error);
    }
  };
  
  const pintarCard = (pokemon) => {
    // creando una tarjeta y mostrando los datos que ocupamos 
    const flex = document.querySelector(".flex");
    // seleciona la clase flex donde se clonara el template 
    const template = document.getElementById("card").content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
  
    clone.querySelector(".card-body-img").setAttribute("src", pokemon.imgCvg);


    clone.querySelector(
      ".card-body-title"
    ).innerHTML = `${pokemon.nombre} <span>${pokemon.hp}hp</span>`;
    clone.querySelector(".card-body-text").textContent =
      pokemon.experiencia + " exp";
    clone.querySelectorAll(".card-footer-social h3")[0].textContent =
      pokemon.ataque + "K";
    clone.querySelectorAll(".card-footer-social h3")[1].textContent =
      pokemon.especial + "K";
    clone.querySelectorAll(".card-footer-social h3")[2].textContent =
      pokemon.defensa + "K";
  
    fragment.appendChild(clone);
    flex.appendChild(fragment);
  };