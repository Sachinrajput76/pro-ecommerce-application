import Register from '../components/auth/Register'
import Layout from '../layouts/Main'

import { getSession } from 'next-auth/client'

export default function RegisterPage() {
  return (
    <Layout title='Register' >
      <Register />
    </Layout>
  )
}

export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req })
  console.log("session from register", session)
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