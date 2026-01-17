import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>シノビガミ キャラクター管理</title>
        <meta
          name="description"
          content="シノビガミのキャラクターシート管理サイト"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-sumi">
          シノビガミ キャラクター管理
        </h1>
      </main>
    </>
  )
}
