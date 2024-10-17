import { Footer } from "@/components/Common/Footer/footer";
import { Header } from "@/components/Common/Header/header";
import { Providers } from "@/redux/providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function App({ Component, pageProps }: AppProps) {

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (

    isClient && 
    <Providers>
      <Header/>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer/>
    </Providers>
  )
}
