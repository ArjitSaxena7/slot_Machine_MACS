document.addEventListener("DOMContentLoaded", () => {
    const slotItems = document.getElementById("slotItems");
    const spinButton = document.getElementById("spinButton");
    const slotItemList = document.querySelectorAll(".slot-item");
    const itemHeight = slotItemList[0].offsetHeight;
    const totalItems = slotItemList.length;

    let position = 0;
    let isSpinning = false;

    function spin() {
        if (isSpinning) return;

        isSpinning = true;
        spinButton.disabled = true;
        spinButton.textContent = "Spinning...";

        // Select a random stopping index 
        const stopIndex = Math.floor(Math.random() * totalItems);

        // Ensure enough spins before stopping (at least 3 full rotations)
        const totalSpins = Math.floor(Math.random() * 4 + 3); // 3 to 6 full spins

        // Calculate the final stopping position
        const targetPosition = -(totalSpins * totalItems + stopIndex) * itemHeight;

        // Calculate velocity based on the number of images, stopping index, and total spins
        const baseVelocity = totalItems * 10; // Adjust the multiplier as needed
        const spinFactor = Math.random() * totalSpins + stopIndex; // Combine randomness
        let velocity = Math.floor(Math.random() * baseVelocity) + spinFactor; // Minimum speed + random spin factor

        function animate() {
            position -= velocity;

            slotItems.style.transform = `translateY(${position}px)`;

            // Gradually slow down
            if (velocity > 1) {
                velocity *= 0.96; // Smooth deceleration
                requestAnimationFrame(animate);
            } else {
                // Snap to exact image position
                position = -stopIndex * itemHeight;
                slotItems.style.transform = `translateY(${position}px)`;

                isSpinning = false;
                spinButton.disabled = false;
                spinButton.textContent = "Spin";
            }
        }

        animate();
    }

    spinButton.addEventListener("click", spin);
});
