document.addEventListener("DOMContentLoaded", function() {
  let counter = document.getElementById("counter");
  let plusBtn = document.getElementById("plus");
  let minusBtn = document.getElementById("minus");
  let heartBtn = document.getElementById("heart");
  let pauseBtn = document.getElementById("pause");
  let likesList = document.querySelector(".likes");
  let commentForm = document.getElementById("comment-form");
  let commentInput = document.getElementById("comment-input");
  let commentsDiv = document.getElementById("list");

  let timer = null;
  let paused = false;
  let likes = {};

  function startTimer() {
    timer = setInterval(() => {
      counter.textContent = parseInt(counter.textContent) + 1;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  startTimer();

  plusBtn.addEventListener("click", function() {
    counter.textContent = parseInt(counter.textContent) + 1;
  });

  minusBtn.addEventListener("click", function() {
    counter.textContent = parseInt(counter.textContent) - 1;
  });

  heartBtn.addEventListener("click", function() {
    let num = counter.textContent;
    likes[num] = (likes[num] || 0) + 1;
    let existing = document.getElementById(`like-${num}`);
    if (existing) {
      existing.textContent = `${num} has been liked ${likes[num]} time${likes[num] > 1 ? "s" : ""}`;
    } else {
      let li = document.createElement("li");
      li.id = `like-${num}`;
      li.textContent = `${num} has been liked 1 time`;
      likesList.appendChild(li);
    }
  });

  pauseBtn.addEventListener("click", function() {
    if (!paused) {
      stopTimer();
      plusBtn.disabled = true;
      minusBtn.disabled = true;
      heartBtn.disabled = true;
      pauseBtn.textContent = "resume";
      paused = true;
    } else {
      startTimer();
      plusBtn.disabled = false;
      minusBtn.disabled = false;
      heartBtn.disabled = false;
      pauseBtn.textContent = "pause";
      paused = false;
    }
  });

  commentForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let p = document.createElement("p");
    p.textContent = commentInput.value;
    commentsDiv.appendChild(p);
    commentInput.value = "";
  });
});