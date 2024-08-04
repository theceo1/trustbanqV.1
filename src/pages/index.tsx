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
        <h1 className="text-4xl font-bold mb-0">trustBank</h1>
        <p className="text-2lg mb-4 mt-0">TRADE | SPEND | <span className="text-teal-500">EARN</span></p>

        <p className="text-lg mb-4">
          secure and user-friendly cryptocurrency exchange you can <span className="text-teal-500">trust</span>
        </p>
        <button className="bg-primary text-white px-2 py-2 rounded-md hover:bg-opacity-90">
          Get in there!!!
        </button>
      </div>
    </>
  )
}

export default Home