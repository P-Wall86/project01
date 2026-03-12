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
            <div class="card-image-wrapper">
        <img src="${product.image}" alt="${product.alt}" loading="lazy">
    </div>
    <div class="card-info">
        <h3>${product.name}</h3>
        <span class="view-detail-link" data-product="${product.id}">VER DETALLE</span>
    </div>
            `;

            wrapper.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-detail-link')) {
                    const detailLink = wrapper.querySelector('.view-detail-link');
                    if (detailLink) detailLink.click();
                }

            });

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
    if (e.target.classList.contains('view-detail-link')) {
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

                    let modalImg = modal.querySelector('.modal-image');
                    if (!modalImg) {
                        modalImg = document.createElement('img');
                        modalImg.className = 'modal-image';
                        modal.querySelector('.modal-content').prepend(modalImg);
                    }
                    modalImg.src = product.image;

                    let modalButton = document.getElementById('modal-action');
                    if (!modalButton) {
                        modalButton = document.createElement('button');
                        modalButton.id = 'modal-action';
                        modalButton.style.marginTop = '15px';
                        modalButton.addEventListener('click', (ev) => toggleSelection(ev, modalButton));

                        const infoContainer = modal.querySelector('.modal-info-container');
                        if (infoContainer) {
                            infoContainer.appendChild(modalButton);
                        }
                    }

                    modalButton.closestCard = card;

                    if (card.classList.contains('selected')) {
                        modalButton.textContent = 'Quitar de consulta';
                        modalButton.classList.add('quitar');
                    } else {
                        modalButton.textContent = 'Agregar a consulta';
                        modalButton.classList.remove('quitar');
                    }

                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
    }
});

//Updated WhatsApp Button
const whatsappButton = document.getElementById('whatsapp-button');

function updateWhatsappState() {
    const whatsappButton = document.getElementById('whatsapp-button');
    const countSpan = document.getElementById('whatsapp-count');

    if (!whatsappButton) return;

    const count = window.selectedProducts.size;

    if (count > 0) {
        whatsappButton.classList.add('active');
        whatsappButton.setAttribute('data-count', count);

        if (countSpan) {
            countSpan.textContent = count;
            countSpan.style.display = 'flex';
        }
    } else {
        whatsappButton.classList.remove('active');
        whatsappButton.removeAttribute('data-count');

        if (countSpan) {
            countSpan.style.display = 'none';
        }
    }
}

// Modal Product Selection
function toggleSelection(event, btn) {
    event.stopPropagation();
    const card = btn.closestCard || btn.closest('.card');
    const product = card.dataset.product;

    if (window.selectedProducts.has(product)) {
        window.selectedProducts.delete(product);
        card.classList.remove('selected');
        btn.textContent = 'Agregar a consulta';
        btn.classList.remove('quitar');
    } else {
        window.selectedProducts.add(product);
        card.classList.add('selected');
        btn.textContent = 'Quitar de consulta';
        btn.classList.add('quitar');
    }

    updateWhatsappState();
}

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    //ESC Key Modal Closer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // X Modal Closer
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-close')) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });