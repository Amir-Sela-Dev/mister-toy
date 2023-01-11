// const Router = ReactRouterDOM.HashRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux
import './assets/style/main.css'
import './assets/style-scss/styles.scss'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutUs } from "./pages/about-us";
import { HomePage } from './pages/home-page';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { ToyIndex } from './pages/toy-index';
import { ToyDetails } from './pages/toy-details';
import { ToyEdit } from './pages/toy-edit';
import { Dashboard } from './pages/dashboard';



export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<Dashboard />} path="/dashboard" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}


