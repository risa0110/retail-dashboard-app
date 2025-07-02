const cartI = JSON.parse(localStorage.getItem('cartI'));

//remove items(理解がまだ足りてないので再確認！)
function removeFromCart(productIdToRemove){
    const updatedCart = cartI.filter(item => item.productId !== productIdToRemove);
    //keep only the items which item.productId & productIdToRemove isn't correct
    localStorage.setItem("cartI", JSON.stringify(updatedCart));
    const itemElement = document.getElementById(`cart-item-${productIdToRemove}`);
    if(itemElement){
        itemElement.remove();
    }
  }
//re-save the data(ここ理解しきれてないからな？？)
function recalTotal (){
  let Total = 0;
  quantityInputs.forEach(({InputEl, productId})=>{
    //caluculating the subTotal
    const quantity = parseInt(InputEl.value);
    const matchedProduct = productData.find(p=>p.id === productId);
    if(matchedProduct){
      Total += matchedProduct.price * quantity;
    }
    //save new quantity data to the localStorage
    const cartItem = cartI.find(item => item.productId === productId);
    if(cartItem){
      cartItem.quantity = quantity;
    }
  });
  localStorage.setItem('cartI',JSON.stringify(cartI));

  const subToatal =document.getElementById("total");
  subToatal.textContent = `${Total} yen`;
  subToatal.style.alignSelf="end";
  subToatal.style.marginLeft="10px";
  subToatal.style.color="red";
};
//ここもたぶん変な修正の仕方してるから変なところいっぱいあるかも....
fetch('https://risa0110.github.io/retail-dashboard-app-server/data/product.json')
  .then(response => response.json ())
  .then(products => {
    productData = products;
    quantityInputs = [];
    cartI.forEach(item => {
        const matchedProduct = products.find(p => p.id === item.productId );
        if(matchedProduct){
            const container = document.createElement("div");
            container.id= `cart-item-${matchedProduct.id}`;
            container.style.border="solid 1px #dcdcdc";
            container.style.margin="30px 0";
            container.style.padding="15px";
            container.style.display="flex";
            container.style.justifyContent="space-between";

            const container1 =document.createElement("div");
            container1.style.display="grid";
            container1.style.gridTemplateColumns="200px 200px";
            container1.style.gap="20px"
            const container2 = document.createElement("div");

            const imgCon = document.createElement("div");
            const img = document.createElement("img");
            img.src = matchedProduct.image;
            img.style.width="110px";
            img.style.height="132px"; 

            const productCon = document.createElement("div");
            const productName = document.createElement("p");
            productName.textContent=matchedProduct.name;

            const price = document.createElement("p");
            price.textContent=matchedProduct.price + "yen";

            const q = document.createElement("input");
            q.type="number";
            q.value= item.quantity;

            quantityInputs.push({InputEl:q, productId: matchedProduct.id});

            const del = document.createElement("button");
            del.textContent = "delete";
            del.addEventListener("click", () => {
                removeFromCart(matchedProduct.id);//ここ仮置きだから！これだけじゃ機能しないよー
            })
            del.style.border="none";
            del.style.backgroundColor="#fff";
            del.style.borderBottom="solid 1px"
            del.style.margin="0 20px"
            del.style.fontSize="16px"
            container2.style.alignSelf="flex-end";

            imgCon.appendChild(img);
            productCon.appendChild(productName);
            productCon.appendChild(price);
            
            container2.appendChild(del);
            container1.appendChild(imgCon);
            container1.appendChild(productCon);
            container1.appendChild(q);
            container.appendChild(container1);
            container.appendChild(container2);
            document.getElementById("cart-items").appendChild(container);

        }
    });
    recalTotal();
    console.log(cartI)//←後で消せ。確認用
  })
  .catch(error => {
    console.error("We couldn't get the products error:", error);
  })

//when you clicked the cal-btn it will calculate the newest Total
document.getElementById("cal").addEventListener("click", ()=>{
  recalTotal();
});

//when you clicked the Buy-btn, the localStorage data of the users cart will send to the server-side
document.getElementById("buy-btn").addEventListener("click", ()=>{
  fetch("http://localhost:3000/purchase",{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(cartI)
  })
  .then(response => response.json())
  .then(data=>{
    console.log(data.message);
    document.getElementById("orrder-completed").classList.remove("hidden");
    localStorage.clear();
  })
  .catch(error=>{
    console.error("purchase error:", error);
    alert("We couldn't connect to the server. Try it again.")
  })
})