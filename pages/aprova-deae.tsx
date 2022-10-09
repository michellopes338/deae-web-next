import { useState } from "react"
import { useQuery } from "react-query"
import { api } from "../src/infra/api"
import { IDeae } from "../src/interface/deaes.interface"

export default function Approve() {
  const [deaes, setDeaes] = useState<IDeae[]>([])
  
  useQuery<IDeae[]>('getPendingDeae', async () => {
    const response = await api.get('deaes?fields=is_valid&search=false')
    setDeaes(response.data)
    return response.data;
  })

  async function approve(id: string) {
    await api.patch(`validate-deae/${id}`)
      .then(res => {
        const filteredDeaes = deaes?.filter(deae => {
          if (deae.id !== res.data.id) {
            return deae
          }
        })

        setDeaes(filteredDeaes);
      }).catch(err => {
        console.warn(err)
      })
  }

  async function discart(id: string) {
    await api.delete(`deaes/${id}`).then(res => {
      const filteredDeaes = deaes?.filter(deae => {
        if (deae.id !== res.data.id) {
          return deae
        }
      })

      setDeaes(filteredDeaes);
    })
  }

  if (!deaes) return <h3>Nenhum deae pendente</h3>
  
  return (
    <div className="container">
      <h1>Aprovar</h1>
      {deaes.map(deae => (
        <div key={deae.id} className="card my-3">
          <div className="card-body">
            <h5 className="card-title">Deae</h5>
            <h6 className="text-dark">Desvio</h6>
            <p className="text-dark">{deae.deviation}</p>
            <h6 className="text-dark">Correção</h6>
            <p className="text-dark">{deae.adjustment}</p>
          </div>

          <div className="row m-2">
            <div className="col">
              <div className="d-grid">
                <button className="btn btn-primary" onClick={() => approve(deae.id)}>Aprovar</button>
              </div>
            </div>
            <div className="col">
              <div className="d-grid">
                <button className="btn btn-secondary" onClick={() => discart(deae.id)}>Reprovar</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}