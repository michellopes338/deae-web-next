import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Menu } from '../src/patterns/Menu';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <>
      {router.pathname in ['/login', '/cria-conta'] ? <Menu /> : ''}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp