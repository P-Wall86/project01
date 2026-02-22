//Fetch Catalog
document.addEventListener("DOMContentLoaded", () => {
    fetch("./data/products.json")
        .then(res => res.json())
        .then(products => renderCatalog(products))
        .catch(err => console.error("Error cargando productos:", err));
});

//Render Catalog
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
            <img src="${product.image}" alt="${product.alt}">
            <div class="card-info">
                <h3>${product.name}</h3>
                <button class="view-detail" data-product="${product.id}">Ver detalle</button>
            </div>
            `;

            fragment.appendChild(wrapper);
        });

        container.appendChild(fragment);
    });
}

// Modal Details
const modal = document.querySelector('.modal');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-detail')) {
        const productId = e.target.dataset.product;
        const card = e.target.closest('.card');
        
        fetch('./data/products.json')
            .then(res => res.json())
            .then(products => {
                const product = products.find(p => p.id === productId);
                if (product) {
                    modalTitle.textContent = product.name;
                    modalPrice.textContent = `$${product.price} ${product.currency}`;
                    modalDesc.textContent = product.description;
                    
                    let modalButton = document.getElementById('modal-action');
                    if (!modalButton) {
                        modalButton = document.createElement('button');
                        modalButton.id = 'modal-action';
                        modalButton.style.marginTop = '15px';
                        modalButton.addEventListener('click', (ev) => toggleSelection(ev, modalButton));
                        modal.querySelector('.modal-content').appendChild(modalButton);
                    }

                    modalButton.closestCard = card;

                    if (card.classList.contains('selected')) {
                        modalButton.textContent = 'Quitar de consulta';
                    } else {
                        modalButton.textContent = 'Agregar a consulta';
                    }

                    modal.style.display = 'flex';
                }
            });
    }
});

// Modal Product Selection
function toggleSelection(event, btn) {
    event.stopPropagation();
    const card = btn.closestCard || btn.closest('.card');
    const product = card.dataset.product;

    if (selectedProducts.has(product)) {
        selectedProducts.delete(product);
        card.classList.remove('selected');
        btn.textContent = 'Agregar a consulta';
    } else {
        selectedProducts.add(product);
        card.classList.add('selected');
        btn.textContent = 'Quitar de consulta';
    }

    if (btn.id === 'modal-action') {
        if (card.classList.contains('selected')) {
            btn.textContent = 'Quitar de consulta';
        } else {
            btn.textContent = 'Agregar a consulta';
        }
    }
}

modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
});