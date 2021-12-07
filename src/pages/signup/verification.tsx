import React, { useEffect, useState, FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'
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

const Verification: FC = () => {
  const router = useRouter()

  useEffect(() => {
    const user = getUserPool().getCurrentUser()
    if (user) {
      user && router.push('/')
    }
  }, [])

  const errorMessage = (message) => <p className="error">{message}</p>
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(
      errorMessage('メールアドレスを入力してください。')
    ),
    verificationCode: Yup.string().required(
      errorMessage('認証コードを入力してください。')
    ),
  })
  const onSubmit = async (values) => {
    const { email, verificationCode } = values
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: getUserPool(),
    })
    cognitoUser.confirmRegistration(verificationCode, true, (err: any) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('verification succeeded')
      router.push(URL.HOME)
    })
  }

  const initialValues = {
    email: '',
    verificationCode: '',
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
                            <Grid item xs={12} sm={6} md={12}>
                              <Input
                                label="メールアドレス"
                                name="email"
                                type="text"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                              <Input
                                label="認証コード"
                                name="verificationCode"
                                type="verificationCode"
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
                              認証する
                            </Button>
                          </Grid>
                        </CardActions>
                      </Form>
                    )
                  }}
                </Formik>
                <CardContent>
                  <Grid item container spacing={1} justifyContent="center">
                    <Grid item xs={12} sm={6} md={12}>
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

export default Verification
