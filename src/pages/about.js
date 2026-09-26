import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import AnimatedText from "../components/AnimatedText";
import Layout from "../components/Layout";
import Image from "next/image";
import ProfilePic from "../assets/images/profile/oldman_edited.png";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import TransitionEffect from "../components/TransitionEffect";
import { GetFolioAbout } from "../components/Firebase";

const AnimatedNumbers = ({ value }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  return <span ref={ref}></span>;
};
const About = () => {
  const [bio, setBio] = useState("");
  const [highlight, setHighlight] = useState("");
  const [img, setImg] = useState("");
  const [totalClient, setTotalClient] = useState("");
  const [exp, setExp] = useState("");
  const [totalPrj, setTotalPrj] = useState("");

  useEffect(() => {
    const editAbout = async () => {
      try {
        const docSnap = await GetFolioAbout();
        if (docSnap) {
          setBio(docSnap.data().bio);
          setImg(docSnap.data().img);
          setExp(docSnap.data().exp);
          setTotalClient(docSnap.data().totalClient);
          setTotalPrj(docSnap.data().totalPrj);
          setHighlight(docSnap.data().highlight);
        }
      } catch (err) {
        console.log(err);
      }
    };
    editAbout();
  }, []);

  return (
    <>
      <Head>
        <title>Solomon Olaniran | About Page</title>
        <meta
          name="description"
          content="Learn about my journey as graphics designer"
        />
      </Head>
      <TransitionEffect />
      <main className="flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            className="mb-16 lg:!text-7xl sm:!text-6xl sm:mb-8 xs:!text-4xl"
            text={highlight ? highlight : "Egusi Fuels Pounded Yam!"}
          />
          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:col-span-8 md:order-2">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                Biography
              </h2>
              <p className="font-medium  md:text-lg sm:text-base xs:text-sm">
                {bio}
              </p>
            </div>
            <div className="col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark p-8 bg-light dark:bg-dark dark:border-light xl:col-span-4 md:col-span-8 md:order-1">
              <div className="absolute top-0 -right-3 -z-10 w-[103%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
              <Image
                src={img}
                priority
                alt="solomon"
                loading="lazy"
                className="h-auto w-full rounded-2xl"
                width={100}
                height={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="font-bold inline-block text-7xl md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={totalClient ? totalClient : 10} />+
                </span>
                <h2
                  className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 
                        xl:text-center md:text-lg sm:text-base xs:text-sm"
                >
                  satisfied clients
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="font-bold inline-block text-7xl md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={totalPrj ? totalPrj : 10} />+
                </span>
                <h2
                  className="text-xl font-medium capitalize text-dark/75 dark:text-light/75
                        xl:text-center md:text-lg sm:text-base xs:text-sm"
                >
                  project completed
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="font-bold inline-block text-7xl md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={exp ? exp : 10} />+
                </span>
                <h2
                  className="text-xl font-medium capitalize text-dark/75 dark:text-light/75
                        xl:text-center md:text-lg sm:text-base xs:text-sm"
                >
                  years of experience
                </h2>
              </div>
            </div>
          </div>
          <Skills />
          <Experience />
          <Education />
        </Layout>
      </main>
    </>
  );
};

export default About;
