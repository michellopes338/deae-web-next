import { Form } from "@unform/web";
import Link from "next/link";
import { Input } from "../src/components/Input";
import * as Yup from 'yup';
import { useEffect, useMemo, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import { api } from "../src/infra/api";
import { AccessToken, RefreshToken } from '../src/infra/cookies';
import classNames from "classnames";
import { IResLogin } from "../src/interface/login.interface";
import Router from "next/router";

export default function Login() {
  const [validate, setValidate] = useState(false);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const access_token = useMemo(() => new AccessToken(), []);
  const refresh_token = new RefreshToken();
  const formRef = useRef<FormHandles>(null);
  const router = Router;

  useEffect(() => {
    const access_token_value = access_token.getToken()
    if (access_token_value) router.replace('/home')
  }, [access_token, router])

  async function handleSubmit(data: FormData) {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        username: Yup.string().min(8, 'nome de usuario invalido').max(64, 'nome de usuario invalido').required(),
        password: Yup.string().min(8, 'senha invalida').max(64, 'senha invalida').required()
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      await api.post('auth/login', data)
        .then((res: IResLogin) => {
          const data = res.data;
          access_token.setToken(data.access_token)
          refresh_token.setToken(data.refresh_token)
          router.replace('/home')
        })
        .catch((err) => {
          console.log(err);
          setAlertVisibility(true);
          setAlertMsg('Usuario ou senha incorretos')
        })
    } catch(err) {
      const validationErrors: any = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          const path = error.path as string
          validationErrors[path] = error.message;
        })
        setValidate(true);
        console.log(validationErrors);
        formRef.current?.setErrors(validationErrors);
      }
    }
  }

  return (
    <div className="container">
      <h1>Fazer login</h1>
      <div className="fixed-bottom">
        <Form ref={formRef} onSubmit={handleSubmit} className={classNames({
          "m-4 needs-validation": true,
          "was-validated": validate
        })}>
          <Input name="username" minLength={8} maxLength={64} label="nome de usuario" className="my-2" required />
          <Input name="password" minLength={8} maxLength={64} type="password" label="senha" className="my-2" required />

          <div className="d-grid">
            <button className="btn btn-primary my-2">logar</button>
          </div>
          <span>não tem uma conta? 
            <Link href="/cria-conta" prefetch={false}>
              <a>crie uma</a>
            </Link>
          </span>
        </Form>
      </div>
      {alertVisibility && (
        <div className="alert alert-dismissible alert-danger" role="alert" >
          <div>{alertMsg}</div>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setAlertVisibility(false)}></button>
        </div>
      )}
    </div>
  )
}