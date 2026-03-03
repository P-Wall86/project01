document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();

    document
        .querySelectorAll("#whatsapp-button, #hero .slide:last-child button")
        .forEach(btn => btn.addEventListener("click", showPreview));

    const previewModal = document.getElementById("previewModal");
    const closeBtn = previewModal.querySelector(".modal-close");
    const sendBtn = previewModal.querySelector("#sendWhatsappBtn");

    if (sendBtn) {
        sendBtn.addEventListener("click", sendWhatsApp);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            previewModal.style.display = "none";
        });
    }

    //Click outside
    previewModal.addEventListener("click", (e) => {
        if (e.target === previewModal) {
            previewModal.style.display = "none";
        }
    });

    //ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            previewModal.style.display = "none";
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
window.selectedProducts = new Set();

// Modal selection
function showPreview() {
    const list = document.getElementById('selectedList');
    list.innerHTML = '';

    if (selectedProducts.size === 0) {
        list.innerHTML = '<li>Selecciona un producto.</li>';
    } else {
        selectedProducts.forEach(p => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${p}</span>
                <button class="remove-item" data-product="${p}">×</button>
            `;
            list.appendChild(li);
        });
    }

    document.getElementById('previewModal').style.display = 'flex';
}

//Remove selection
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const product = e.target.dataset.product;

        selectedProducts.delete(product);

        const card = document.querySelector(`.card[data-product="${product}"]`);
        if (card) {
            card.classList.remove('selected');
        }

        updateWhatsappState();

        showPreview();
    }
});

// Send WhatsApp msg
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

// Back to Top
const backToTopBtn = document.getElementById("backToTop");

backToTopBtn.style.display = "none";

window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});