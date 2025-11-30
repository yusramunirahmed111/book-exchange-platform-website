const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

class User {
  constructor({ id, username, email, password }) {
    this.id = id || uuidv4();
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static #readUsers() {
    try {
      const data = fs.readFileSync(usersPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  static #writeUsers(users) {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf8');
  }

  static findAll() {
    return this.#readUsers();
  }

  static findOne({ email }) {
    const users = this.#readUsers();
    return users.find(user => user.email === email);
  }

  static create(userData) {
    const users = this.#readUsers();
    const newUser = new User(userData);
    users.push(newUser);
    this.#writeUsers(users);
    return newUser;
  }
}

module.exports = User;