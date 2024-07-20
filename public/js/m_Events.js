const Exo = document.getElementById("exotic_container");
console.log(Exo);

fetch("./js/api_Events.json")
  .then((res) => res.json())
  .then((json) => {
    console.log(json); //Kiem tra xem da co du lieu chua
    json.map((product) =>{
        Exo.innerHTML+=`<div class="card" style="width: 18rem; margin-top: 5%;"> 
        <a href="${product.href}">
        <img src="${product.img}" class="card-img-top" alt=""/>
        <div class="card-body">
          <p class="card-text">${product.tiltle}</p>
        </div>
        </a>
      </div>`
    })
}
);
