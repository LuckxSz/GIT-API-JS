const repositories = document.querySelector(".content-main");
const input = document.getElementById("input");
const colors = {
  JavaScript: "background-color:yellow;",
  HTML: "background-color:orange;",
  CSS: "background-color:blue;",
  Phyton: "background-color:purple;",
  Portugol: "background-color:white;",
};
function getAPI(devnick) {
  fetch(`https://api.github.com/users/${devnick}/repos`).then(async (res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    let data = await res.json();
    data.map((i) => {
      let project = document.createElement("div");
      project.innerHTML = `
      <div class="project">
      <div>
        <h4 class="title">${i.name}</h4>
        <span class="date-create">${Intl.DateTimeFormat("pt-BR").format(
          new Date(i.created_at)
        )}</span>
      </div>
      <div>
        <a href="${i.html_url}" target="blank">${i.html_url}</a>
        <span class="language"><span style=${
          colors[i.language]
        } class="circle"></span>${i.language}</span>
      </div>
    </div>
    
      `;

      repositories.appendChild(project);
    });
  });
}

input.addEventListener("keyup", (e) => {
  console.log(e.key);
  if (e.key === "Enter") {
    repositories.innerHTML = "";
    getAPI(e.target.value);
  }
});
