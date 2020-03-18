const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded',function(){

    const div = document.createElement('div')
    const ul = document.createElement('ul')
    const mainContainer = document.querySelector('#main-container')
    mainContainer.appendChild(div)
    div.appendChild(ul)
    
    getPoke()
    getTrainer()
    
    document.addEventListener('click', function(event){
        if (event.target.innerText === 'Add Pokemon'){
            createPokeForm(event.target)
        }
        else if (event.target.className === 'release'){
            removePoke(event.target)
        }
    })
    
    function getPoke(){
        fetch(POKEMONS_URL)
        .then(function(response){
            return response.json
        })
        .then(pokemons => {
            pokemons.forEach(function(poke){
                renderPoke(poke)
            })
        })
    }
    
    function getTrainer(){
        fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => {
            trainers.forEach(function(trainer){
                renderTrainer(trainer)
            })
        })
    }
    
    function renderPoke(poke){
        const li = document.createElement('li')
        li.innerHTML = `
            <h5> ${poke.species}</h5>
            <h5> ${poke.nickname}</h5>        
        `
        let releasePoke = document.createElement('button')
        releasePoke.className = "release";
        releasePoke.dataset.id = POKEMONS_URL.id
        ul.appendChild(li)
        li.append(releasePoke)
    }

    function renderTrainer(trainer){
        div.class = "card";
        div.setAttribute("id", trainer.id)
        let addPokeBtn = document.createElement('button')
        addPokeBtn.innerText = 'Add Pokemon'
        addPokeBtn.dataset.id = trainer.id
        div.appendChild(addPokeBtn)
    }

    function createPokeForm (button){
        let form = document.createElement('form')
        form.innerHTML = `
            <input type = "text" nickname = "Pokemon Name"/> <br>
            <input type = "text" species = "Pokemon Species"/> <br>
            <input type = "id" trainer_id = ${button.parentNode.id}/> <br>
            <input type = "submit" />
        ` 
    }

    function removePoke(button){
        let id = button.parentNode.dataset.id
        deletePoke(id)
    }

    function deletePoke(id){
        fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(poke => {
            let id = poke.id
            let li = document.querySelector(`[data-pokemon-id= ${id}`])
            li.remove()
        })
    }
})