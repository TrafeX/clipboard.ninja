import About from "components/About";
import { faqItems } from "lib/faq";
import { FAQPageJsonLd, NextSeo } from "next-seo";

export default function AboutPage() {
  const title = "How to use Clipboard.ninja - Help & Privacy";
  const description =
    "Learn how to share text between devices with Clipboard.ninja: pair two devices with a Device ID and send text in real time. Encrypted, with nothing stored on the server.";

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical="https://clipboard.ninja/about"
        openGraph={{
          url: "https://clipboard.ninja/about",
          title,
          description,
        }}
      />
      <FAQPageJsonLd
        mainEntity={faqItems.map((item) => ({
          questionName: item.question,
          acceptedAnswerText: item.answer,
        }))}
      />
      <About />
    </>
  );
}
