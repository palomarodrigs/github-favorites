export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.update();
  }

  update() {
    this.removeALLTr();
  }

  removeALLTr() {
    const tbody = this.root.querySelector("table tbody");

    tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
