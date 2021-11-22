import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useGetAllQuery } from '../generated/graphql'

const Home: NextPage = () => {
  const response = useGetAllQuery()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  console.log(response.data?.avos[0]?.name)

  useEffect(() => {
    const getUser = async () => {
      const token = sessionStorage.getItem('token')

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/user/current`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const user = await response.json()
      if (!user) {
        console.log('User is not logged in')
        return
      }
      setIsLoggedIn(true)
      console.log('User is logged in')
      console.log(user)
    }

    getUser()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div>
          {isLoggedIn ? (
            <button type="submit">Logout</button>
          ) : (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
        </div>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
