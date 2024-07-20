const showcaseList = document.getElementById("showcase-container");
console.log(showcaseList); //Kiem tra xem da lay duoc the productlist hay chua

fetch("./js/api_Showcase.json")
  .then((res) => res.json())
  .then((json) => {
    
    console.log(json); //Kiem tra xem da co du lieu chua
    json.map((product) =>{
        showcaseList.innerHTML+=`<div class="card" style="width: 18rem;">
        <a href="${product.href}">
        <img src="${product.img}" class="card-img-top" alt=""/>
        <div class="card-body">
          <p class="card-text">${product.tiltle}</p>
          <p class="card-des">${product.text}</P>
        </div>
        </a>
      </div>` 
    })
}
);

const productlist = document.getElementById("products-list");
console.log(productlist);

fetch("./js/api_Products.json")
.then((res) => res.json())
.then((json)=>{
  json.map((products)=>{
    productlist.innerHTML+=`
    <div class="row">
      <div class="col-lg-4 col-md-12 mb-4">
        <div class="card">
        <a href="#!">
          <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light p_card"
            data-mdb-ripple-color="light">
            <img src="${products.img}"
             />
              <div class="hover-overlay">
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
              </div>
          </div>
          <div class="card-body">
              <h5 class="card-title mb-3">${products.tiltle}</h5>
            <h6 class="mb-3">${products.price}</h6>
          </div>
          </a>
        </div>
      </div>
    `
  })
})
