document.addEventListener("DOMContentLoaded", function () {
  const toggles = document.querySelectorAll(".read-more-toggle");

  toggles.forEach(function (button) {
    const textElement = button.previousElementSibling;
    const card = button.closest('.bg-gray-100'); // Card container
    const fullText = textElement.textContent.trim();
    const shortText = fullText.slice(0, 250) + "...";

    let isExpanded = false;
    textElement.textContent = shortText;

    // Toggle on button click
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent bubbling to document click
      if (isExpanded) {
        textElement.textContent = shortText;
        button.textContent = "Read More";
      } else {
        textElement.textContent = fullText;
        button.textContent = "Read Less";
      }
      isExpanded = !isExpanded;
    });

    // Collapse if clicked outside the card
    document.addEventListener("click", function (e) {
      if (isExpanded && !card.contains(e.target)) {
        textElement.textContent = shortText;
        button.textContent = "Read More";
        isExpanded = false;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggles = document.querySelectorAll(".read-more-toggle-text-only");

  toggles.forEach(function (button) {
    const textElement = button.previousElementSibling;
    const card = button.closest('.bg-gray-100'); // Card container
    const fullText = textElement.textContent.trim();
    const shortText = fullText.slice(0, 400) + "...";

    let isExpanded = false;
    textElement.textContent = shortText;

    // Toggle on button click
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent bubbling to document click
      if (isExpanded) {
        textElement.textContent = shortText;
        button.textContent = "Read More";
      } else {
        textElement.textContent = fullText;
        button.textContent = "Read Less";
      }
      isExpanded = !isExpanded;
    });

    // Collapse if clicked outside the card
    document.addEventListener("click", function (e) {
      if (isExpanded && !card.contains(e.target)) {
        textElement.textContent = shortText;
        button.textContent = "Read More";
        isExpanded = false;
      }
    });
  });
});
