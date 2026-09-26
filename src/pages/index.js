import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import AnimatedText from "../components/AnimatedText";
import { LinkArrow } from "../components/Icons";
import HireMe from "../components/HireMe";
import TransitionEffect from "../components/TransitionEffect";
import { useEffect, useState } from "react";
import { GetFolioHome } from "../components/Firebase";
import defImage from "../assets/images/profile/developer-pic-1.png";

export default function Home() {
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [highlight, setHighlight] = useState("");
  useEffect(() => {
    const editHome = async () => {
      try {
        const docSnap = await GetFolioHome();
        if (!docSnap || docSnap == undefined) {
          console.log("No data yet");
        } else {
          setEmail(docSnap.data().email);
          setImg(docSnap.data().img);
          setDesc(docSnap.data().desc);
          setResumeUrl(docSnap.data().resumeUrl);
          setHighlight(docSnap.data().highlight);
        }
      } catch (err) {
        console.log(err);
      }
    };
    editHome();
  }, []);

  return (
    <>
      <Head>
        <title>Oldman In the Garden</title>
        <meta
          name="description"
          content="This is dedicated to one stupid old man eddy"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TransitionEffect />
      <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
        <Layout className="pt-0 md:p-16 sm:p-8">
          <div className="flex items-center justify-between w-full lg:flex-col">
            <div className="w-1/2 md:w-full">
              <Image
                src={img || defImage}
                alt="oldman"
                priority
                width={200}
                height={200}
                className="w-full h-auto lg:hidden md:inline-block md:w-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>
            <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">
              <AnimatedText
                className="!text-6xl !text-left xl:!text-5xl lg:!text-6xl md:!text-5xl sm:!text-3xl"
                text={highlight}
              />
              <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
                {desc}
              </p>

              <div className="flex items-center self-start mt-2 lg:self-center">
                <Link
                  href={resumeUrl ? resumeUrl : "/dummy.pdf"}
                  target={"_blank"}
                  rel="noreferrer"
                  download={true}
                  className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light
                md:p-2 md:px-4 md:text-base"
                >
                  Resume <LinkArrow className={"w-6 ml-1"} />
                </Link>
                <Link
                  href={`mailto:${email}}`}
                  target={"_blank"}
                  rel="noreferrer"
                  className="ml-4 text-lg font-medium capitalize md:text-base text-dark dark:text-light underline"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Layout>
        <HireMe email={email} />
      </main>
    </>
  );
}
