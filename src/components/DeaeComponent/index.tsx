import { IDeae } from "../../interface/deaes.interface";

export function DeaeComponent(deae: IDeae) {
  return (
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
  )
}