import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AccessToken } from "../../infra/cookies";

export function Menu() {
  const access_token = useMemo(() => new AccessToken, []);
  const [role, setRole] = useState('USER');
  
  useEffect(() => {
    const tokenRole = access_token.handleJWT().role;
    setRole(tokenRole);
  }, [access_token])
  return (
    <nav className="navbar navbar-expand-lg fixed-bottom bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">Deaes</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/home" prefetch={false}>
                <a className="nav-link" aria-current="page">Ver Deaes</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/envia-deae">
                <a className="nav-link">Enviar Deae</a>
              </Link>
            </li>
            {role === 'ADMIN' && (
              <li className="nav-item">
                <Link href="/aprova-deae">
                  <a className="nav-link">Aprovar Deae</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}