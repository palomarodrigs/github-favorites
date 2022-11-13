import { GithubUser } from "./GithubUser.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
  }

  async add(username) {
    try {
      const userExists = this.entries.find((entry) => entry.login === username);

      if (userExists) {
        throw new Error("Usuário já adicionado");
      }

      const user = await GithubUser.search(username);
      if (user.login === undefined) {
        throw new Error("Usuário não encontrado!");
      }

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );

    this.entries = filteredEntries;
    this.update();
    this.save();
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector("table tbody");

    this.update();
    this.onadd();
  }

  onadd() {
    const addButton = this.root.querySelector(".search button");
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input");

      this.add(value);
    };
  }

  update() {
    this.removeALLTr();

    if (this.entries.length === 0) {
      this.tbody.innerHTML = `
            <tr>
              <td class="star" colspan="100%">
                <img class="star-img" src="./assets/star-icon.svg" alt="" />
                <p class="star-text">Nenhum favorito ainda</p>
              </td>
            </tr>`;
    } else {
      this.entries.forEach((user) => {
        const row = this.createRow();

        row.querySelector(
          ".user img"
        ).src = `https://github.com/${user.login}.png`;
        row.querySelector(".user img").alt = "imagem de ${user.name}";
        row.querySelector(".user p").textContent = user.name;
        row.querySelector(".user a").href = `https://github.com/${user.login}`;
        row.querySelector(".user span").textContent = user.login;
        row.querySelector(".repositories").textContent = user.public_repos;
        row.querySelector(".followers").textContent = user.followers;

        row.querySelector(".remove").onclick = () => {
          const isOk = confirm("Tem certeza que deseja deletar essa linha?");
          if (isOk) {
            this.delete(user);
          }
        };

        this.tbody.append(row);
      });
    }
  }
  createRow() {
    const row = document.createElement("tr");

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
