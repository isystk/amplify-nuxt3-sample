import React, { useEffect, useState, FC, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { getUserPool } from '@/utilities/aws'
import { URL } from '@/common/constants/url'
import Layout from '@/components/Layout'
import Head from '@/components/pages/Head'
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from '@material-ui/core'
import { Input, Textarea } from '@/components/elements/Input'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '@/auth/AuthProvider'

const SignUp: FC = () => {
  const router = useRouter()
  const auth = useContext(AuthContext)

  useEffect(() => {
    if (auth.currentUser) {
      router.push('/')
    }
  }, [])

  const errorMessage = (message) => <p className="error">{message}</p>
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(
      errorMessage('メールアドレスを入力してください。')
    ),
    password: Yup.string().required(
      errorMessage('パスワードを入力してください。')
    ),
  })
  const onSubmit = async (values) => {
    const { email, password } = values
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ]
    getUserPool().signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        console.error(err)
        return
      }
      router.push(URL.SIGNUP_VERIFICATION)
    })
  }

  const initialValues = {
    email: '',
    password: '',
  }

  return (
    <Layout>
      <Head title="会員登録" />
      <section>
        <div className="entry-header">
          <h1 className="entry-title">会員登録</h1>
        </div>
        <div className="entry-content">
          <Grid container justifyContent="center" spacing={1}>
            <Grid item md={12}>
              <Card>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({
                    setFieldValue,
                    dirty,
                    isValid,
                    values,
                    handleChange,
                    handleBlur,
                  }) => {
                    return (
                      <Form>
                        <CardContent>
                          <Grid
                            item
                            container
                            spacing={1}
                            justifyContent="center"
                          >
                            <Grid item xs={12} sm={12} md={12}>
                              <Input
                                label="メールアドレス"
                                name="email"
                                type="text"
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <Input
                                label="パスワード"
                                name="password"
                                type="password"
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                        <CardActions>
                          <Grid item xs={12} sm={6} md={6}>
                            <Button
                              disabled={!dirty || !isValid}
                              variant="contained"
                              color="primary"
                              type="Submit"
                            >
                              会員登録する
                            </Button>
                          </Grid>
                        </CardActions>
                      </Form>
                    )
                  }}
                </Formik>
                <CardContent>
                  <Grid item container spacing={1}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Link href={URL.LOGIN}>
                        <a>ログインはこちら</a>
                      </Link>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </section>
    </Layout>
  )
}

export default SignUp
