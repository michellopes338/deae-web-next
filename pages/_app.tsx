import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Menu } from '../src/patterns/Menu';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const router = useRouter()
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {['/login', '/cria-conta'].includes(router.pathname) ? '' : <Menu />}
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp