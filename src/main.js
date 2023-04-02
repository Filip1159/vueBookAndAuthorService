import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import HomeComponent from './components/HomeComponent'
import DupaComponent from './components/DupaComponent'
import App from './App'
import EditBookComponent from "@/components/EditBookComponent";
import CreateBookComponent from "@/components/CreateBookComponent";

Vue.use(VueRouter)

Vue.use(Vuex)

const routes = [
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/dupa', name: 'Dupa', component: DupaComponent },
    { path: '/edit-book/:id', name: 'EditBook', component: EditBookComponent },
    { path: '/create-book', name: 'CreateBook', component: CreateBookComponent }
]

const router = new VueRouter({
    routes
})

const store = new Vuex.Store({
    state: {
        bookBeingUpdated: {
            title: '',
            pages: 0,
            authors: []
        },
        authors: [],
        books: []
    },
    getters: {

    },
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
        }
    },
    actions: {
        setBooks({ commit }, books) {
            commit('SET_BOOKS', books)
        },
        setAuthors({ commit }, authors) {
            commit('SET_AUTHORS', authors)
        },
        removeBook({ commit }, bookId) {
            console.log(1)
            fetch(`http://localhost:9000/book/${bookId}`, {method: 'delete'})
                .then(r => {
                    console.log(2)
                    if (r.status === 200) commit('REMOVE_BOOK', bookId)
                })
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
