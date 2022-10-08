import { Form } from "@unform/web";
import { FormHandles } from '@unform/core';
import Link from "next/link";
import { useRef, useState } from "react";
import { Input } from "../src/components/Input";
import * as Yup from 'yup';
import classNames from "classnames";
import { api } from "../src/infra/api";
import Router from "next/router";

interface Props {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateAccount() {
  const formRef = useRef<FormHandles>(null);
  const router = Router;
  const [error, setError] = useState('');
  const [alertVisibility, setAlertVisibility] = useState(false);

  async function handleSubmit(data: Props) {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        username: Yup.string().min(8, 'nome de usuario invalido').max(64, 'nome de usuario invalido').required('o campo username é obrigatorio'),
        email: Yup.string().email().required('o campo email é obrigatorio'),
        password: Yup.string().min(8, 'senha invalida').max(64, 'senha invalida').required('o campo senha é obrigatorio'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'as senhas devem ser a mesma'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      const { confirmPassword, ...rest } = data;

      await api.post('users', rest)
        .then(() => {
          router.replace('/login')
        })
    } catch (err) {
      const validationErrors: any = {};
      let errorMessage = '';
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          const path = error.path as string
          validationErrors[path] = error.message;
        })
        errorMessage += Object.entries(validationErrors).map(obj => `${obj[0]}: ${obj[1]}\n`)
        setError(errorMessage)
        setAlertVisibility(true)
      }
    }
  }

  return (
    <div className="container">
      <h1>Fazer login</h1>
      {alertVisibility && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          <div>
            {error}
          </div>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setAlertVisibility(false)}></button>
        </div>
      )}
      <div className="fixed-bottom">
        <Form ref={formRef} onSubmit={handleSubmit} className={classNames({
          "m-4 needs-validation": true,
        })}>
          <Input name="username" label="nome de usuario" className="my-2" />
          <Input name="email" type="email" label="email" className="my-2" />
          <Input name="password" type="password" label="senha" className="my-2" />
          <Input name="confirmPassword" type="password" label="confirme sua senha" className="my-2" />

          <div className="d-grid">
            <button className="btn btn-primary my-2">criar conta</button>
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