import About from "components/About";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo canonical="https://clipboard.ninja/about" />
      <About />
    </>
  );
}
