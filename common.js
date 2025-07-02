//cart menu
const cartIcon = document.getElementById("cartIcon");
const closeBtn = document.getElementById("close-btn");

const cartM = document.querySelector(".cart-menu"); 
cartIcon.addEventListener("click", () =>{
    cartM.classList.toggle("hidden");
});
closeBtn.addEventListener("click", ()=>{
    cartM.classList.toggle("hidden");
})
// cart(Local Storage)
const cartI = JSON.parse(localStorage.getItem('cartI')) || [];

//show the products which u put into the cart
fetch('https://risa0110.github.io/retail-dashboard-app-server/data/product.json')
     .then(response => response.json())
     .then(products =>{
        cartI.forEach(item => {
          const product = products.find(p=> p.id === item.productId);
          if(product){
            const container = document.getElementById("cart-items");
            const eachItems = document.createElement("div");
            eachItems.className = "each-item";
            
            const cartImage = document.createElement("img");
            cartImage.src=product.image;

            const productName = document.createElement("p");
            productName.textContent=product.name;
            productName.style.paddingLeft="5%";
            productName.style.alignContent="center";

            eachItems.appendChild(cartImage);
            eachItems.appendChild(productName);
            container.appendChild(eachItems);
          }
        })
     })
     .catch(error => {
            console.error("Error occured:", error);
        })

