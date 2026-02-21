document.addEventListener("DOMContentLoaded", () => {
    fetch("./data/products.json")
        .then(res => res.json())
        .then(products => renderCatalog(products))
        .catch(err => console.error("Error cargando productos:", err));
});

function renderCatalog(products) {
    const sections = document.querySelectorAll("section[id^='section']");

    sections.forEach(section => {
        const category = section.id;
        const container = section.querySelector(".card-grid");
        if (!container) return;

        const filtered = products.filter(p => p.category === category);

        const fragment = document.createDocumentFragment();

        filtered.forEach(product => {
            const wrapper = document.createElement("div");
            wrapper.className = "card";
            wrapper.dataset.product = product.name;

            wrapper.innerHTML = `
        <div class="card-inner">
        <div class="card-front">
            <img src="${product.image}" alt="${product.alt}">
        </div>
        <div class="card-back">
            <h3>${product.name}</h3>
            <p>$${product.price} ${product.currency}</p>
            <p class="desc">${product.description}</p>
            <button onclick="toggleSelection(event, this)">Agregar a consulta</button>
        </div>
        </div>
    `;

            fragment.appendChild(wrapper);
        });

        container.appendChild(fragment);
    });
}