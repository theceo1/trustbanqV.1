import React from 'react'
import Head from 'next/head'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>trustbanq - Cryptocurrency Exchange</title>
        <meta name="description" content="Exchange Nigerian Naira to cryptocurrency and vice-versa" />
      </Head>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to trustbanq</h1>
        <p className="text-xl mb-4">
          The most secure and user-friendly cryptocurrency exchange platform in Nigeria.
        </p>
        <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
          Get Started
        </button>
      </div>
    </>
  )
}

export default Home