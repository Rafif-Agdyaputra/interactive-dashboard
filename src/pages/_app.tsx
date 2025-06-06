import "@/styles/globals.css";
import 'react-loading-skeleton/dist/skeleton.css';
import type { AppProps } from "next/app";
import HomeHeader from "../../component/header/HomeHeader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HomeHeader/>
      <Component {...pageProps} />
    </>
  )
}
