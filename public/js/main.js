const socket = io();
const productsList = document.getElementById("products");

socket.on("init", (products) => {
    products.forEach((product) => {
        const li = createProduct(product);
        productsList.appendChild(li);
    });
});

socket.on("productAdded", (product) => {
    const li = createProduct(product);
    productsList.appendChild(li);
});

function createProduct(product){
    const li = document.createElement("li");
    li.innerHTML = `<span>${product.title}</span> 
     -
     $${product.price}
     -
     ${product.description}
     -
     Código: ${product.code}
     - 
     Stock: ${product.stock}
     - 
     Categoría: ${product.category}
     `;
    li.className = "collection-item";

    return li;
}

