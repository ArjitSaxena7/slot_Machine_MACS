document.addEventListener("DOMContentLoaded", () => {
    const slotItems = document.getElementById("slotItems");
    const spinButton = document.getElementById("spinButton");
    const itemHeight = 200;
    const totalItems = document.querySelectorAll(".slot-item").length;
    let position = 0;
    let velocity = 30;
    let isSpinning = false;

    // Clone items for seamless looping
    slotItems.innerHTML += slotItems.innerHTML;

    function spin() {
        if (isSpinning) return;

        isSpinning = true;
        spinButton.disabled = true;
        spinButton.textContent = "Spinning...";

        // Randomized velocity between 25 and 220
        velocity = Math.floor(Math.random() * (220 - 25 + 1)) + 25;

        function animate() {
            position -= velocity;

            // Seamless looping: Reset position when reaching duplicate items
            if (position <= -(totalItems * itemHeight)) {
                position = 0;
            }

            slotItems.style.transform = `translateY(${position}px)`;

            // **Gradually slow down**
            if (velocity > 1) {
                velocity *= 0.95; // Smooth deceleration
                requestAnimationFrame(animate);
            } else {
                // Snap to the closest item
                let stopIndex = Math.round(position / itemHeight);
                position = stopIndex * itemHeight;
                slotItems.style.transform = `translateY(${position}px)`;

                // Allow spinning again
                isSpinning = false;
                spinButton.disabled = false;
                spinButton.textContent = "ANS";
            }
        }

        animate();
    }

    spinButton.addEventListener("click", spin);
});
