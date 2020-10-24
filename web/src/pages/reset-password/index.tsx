import FormContainer from '@/components/FormContainer'
import LogoContainer from '@/components/LogoContainer'
import PasswordInput from '@/components/PasswordInput'
import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'

import * as Yup from 'yup'

import {
  Container,
  BackButton,
  ResetPasswordForm,
  ConfirmButton
} from './styles'

const ResetPassword: React.FC = () => {
  const [isFormValid, setIsFormValid] = useState(false)
  const { back } = useRouter()
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(() => {
    console.log('submitted')
  }, [])

  const performValidation = useCallback(async () => {
    try {
      setIsFormValid(true)
      formRef.current?.setErrors({})
      const data = formRef.current.getData()

      const schema = Yup.object().shape({
        password: Yup.string().required('Digite sua senha'),
        password_confirmation: Yup.string()
          .nullable()
          .oneOf(
            [Yup.ref('password'), null],
            'Confirmação de senha deve ser igual a senha'
          )
      })

      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      setIsFormValid(false)
    }
  }, [])

  return (
    <Container>
      <LogoContainer></LogoContainer>
      <FormContainer>
        <BackButton onClick={back}>
          <FiArrowLeft size={24} color="#15C3D6" />
        </BackButton>

        <ResetPasswordForm ref={formRef} onSubmit={handleSubmit}>
          <h1>Redefinição de senha</h1>
          <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>

          <PasswordInput
            label="Nova senha"
            name="password"
            onKeyUp={performValidation}
          ></PasswordInput>

          <PasswordInput
            label="Repetir senha"
            name="password_confirmation"
            onKeyUp={performValidation}
          ></PasswordInput>

          <ConfirmButton disabled={!isFormValid}>Enviar</ConfirmButton>
        </ResetPasswordForm>
      </FormContainer>
    </Container>
  )
}

export default ResetPassword
