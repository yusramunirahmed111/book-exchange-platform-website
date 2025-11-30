const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const bookRequestsPath = path.join(__dirname, '..', 'data', 'bookRequests.json');

class BookRequest {
  constructor({ id, book, owner, requester }) {
    this.id = id || uuidv4();
    this.book = book;
    this.owner = owner;
    this.requester = requester;
    this.status = 'Pending';
  }

  static #readBookRequests() {
    try {
      const data = fs.readFileSync(bookRequestsPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  static #writeBookRequests(bookRequests) {
    fs.writeFileSync(bookRequestsPath, JSON.stringify(bookRequests, null, 2), 'utf8');
  }

  static findAll() {
    return this.#readBookRequests();
  }

  static find(query) {
    const requests = this.#readBookRequests();
    return requests.filter(request => {
      for (const key in query) {
        if (request[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  static findById(id) {
    const requests = this.#readBookRequests();
    return requests.find(request => request.id === id);
  }

  static create(requestData) {
    const requests = this.#readBookRequests();
    const newRequest = new BookRequest(requestData);
    requests.push(newRequest);
    this.#writeBookRequests(requests);
    return newRequest;
  }

  static findByIdAndUpdate(id, updateData) {
    const requests = this.#readBookRequests();
    const requestIndex = requests.findIndex(request => request.id === id);
    if (requestIndex === -1) {
      return null;
    }
    const updatedRequest = { ...requests[requestIndex], ...updateData };
    requests[requestIndex] = updatedRequest;
    this.#writeBookRequests(requests);
    return updatedRequest;
  }
}

module.exports = BookRequest;