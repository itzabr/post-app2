document.addEventListener("click", async e => {

  if (!e.target.classList.contains("follow-btn")) return;

  const btn = e.target;
  const userId = btn.dataset.userid;

  const res = await fetch(`/api/follow/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await res.json();

  if (!data.success) return;

  // update button UI
  if (data.status === "requested") {
    btn.textContent = "Request Sent";
    btn.className = "follow-btn bg-gray-400 text-white px-4 py-2 rounded";
    btn.disabled = true;
  }

  if (data.status === "followed") {
    btn.textContent = "Unfollow";
    btn.className = "follow-btn bg-red-500 text-white px-4 py-2 rounded";
  }

  if (data.status === "unfollowed") {
    btn.textContent = "Follow";
    btn.className = "follow-btn bg-blue-500 text-white px-4 py-2 rounded";
  }
});
