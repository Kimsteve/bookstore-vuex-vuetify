import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// const url = 'https://localhost:5001/books'
// const headers = { Accept: 'application/json' }

export default new Vuex.Store({
  state: {
    books: {}
  },
  mutations: {
    setBooks (state, payload) {
      state.books = payload
    },
    deleteItem (state, item) {
      state.books = state.books.filter(t => item.id !== t.id)
    },
    newBook (state, item) {
      state.books.unshift(item)
    }

  },
  actions: {
    async fetchBooks (state) {
      const response = await axios.get('https://localhost:5001/books')
      state.commit('setBooks', response.data)
    },

    async removeItem (state, item) {
      await axios.delete('https://localhost:5001/books/' + item.id)
      state.commit('deleteItem', item)
    },
    async saveNewItem (state, item) {

    },
    async saveEditedItem (state, item) {
      await axios.put('https://localhost:5001/books/' + item.id, item)
      // console.log(response)
    },
    async addNewBook (state, item) {
      const response = await axios.post('https://localhost:5001/books', item)
      state.commit('newBook', response.data)
    }

  },
  modules: {
  },
  getters: {
    getBooks: state => state.books
  }
})
