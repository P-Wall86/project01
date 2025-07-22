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

        function showPreview() {
            const list = document.getElementById('selectedList');
            list.innerHTML = '';
            if (selectedProducts.size === 0) {
                list.innerHTML = '<li>No seleccionaste nada todavía.</li>';
            } else {
                selectedProducts.forEach(p => {
                    const li = document.createElement('li');
                    li.textContent = p;
                    list.appendChild(li);
                });
            }
            document.getElementById('previewModal').style.display = 'flex';
        }

        function sendWhatsApp() {
            if (selectedProducts.size === 0) return;
            const message = encodeURIComponent("Hola! Estoy interesad@ en los siguientes productos: \n- " + Array.from(selectedProducts).join("\n- "));
            const whatsappNumber = '5491124834551';
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            document.getElementById('previewModal').style.display = 'none';
        }

        document.getElementById('previewModal').addEventListener('click', (e) => {
            if (e.target.id === 'previewModal') {
                document.getElementById('previewModal').style.display = 'none';
            }
        });