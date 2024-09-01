"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

// Define the type for messageRefs
type MessageRefs = (HTMLHeadingElement | null)[];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const messageRefs = useRef<MessageRefs>([]);
  const router = useRouter();

  useEffect(() => {
    if (document.readyState === "complete") {
      setIsLoaded(true);
    } else {
      const handleLoad = () => {
        setIsLoaded(true);
      };

      window.addEventListener("load", handleLoad);

      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (buttonRef.current) {
        gsap.to(buttonRef.current, { opacity: 1, duration: 1 });
      }
    }
  }, [isLoaded]);

  useEffect(() => {
    if (showMessage) {
      gsap.fromTo(
        messageRefs.current[0],
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0 }
      );
      gsap.fromTo(
        messageRefs.current[1],
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1 }
      );
      gsap.fromTo(
        messageRefs.current[2],
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2 }
      );
      gsap.fromTo(
        messageRefs.current[3],
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 3 }
      );

      setTimeout(() => {
        router.push("/home"); 
      }, 5000);
    }
  }, [showMessage, router]);

  const handleStartClick = () => {
    setShowMessage(true);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] flex-col gap-2 relative">
      {!showMessage ? (
        <>
          <h1 className="text-2xl">Bible Story: Journey of Faith</h1>
          <p className="text-center px-2">this project is a summary of important events in the bible</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          {isLoaded && (
            <button
              ref={buttonRef}
              className="absolute outline-none btn "
              style={{ opacity: 0 }}
              onClick={handleStartClick}
            >
              Start
            </button>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col justify-center items-center ">
          <div className="flex sm:flex-row flex-col">
            <h1
              className="text-4xl font-bold"
              ref={(el) => {
                messageRefs.current[0] = el;
              }}
            >
              I am the truth,&nbsp;
            </h1>
            <h1
              className="text-4xl font-bold"
              ref={(el) => {
                messageRefs.current[1] = el;
              }}
            >
              the way,&nbsp;
            </h1>
            <h1
              className="text-4xl font-bold"
              ref={(el) => {
                messageRefs.current[2] = el;
              }}
            >
              and the life.
            </h1>
          </div><br />
          <p
            ref={(el) => {
              messageRefs.current[3] = el;
            }}
            className="italic text"
          >
            John 14:6
          </p>
        </div>
      )}
    </div>
  );
}
