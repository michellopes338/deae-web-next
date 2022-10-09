import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { Select } from "../src/components/select";
import Textarea from "../src/components/textarea";
import { api } from "../src/infra/api";
import * as Yup from 'yup';
import classNames from "classnames";

export default function SendDeae() {
  const [validate, setValidate] = useState(false);
  const [toastMsg, setToasdMsg] = useState('');
  const [toastVisibility, setToastVisibility] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const successSend = 'Deae enviado com sucesso\nVocê ja pode enviar o próximo';

  async function handleSubmit(data: FormData) {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        deviation: Yup.string().min(10).max(255).required(),
        adjustment: Yup.string().min(10).max(255).required(),
        statusId: Yup.string().uuid().required(),
        classificationId: Yup.string().uuid().required(),
        localId: Yup.string().uuid().required()
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      setToastVisibility(true)
      await api.post('deaes', data)
        .then(() => {
          setToasdMsg(successSend);
        })
        .catch((err) => {
          setToasdMsg(err.message)
        })
    } catch (err) {
      const validationErrors: any = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          const path = error.path as string
          validationErrors[path] = error.message;
        })
        setValidate(true);
        formRef.current?.setErrors(validationErrors);
      }
    }
  }

  const { data: statusOptions } = useQuery('getStatusOptions', async () => {
    const response = await api.get('selectables/status')
    return response.data;
  })
  const { data: classificationOptions } = useQuery('getClassificationOptions', async () => {
    const response = await api.get('selectables/classification')
    return response.data;
  })
  const { data: localOptions } = useQuery('getLocalOptions', async () => {
    const response = await api.get('selectables/local')
    return response.data;
  })

  return (
    <div className="container">
      <h1>Envio de Deae</h1>
      <div className="fixed-bottom mb-7 mx-2">
        <Form ref={formRef} onSubmit={handleSubmit} className={classNames({
          "needs-validation": true,
          "was-validated": validate
        })}>
          <Textarea name="deviation" minLength={10} maxLength={255} label="Desvio" />
          <Textarea name="adjustment" minLength={10} maxLength={255} label="Correção" />
          <h6>Status</h6>
          <Select className="my-2" placeholder="selecione" name="statusId" options={statusOptions} />
          <h6>Classificação</h6>
          <Select className="my-2" placeholder="selecione" name="classificationId" options={classificationOptions} />
          <h6>Local</h6>
          <Select className="my-2" placeholder="selecione" name="localId" options={localOptions} />

          <div className="d-grid my-4">
            <button className="btn btn-primary">Enviar</button>
          </div>
        </Form>
      </div>
      
      {toastVisibility && (
        <div className={classNames({
          "alert alert-dismissible": true,
          "alert-success": toastMsg === successSend,
          "alert-danger": toastMsg !== successSend
        })} role="alert" >
          <div>{toastMsg}</div>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setToastVisibility(false)}></button>
        </div>
      )}
    </div>
  )
}