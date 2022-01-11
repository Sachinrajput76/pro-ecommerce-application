import Login from '../components/auth/Login'
import Layout from '../layouts/Main'

import { getSession } from 'next-auth/client'

export default function LoginPage() {
  return (
    <Layout title='Login' >
      <Login />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  console.log("session", session)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }

}