import Link from "next/link";
import { useEffect } from "react";

export function Menu() {
  return (
    <nav className="navbar navbar-expand-lg fixed-bottom bg-light">
      <div className="container-fluid">
        <Link  href="/">
          <a className="navbar-brand">Deaes</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Ver Deaes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Enviar Deae</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Aprovar Deae</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}