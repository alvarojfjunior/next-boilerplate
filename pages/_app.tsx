import '../styles/globals.css'
import "react-toastify/ReactToastify.min.css";
import type { AppProps } from 'next/app'
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ToastContainer position="top-right" newestOnTop />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
