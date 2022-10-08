import { Input } from "../src/components/Input";
import { Form } from '@unform/web';

export default function Login() {
  function handleSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <div className="container">
      <div className="fixed-bottom">
        <Form onSubmit={handleSubmit} className="m-4">
          <Input name="username" label="nome de usuario" className="my-2" />
          <Input name="password" type="password" label="senha" className="my-2" />

          <div className="d-grid">
            <button className="btn btn-primary my-2">logar</button>
          </div>
        </Form>
      </div>
    </div>
  )
}