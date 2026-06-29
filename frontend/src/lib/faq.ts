export const siteUrl = "https://clipboard.ninja";

// Single source of truth for both the visible FAQ (About page) and the FAQ JSON-LD.
export const faqItems = [
  {
    question: "How do I share text between devices?",
    answer:
      "Open clipboard.ninja on both devices, enter the 6-digit Device ID shown on one " +
      "device into the other and press Connect. Then type or paste your text and press " +
      "Send, and it appears on the connected device instantly.",
  },
  {
    question: "Is my data stored on the server?",
    answer:
      "No. Text is relayed in real time and is never stored or visible on the server. " +
      "If you are not connected at the moment text is sent, it cannot be retrieved afterwards.",
  },
  {
    question: "Is the connection secure?",
    answer:
      "Yes. The site runs over HTTPS, so traffic between your devices and the server is " +
      "encrypted, and devices must be actively connected for any data to transfer.",
  },
  {
    question: "Do I need to install an app or create an account?",
    answer:
      "No sign-up is required and it works in any modern browser. There is also an optional " +
      "Android app. Just open clipboard.ninja on both devices and pair them with the Device ID.",
  },
  {
    question: "Can I connect more than two devices?",
    answer:
      "Yes. Multiple devices can join the same Device ID, and the text you send is delivered " +
      "to all connected devices at once.",
  },
];
