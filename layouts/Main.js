import Head from 'next/head';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import TopBarHeader from '../components/Top-Bar-Header';
import Footer from '../components/footer';
import { useAcceptCookies } from '../lib/hooks/useAcceptCookies'
import dynamic from 'next/dynamic'

export default ({ children, title = 'Next.js Ecommerce' }) => {
  const router = useRouter();
  const pathname = router.pathname;

  const Loading = () => (
    <div className="w-80 h-80 flex items-center text-center justify-center p-3">
      "...loading"
    </div>
  )
  const dynamicProps = {
    loading: Loading,
  }
  const FeatureBar = dynamic(
    () => import('../components/CookieBottomBar'),
    dynamicProps
  )

  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

  return (
    <div className="app-main">
      <Head>
        <title>{title}</title>
      </Head>
      <TopBarHeader />

      <Header />

      <main className={(pathname !== '/' ? 'main-page' : '')}>
        {children}
      </main>
      <Footer />
      <FeatureBar
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        action={
          <button className="btn btn--rounded btn--yellow" onClick={() => onAcceptCookies()}>
            Accept cookies
          </button>
        }
      />
    </div>
  )
}