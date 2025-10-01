import React from 'react'

const Home = () => {
  return (
    <section
      // ✅ Удален id="home", так как он не нужен для React Router DOM
      style={{
        height: '100vh',
        backgroundColor: '#080f19',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '100px',
        boxSizing: 'border-box',
      }}
    ></section>
  )
}

export default Home
