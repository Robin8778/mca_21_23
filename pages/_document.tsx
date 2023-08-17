import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/mca.png" />
          <meta
            name="description"
            content="MCA Thapar 2021-2023 Batch."
          />
          <meta property="og:site_name" content="mca-21-23.vercel.app" />
          <meta
            property="og:description"
            content="MCA Thapar 2021-2023 Batch."
          />
          <meta property="og:title" content="MCA Thapar 2021-2023 Batch." />
          <meta name="twitter:card" content="MCA Thapar 2021-2023 Batch." />
          <meta name="twitter:title" content="MCA Thapar 2021-2023 Batch." />
          <meta
            name="twitter:description"
            content="MCA Thapar 2021-2023 Batch."
          />
        </Head>
        <body className=" lg:bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
