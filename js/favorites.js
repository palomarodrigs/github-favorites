export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = [
      {
        login: "palomarodrigs",
        name: "Paloma Rodrigues",
        public_repos: "17",
        followers: "1000",
      },
      {
        login: "diego3g",
        name: "Diego Fernandes",
        public_repos: "48",
        followers: "1000",
      },
    ];
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector("table tbody");

    this.update();
  }

  update() {
    this.removeALLTr();

    this.entries.forEach((user) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;
      row.querySelector(".user img").alt = "imagem de ${user.name}";
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;

      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td class="user">
              <img
                src="https://github.com/palomarodrigs.png"
                alt="Imagem do usuário"
              />
              <a href="https://github.com/palomarodrigs" target="_blank">
              <p>Paloma Rodrigues</p>
              <span>palomarodrigs</span>
            </td>
            <td class="repositories">17</td>
            <td class="followers">1000</td>
            <td>
            <button class="remove">Remover</button>
           </td>
`;

    return tr;
  }

  removeALLTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
