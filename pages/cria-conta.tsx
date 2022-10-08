import { Form } from "@unform/web";
import Link from "next/link";
import { Input } from "../src/components/Input";

export default function CreateAccount() {
  function handleSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <div className="container">
      <h1>Fazer login</h1>
      <div className="fixed-bottom">
        <Form onSubmit={handleSubmit} className="m-4">
          <Input name="username" label="nome de usuario" className="my-2" />
          <Input name="email" type="email" label="email" className="my-2" />
          <Input name="password" type="password" label="senha" className="my-2" />
          <Input name="confirmPassword" type="password" label="confirme sua senha" className="my-2" />

          <div className="d-grid">
            <button className="btn btn-primary my-2">logar</button>
          </div>
          <span>já tem uma conta? 
            <Link href="/login" prefetch={false}>
              <a>faça login</a>
            </Link>
          </span>
        </Form>
      </div>
    </div>
  )
}