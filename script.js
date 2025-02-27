document.addEventListener('DOMContentLoaded', function() {
    let currentVehicle = null;
    let baseAmount = 0;
    let discount = 0;
    let paymentMethod = null;

    // Vehicle Selection
    document.querySelectorAll('.vehicle-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentVehicle = button.dataset.type;
            baseAmount = parseInt(button.dataset.rate);
            updatePaymentDisplay();
            openEntryGate();
        });
    });

    // Payment Method Selection
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            paymentMethod = e.target.value;
        });
    });

    window.processPayment = function() {
        const total = baseAmount - discount;
        if(total <= 0 || !paymentMethod) return;
        
        document.getElementById('payment-section').style.display = 'none';
        document.getElementById('receipt').style.display = 'block';
        document.getElementById('receipt-details').innerHTML = `
            Vehicle: ${currentVehicle.toUpperCase()}<br>
            Amount Paid: ₹${total}<br>
            Payment Method: ${paymentMethod}<br>
            Time: ${new Date().toLocaleString()}
        `;
        
        openExitGate();
    }

    window.toggleDarkMode = function() {
        document.body.classList.toggle('dark-mode');
    }

    window.generatePDF = function() {
        const doc = new jsPDF();
        doc.text(document.getElementById('receipt-details').innerText, 10, 10);
        doc.save('toll-receipt.pdf');
    }

    window.applyDiscount = function() {
        const code = document.getElementById('discount-code').value;
        if(code === 'VIP20') discount = baseAmount * 0.2;
        updatePaymentDisplay();
    }

    function openEntryGate() {
        animateGate('🚀', 3000);
    }

    function openExitGate() {
        animateGate('🚪', 3000);
    }

    function animateGate(symbol, duration) {
        const gate = document.getElementById('entry-gate');
        gate.textContent = symbol;
        setTimeout(() => {
            gate.textContent = '🚧';
        }, duration);
    }

    function updatePaymentDisplay() {
        document.getElementById('selected-vehicle').textContent = currentVehicle;
        document.getElementById('amount').textContent = baseAmount - discount;
    }
});