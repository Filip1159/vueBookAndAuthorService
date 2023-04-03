import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex)

const HEADERS = {'Content-Type': 'application/json'}

export const store = new Vuex.Store({
    state: {
        bookBeingUpdated: {
            title: '',
            pages: 0,
            authors: []
        },
        authors: [],
        books: []
    },
    getters: {},
    mutations: {
        SET_BOOKS(state, books) {
            state.books = books
        },
        SET_AUTHORS(state, authors) {
            state.authors = authors
        },
        SET_BOOK_BEING_UPDATED(state, bookBeingUpdated) {
            state.bookBeingUpdated = bookBeingUpdated
        },
        REMOVE_BOOK(state, bookIdToRemove) {
            state.books = state.books.filter(book => book.id !== bookIdToRemove)
        },
        UPDATE_BOOK(state, bookToUpdate) {
            const bookFromStore = state.books.filter(book => book.id === bookToUpdate.id)[0]
            bookFromStore.title = bookToUpdate.title
            bookFromStore.pages = bookToUpdate.pages
            bookFromStore.authorIds = bookToUpdate.authorIds
        },
        CREATE_BOOK(state, bookToCreate) {
            state.books.push(bookToCreate)
        }
    },
    actions: {
        setBooks({commit}, books) {
            commit('SET_BOOKS', books)
        },
        setAuthors({commit}, authors) {
            commit('SET_AUTHORS', authors)
        },
        removeBook({commit}, bookId) {
            console.log(1)
            fetch(`http://localhost:9000/book/${bookId}`, {method: 'delete'})
                .then(r => {
                    console.log(2)
                    if (r.status === 200) commit('REMOVE_BOOK', bookId)
                })
        },
        updateBook({commit}, newlyUpdatedBook) {
            console.log(newlyUpdatedBook)
            fetch(`http://localhost:9000/book/${newlyUpdatedBook.id}`,
                {
                    method: 'put',
                    headers: HEADERS,
                    body: JSON.stringify({
                        title: newlyUpdatedBook.title,
                        pages: newlyUpdatedBook.pages,
                        authorIds: newlyUpdatedBook.authorIds
                    })
                })
                .then(r => {
                    console.log('upd')
                    if (r.status === 200) commit('UPDATE_BOOK', newlyUpdatedBook)
                })
        },
        createBook({commit}, bookToCreate) {
            fetch(`http://localhost:9000/book`, {
                method: 'post',
                headers: HEADERS,
                body: JSON.stringify(bookToCreate)
            })
                .then(async r => {
                    if (r.status === 201) commit('CREATE_BOOK', await r.json())
                })
        }
    }
})
