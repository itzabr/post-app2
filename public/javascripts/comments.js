console.log("comment.js loaded ✅");

document.addEventListener("submit", async e => {

  if (!e.target.classList.contains("comment-form")) return;

  e.preventDefault(); // ❗ stop page reload

  const form = e.target;
  const postId = form.dataset.postid;
  const input = form.querySelector(".comment-input");
  const text = input.value.trim();

  if (!text) return;

  try {
    const res = await fetch(`/api/comment/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    if (!data.success) return;

    // find comments box just above the form
    const commentsBox = form.previousElementSibling;

    const newCommentDiv = document.createElement("div");
    newCommentDiv.className = "text-sm text-gray-700 mb-1";
    newCommentDiv.innerHTML = `
      <span class="font-semibold">${data.comment.username}:</span>
      ${data.comment.text}
    `;

    commentsBox.appendChild(newCommentDiv);

    // clear input
    input.value = "";

  } catch (err) {
    console.error("Comment AJAX error:", err);
  }
});
