const commentFormHandler = async function (event) {
  event.preventDefault();

  const postID = document.querySelector("#post-id").innerHTML;
  const commentID = +postID;
  const content = document.querySelector("#comment-body").value;

  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        content,
        commentID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      response.json();
    }
  }
};

document
  .querySelector("#new-comment-form")
  .addEventListener("click", commentFormHandler);
