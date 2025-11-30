const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const wishlistPath = path.join(__dirname, '..', 'data', 'wishlist.json');

class Wishlist {
  constructor({ id, user, bookTitle, author }) {
    this.id = id || uuidv4();
    this.user = user;
    this.bookTitle = bookTitle;
    this.author = author;
  }

  static #readWishlist() {
    try {
      const data = fs.readFileSync(wishlistPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  static #writeWishlist(wishlist) {
    fs.writeFileSync(wishlistPath, JSON.stringify(wishlist, null, 2), 'utf8');
  }

  static find(query) {
    const wishlist = this.#readWishlist();
    return wishlist.filter(item => item.user === query.user);
  }

  static findById(id) {
    const wishlist = this.#readWishlist();
    return wishlist.find(item => item.id === id);
  }

  static create(itemData) {
    const wishlist = this.#readWishlist();
    const newItem = new Wishlist(itemData);
    wishlist.push(newItem);
    this.#writeWishlist(wishlist);
    return newItem;
  }

  static findByIdAndRemove(id) {
    const wishlist = this.#readWishlist();
    const itemIndex = wishlist.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return null;
    }
    const removedItem = wishlist.splice(itemIndex, 1);
    this.#writeWishlist(wishlist);
    return removedItem[0];
  }
}

module.exports = Wishlist;