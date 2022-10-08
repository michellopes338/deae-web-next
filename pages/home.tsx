import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import { api } from '../src/infra/api';
import { IDeae } from '../src/interface/deaes.interface';

const Home: NextPage = () => {
  const { data: deaes } = useQuery<IDeae[]>('list-deae', async () => {
    const response = await api.get('deaes?fields=is_valid&search=true&order=desc')

    return response.data;
  }, {
    staleTime: 60, // one minute
    refetchOnWindowFocus: false,
    retry: true,
  })

  return (
    <div className='container'>
      <h1 className='h1'>Deaes</h1>
      <div className="deaes">
        {deaes?.map(deae => (
          <div key={deae.id} className="card my-3">
            <div className="card-header">
              <strong>nome</strong>: {deae.user.username}
            </div>
            <div className="card-header">
              <h5 className="card-title">Deae</h5>
              <div className="row">
                <div className="col">
                  <h6>local</h6>
                  <p>{deae.local.label}</p>
                </div>
                <div className="col">
                  <h6>classificação</h6>
                  <p>{deae.classification.label}</p>
                </div>
                <div className="col">
                  <h6>status</h6>
                  <p>{deae.status.label}</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6>Desvio</h6>
                  <p>{deae.deviation}</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6>Correção</h6>
                  <p>{deae.adjustment}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
