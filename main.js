fetch('https://risa0110.github.io/retail-dashboard-app-server/data/product.json')
    .then(response => response.json())
    .then(products => {
        /*made an imgage gallery template html*/
        const container = document.querySelector(".img-gallery");

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "product-images";

            const imglink = document.createElement("a");
            imglink.href = `product.html?id= ${product.id}`;

            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;

            imglink.appendChild(img);
            productDiv.appendChild(imglink);

            const plink = document.createElement("a");
            plink.href = `product.html?id=${product.id}`;
            plink.textContent = product.name;

            const price= document.createElement("p");
            price.textContent =  product.price + "yen";

            productDiv.appendChild(plink);
            productDiv.appendChild(price);
            container.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error("We couldn't get the products error:", error);
        });
