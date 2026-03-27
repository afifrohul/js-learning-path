/**
 * TODO
 * Selesaikan kode pembuatan class Inventory dengan ketentuan:
 * - Memiliki properti `items` untuk menampung daftar item dalam bentuk array.
 * - Memiliki method `addItem` untuk menambahkan item ke properti `items`.
 * - Memiliki method `removeItem` untuk menghapus item berdasarkan `id`.
 * - Memiliki method `listItems` untuk mengembalikan string yang merupakan informasi detail barang (dipanggil dari fungs `item.displayDetails()`).
 */

class Inventory {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(id) {
    const objWithIdIndex = this.items.findIndex(function (obj) {
      return obj.id === id;
    });

    if (objWithIdIndex > -1) {
      this.items.splice(objWithIdIndex, 1);
    }
  }

  listItems() {
    return this.items
      .map((item) => {
        return item.displayDetails();
      })
      .join("\n");
  }
}

// Jangan hapus kode di bawah ini!
export default Inventory;
