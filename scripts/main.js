document.addEventListener("DOMContentLoaded", () => {
    // Year update
    document.getElementById("year").textContent = new Date().getFullYear();

    // Hero slides & Whatsapp button
    document.querySelectorAll("#whatsapp-button, #hero .slide:last-child button")
        .forEach(btn => btn.addEventListener("click", showPreview));

    const sendBtn = document.querySelector("#previewModal button");
    sendBtn.addEventListener("click", sendWhatsApp);

    // Close modal
    document.getElementById('previewModal').addEventListener('click', (e) => {
        if (e.target.id === 'previewModal') {
            document.getElementById('previewModal').style.display = 'none';
        }
    });
});

// Burger menu
const burger = document.querySelector('.burger-menu');
const mobileNav = document.querySelector('.mobile-nav');

burger.addEventListener('click', () => {
    if (mobileNav.style.display === 'flex') {
        mobileNav.style.display = 'none';
    } else {
        mobileNav.style.display = 'flex';
        mobileNav.style.flexDirection = 'column';
    }
});

// Product selection
const selectedProducts = new Set();

function toggleSelection(event, btn) {
    event.stopPropagation();
    const card = btn.closest('.card');
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
}

// Modal selection
function showPreview() {
    const list = document.getElementById('selectedList');
    list.innerHTML = '';
    if (selectedProducts.size === 0) {
        list.innerHTML = '<li>Selecciona un producto.</li>';
    } else {
        selectedProducts.forEach(p => {
            const li = document.createElement('li');
            li.textContent = p;
            list.appendChild(li);
        });
    }
    document.getElementById('previewModal').style.display = 'flex';
}

//Send WhatsApp msg
function sendWhatsApp() {
    if (selectedProducts.size === 0) return;
    const message = encodeURIComponent(
        "Hola! Estoy interesad@ en los siguientes productos: \n- " + 
        Array.from(selectedProducts).join("\n- ")
    );
    const whatsappNumber = '5491124834551';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    document.getElementById('previewModal').style.display = 'none';
}