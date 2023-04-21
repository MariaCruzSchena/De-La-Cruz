const lista = document.querySelector('.listado')
 
fetch('/assets/js/data.json')
    .then( (res) => res.json())
    .then( (data) => { 
        data.forEach((profesional) => {
            const li = document.createElement('li')
            li.innerHTML = `
                <h5 class="profesionalesTitle">${profesional.nombre}</h5>
                <p class="profesionales">${profesional.profesion}</p>
                <p class="profesionales"> Matrícula: ${profesional.matricula}</p>
                <hr/>
            `           
   
            lista.append(li)
        })
    })
