import React from 'react'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Footer from './components/Footer/Footer.jsx'

import Works from './pages/Works/Works.jsx'
import Services from './pages/Services/Services.jsx'
import Etapy from './pages/Etapy/Etapy.jsx'
import Stoimost from './pages/Stoimost/Stoimost.jsx'
import Komanda from './pages/Komanda/Komanda.jsx'
import ContactForm from './pages/ContactForm/ContactForm.jsx'

import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Works />
      <Services />
      <Etapy />
      <Stoimost />
      <Komanda />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default App
