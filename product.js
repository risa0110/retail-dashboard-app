//look for the location which URL you have now
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'));

//animation of the reveiw section
const stars = document.querySelectorAll("#star-rating span");
const ratingInput = document.getElementById("review-rating");

stars.forEach(star => {
    star.addEventListener("click", () => {
        const selectRating = parseInt(star.dataset.rating);
        ratingInput.value = selectRating;

        stars.forEach(s => {
            const starValue = parseInt(s.dataset.rating);
            if (starValue <= selectRating) {
                s.classList.add("selected");
            } else {
                s.classList.remove("selected");
            }
        });
    });
});

//function for posting the reviews in JSON file
function displayReview(review) {
    const container = document.getElementById("otherUser-review");
    const reviewEl = document.createElement("div");
    reviewEl.className = "review-item";

    const stars = document.createElement("span");
    stars.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    const title = document.createElement("strong");
    title.textContent = review.Title;

    const comment = document.createElement("p");
    comment.textContent = review.Comment;

    reviewEl.appendChild(stars);
    reviewEl.appendChild(title);
    reviewEl.appendChild(comment);

    container.prepend(reviewEl);
}

document.addEventListener("DOMContentLoaded",()=>{
    fetch("http://localhost:3000/review")
    .then(res => res.json())
    .then(allReviews => {
        const relatedReviews = allReviews.filter(r => r.productId === productId);
        relatedReviews.forEach(displayReview);
    })
    .catch(er=>{
        console.error("We couldn't recieve the data", er);
    })
});
//add the products in the cart
fetch('https://risa0110.github.io/retail-dashboard-app-server/data/product.json')
    .then(response => response.json())
    .then(products => {
        //style for the item description
        const description = document.createElement("p");

        //styling the product infomation section
        const imgContainer = document.getElementById("product-image");
        const productInfo = document.getElementById("product-info");

        const product = products.find(p => p.id === productId)
        const img = document.createElement("img");
        img.src = product.image;
        img.style.height = "696px";
        img.style.width = "580px";

        description.innerHTML = product.description;
        document.getElementById("desc").appendChild(description);

        const name = document.createElement("h1");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = product.price + "yen";
        price.style.fontSize = "30px";
        price.style.textAlign = "end";
        price.style.margin = "10px 0 30px";

        const containerTags = document.createElement("div");
        containerTags.style.display = "flex";
        containerTags.style.flexWrap = "wrap";
        containerTags.style.gap = "20px";
        containerTags.style.margin = "20px 0";
        const titleTags = document.createElement("h2");
        titleTags.textContent = "Related Keywords";

        //bringing the products tag data from Array 
        if (product && Array.isArray(product.tags)) {
            product.tags.forEach(tag => {
                const tagEl = document.createElement("p");
                tagEl.textContent = "#" + tag;
                tagEl.style.marginRight = "10px";
                tagEl.style.backgroundColor = "#daecff";
                tagEl.style.borderRadius = "5px";
                tagEl.style.padding = "5px 8px";
                containerTags.appendChild(tagEl);
            });
        }

        //stock items(vaariant items)
        if (product && Array.isArray(product.variants)) {
            product.variants.forEach(variant => {
                const stockItems = document.createElement("div");
                stockItems.style.display = "grid";
                stockItems.style.gridTemplateColumns = "1fr 3fr";
                stockItems.style.margin = "20px 0";
                const stockContainer1 = document.createElement("div");
                const stockContainer2 = document.createElement("div");
                stockContainer2.style.display = "flex";
                stockContainer2.style.alignItems = "center";
                stockContainer2.style.justifyContent = "space-between";

                stockItems.style.borderTop = "solid 1px";
                stockItems.style.padding = "30px 0";

                const stockImg = document.createElement("img");
                stockImg.src = variant.imgUrl;
                stockImg.style.width = "150px";
                stockImg.style.height = "180px";
                stockImg.style.marginRight = "20px";

                const stockName = document.createElement("p");
                stockName.textContent = variant.types;

                const stock = document.createElement("p");
                if (product.stock <= 0) {
                    stock.textContent = "Stock: ✖";
                } else {
                    stock.textContent = "Stock: 〇";
                }

                const buyBtn = document.createElement("button");
                buyBtn.textContent = "Add to the cart";
                buyBtn.className = "add-to-cart";
                buyBtn.style.padding = "8px 20px";
                buyBtn.style.backgroundColor = "var(--btn-color)"
                buyBtn.style.color = "var(--background-color-white)"
                buyBtn.style.border = "none";
                buyBtn.style.borderRadius = "5px";

                stockContainer1.appendChild(stockImg);
                stockContainer1.appendChild(stockName);
                stockContainer2.appendChild(stock);
                stockContainer2.appendChild(buyBtn);
                stockItems.appendChild(stockContainer1);
                stockItems.appendChild(stockContainer2);
                document.getElementById("stock").appendChild(stockItems);
            })
        }


        productInfo.appendChild(name);
        productInfo.appendChild(price);
        productInfo.appendChild(titleTags);
        productInfo.appendChild(containerTags);
        imgContainer.appendChild(img);


        //function of adding the items in the cart localStorage
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", () => {
                const existingItem = cartI.find(item => item.productId === productId);
                if (existingItem) {
                    existingItem.quantity += 1;
                    alert('one more!');//erase it later
                } else {
                    cartI.push({ productId, quantity: 1 });
                    alert('add the product');//erase it later
                }
                localStorage.setItem('cartI', JSON.stringify(cartI))
                location.reload();
            })
        });
    })

    .catch(error => {
        console.error("We couldn't get the products error:", error);
    });

//send review data to the server
document.getElementById("submit-reviewBtn").addEventListener("click", () => {
    const reviews = {
        productId: productId,
        rating: parseInt(document.getElementById("review-rating").value),
        Title: document.getElementById("review-title").value,
        Comment: document.getElementById("review-comment").value,
        date: new Date().toISOString()
    };
    fetch("http://localhost:3000/review", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviews)
    })
        .then(res => res.json())
        .then(data => {
            alert("You send the review!");
            console.log("Review has been sent successfully!", data);
            location.reload();
        })
        .catch(err => {
            console.error("We couldn't send the review:", err);
        })
})

