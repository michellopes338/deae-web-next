import { IDeae } from "../../interface/deaes.interface";

export function DeaeComponent(deae: IDeae) {
  return (
    <div key={deae.id} className="card my-3">
      <div className="card-header text-dark">
        <strong>nome</strong>: {deae.user.username}
      </div>
      <div className="card-header">
        <h5 className="card-title text-dark">Deae</h5>
        <div className="row">
          <div className="col">
            <h6 className="text-dark">local</h6>
            <p className="text-dark">{deae.local.label}</p>
          </div>
          <div className="col">
            <h6 className="text-dark">classificação</h6>
            <p className="text-dark">{deae.classification.label}</p>
          </div>
          <div className="col">
            <h6 className="text-dark">status</h6>
            <p className="text-dark">{deae.status.label}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h6 className="text-dark">Desvio</h6>
            <p className="text-dark">{deae.deviation}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h6 className="text-dark">Correção</h6>
            <p className="text-dark">{deae.adjustment}</p>
          </div>
        </div>
      </div>
    </div>
  )
}