import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import { InfiniteScrollDeae } from '../src/components/InfiniteScrollDeae';
import { api } from '../src/infra/api';
import { IDeae } from '../src/interface/deaes.interface';

const Home: NextPage = () => {
  const { data: deaes } = useQuery<IDeae[]>('list-deae', async () => {
    const response = await api.get('deaes?fields=is_valid&search=true&order=desc')

    return response.data;
  }, {
    staleTime: 1000 * 60, // one minute
    refetchOnWindowFocus: false,
  })
  if (!deaes) return <h2>Ninguem enviou deae</h2>
  return (
    <div className='container'>
      <h1 className='h1'>Deaes</h1>
      <InfiniteScrollDeae data={deaes} />
      <br /> <br /> <br />
    </div>
  )
}

export default Home
