const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const messagesPath = path.join(__dirname, '..', 'data', 'messages.json');

class Message {
  constructor({ id, sender, receiver, book, message }) {
    this.id = id || uuidv4();
    this.sender = sender;
    this.receiver = receiver;
    this.book = book;
    this.message = message;
    this.createdAt = new Date();
  }

  static #readMessages() {
    try {
      const data = fs.readFileSync(messagesPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  static #writeMessages(messages) {
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2), 'utf8');
  }

  static find(query) {
    const messages = this.#readMessages();
    // This is a simplified find implementation. It only handles the specific query from the controller.
    return messages.filter(message => {
      return message.book === query.book &&
        ((message.sender === query.$or[0].sender && message.receiver === query.$or[0].receiver) ||
         (message.sender === query.$or[1].sender && message.receiver === query.$or[1].receiver));
    });
  }

  static create(messageData) {
    const messages = this.#readMessages();
    const newMessage = new Message(messageData);
    messages.push(newMessage);
    this.#writeMessages(messages);
    return newMessage;
  }
}

module.exports = Message;