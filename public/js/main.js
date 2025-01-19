const socket = io();
const productsList = document.getElementById("products");

socket.on("init", (products) => {
    productsList.innerHTML = "";
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
     
     <button class="delete" data-id="${product.id}">Eliminar producto</button>
     `;
     
    li.className = "collection-item";

    return li;
}

productsList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete")) {
        const productId = event.target.getAttribute("data-id");

        const response = await fetch(`/api/products/${productId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            event.target.parentElement.remove();
        } else {
            console.error("Error al eliminar el producto");
        }
    }
});

socket.on("productDeleted", (productId) => {
    const productElement = document.querySelector(`[data-id="${productId}"]`).parentElement;
    if (productElement) {
        productElement.remove();
    }
});
