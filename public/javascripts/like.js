console.log("like.js loaded ✅");

document.addEventListener("click", async e => {

  if (!e.target.classList.contains("like-btn")) return;

  const btn = e.target;
  const postId = btn.dataset.postid;

  const res = await fetch(`/api/like/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();

  if (!data.success) return;

  const countSpan = btn.querySelector(".like-count");

  if (data.status === "liked") {
    btn.childNodes[0].textContent = "Unlike ";
  }

  if (data.status === "unliked") {
    btn.childNodes[0].textContent = "Like ";
  }

  countSpan.textContent = data.likesCount;
});
