import { Html, Head, Main, NextScript } from 'next/document'
import Header from '@/components/header'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href='/assets/images/Netflix.ico' />
      </Head>
      <body>
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
