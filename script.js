document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

function calculateFare() {
    const distance = parseFloat(document.getElementById("distance").value);
    const passengers = parseInt(document.getElementById("passengers").value);

    const pensioner = document.getElementById("pensioner").checked;
    const nearby = document.getElementById("nearby").checked;
    const luggage = document.getElementById("luggage").checked;

    const result = document.getElementById("result");

    if (isNaN(distance) || distance <= 0) {
        result.textContent = "Please enter a valid distance.";
        return;
    }

    if (distance > 140) {
        result.textContent = "Maximum distance is 140km.";
        return;
    }

    if (passengers > 5) {
        result.textContent = "Maximum amount of passengers is 5.";
        return;
    }

    // Base fare
    let baseFare = nearby ? 10 : 30;

    const costPerKm = 4.4;
    const perPassengerFee = 20;
    const luggageCost = 30;

    let fare = baseFare + (distance * costPerKm * 2);

    if (passengers > 3) {
        fare += perPassengerFee;

        if (luggage) {
            fare += luggageCost;
        }
    }

    // Pensioner discount
    if (pensioner) {
        fare *= 0.85; // 15% off
    }

    result.textContent = `Estimated Fare: R${fare.toFixed(2)}`;
}
