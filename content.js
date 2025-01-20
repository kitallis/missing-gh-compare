function addCompareButton() {
  // Check if button already exists
  if (document.querySelector(".sha-compare-item")) return;

  // Find the repository details container
  const container = document.querySelector("#repository-details-container ul");
  if (!container) return;

  // Create the list item
  const listItem = document.createElement("li");
  listItem.className = "sha-compare-item";

  // Create the button
  const button = document.createElement("button");
  button.textContent = "Compare SHA";
  button.className = "sha-compare-button";

  // Add click handler
  button.addEventListener("click", () => {
    const pathParts = window.location.pathname.split("/");
    const owner = pathParts[1];
    const repo = pathParts[2];

    const sha = prompt("Enter the SHA to compare with main:");
    if (!sha) return;

    const compareUrl = `https://github.com/${owner}/${repo}/compare/${sha}...main`;
    window.open(compareUrl, "_blank");
  });

  // Add button to list item and list item to container
  listItem.appendChild(button);
  container.appendChild(listItem);
}

// Run when page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addCompareButton);
} else {
  addCompareButton();
}

// Run when navigation occurs (for single-page app support)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    addCompareButton();
  }
}).observe(document, { subtree: true, childList: true });
