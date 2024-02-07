export default class API {
  static #url = "https://wmhy7g-5001.csb.app";

  static #catchError(r, dataName) {
    if (r.status === 404) {
      throw new Error(`${dataName} not found`);
    }
    if (!r.ok) {
      throw new Error(`Failed to ${dataName}`);
    }
    return r.json();
  }

  static #sendData(endpoint, data, dataName) {
    return fetch(`${this.#url}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((r) => this.#catchError(r, `send ${dataName}`));
  }

  static #requestData(endpoint, dataName) {
    return fetch(`${this.#url}${endpoint}`).then((r) =>
      this.#catchError(r, dataName),
    );
  }

  static #deleteData(endpoint, dataName) {
    return fetch(`${this.#url}${endpoint}`, {
      method: "DELETE",
    }).then((r) => this.#catchError(r, `delete ${dataName}`));
  }

  static #updateData(endpoint, data, dataName) {
    return fetch(`${this.#url}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((r) => this.#catchError(r, `update ${dataName}`));
  }

  static getUserByParams(params) {
    return this.#requestData(
      `/users?${new URLSearchParams(params).toString()}`,
      "user",
    )
      .then((data) => {
        if (data.length === 0) {
          throw new Error("user not found");
        }
        return data;
      })
      .then((users) => users[0]);
  }

  static getUserNotes(id) {
    return this.#requestData(`/users/${id}/notes`, "user notes");
  }

  static getNoteById(id) {
    return this.#requestData(`/notes/${id}`, "note");
  }

  static sendUser(data) {
    return this.#sendData("/users", data, "user");
  }

  static sendNote(data) {
    return this.#sendData("/notes", data, "note");
  }

  static deleteNote(id) {
    return this.#deleteData(`/notes/${id}`, "note");
  }

  static updateNote(id, data) {
    return this.#updateData(`/notes/${id}`, data, "note");
  }
}
