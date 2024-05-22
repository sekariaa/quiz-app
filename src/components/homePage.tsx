import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Authentication, getUsername } from "../../services/firebase";
import Link from "next/link";
import Image from "next/image";
import heroImage from "../../public/hero-image.png";
import puzzleImage from "../../public/puzzle-image.png";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import Typed from "typed.js";

const HomePage = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
        } else {
          const fetchedUsername = await getUsername(user.uid);
          if (fetchedUsername) {
            setUsername(fetchedUsername);
            localStorage.setItem("username", fetchedUsername);
          } else {
            setUsername("");
          }
        }
      }
    };

    fetchUsername();
  }, [user]);

  useEffect(() => {
    const typed = new Typed("#typed-username", {
      strings: [username ? username : ""],
      typeSpeed: 60,
      backSpeed: 60,
      backDelay: 500,
      startDelay: 500,
      showCursor: true,
      smartBackspace: true,
      loop: true,
    });
    return () => {
      typed.destroy();
    };
  }, [username]);

  const handleSignOut = async () => {
    try {
      await Authentication().signOut();
      localStorage.removeItem("username");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="bg-secondary min-h-screen">
      <nav className="flex justify-between items-cente py-2 px-3 max-w-[1640px] mx-auto ">
        <div className="text-lg">
          <span className="font-bold text-primary"> QUIZ</span>
          <span className="text-primary">APP</span>
        </div>
        <button
          onClick={handleSignOut}
          className="outline outline-1 rounded-full py-1 px-2 text-primary mx-3 hover:bg-primary hover:text-white outline-primary"
        >
          Sign Out
        </button>
      </nav>
      <div className="max-w-[1640px] mx-auto mt-2 flex justify-between items-center px-3 ">
        <div className=" w-1/2 space-y-3 ">
          <div>
            <p className="text-primary text-base">
              Welcome,
              <span className="font-bold" id="typed-username"></span>
            </p>
            <p className="font-bold text-5xl text-primary">Improve Your Mind</p>
          </div>
          <div className=" text-primary w-fit md:w-1/2 flex-col">
            <p className="text-justify text-base">
              Compete globally and aim to be one of the top 5 contenders. Are
              you ready to prove your skills?
            </p>
          </div>
          <div>
            <Link href="leaderboard" passHref>
              <button className="outline outline-1 rounded-full py-1 px-2 text-primary hover:bg-primary hover:text-white outline-primary">
                Leaderboard
              </button>
            </Link>
          </div>
        </div>
        <div className=" w-1/2 md:flex justify-center ">
          <Image
            src={heroImage}
            width={200}
            height={200}
            alt="Picture of quiz app"
          />
        </div>
      </div>
      <div className="max-w-[1640px] mx-auto flex justify-between items-center px-3 p-3 ">
        <div className="bg-light rounded-3xl p-5 flex-col mx-auto space-y-3">
          <p className="text-center font-bold text-primary">
            GENERAL KNOWLEDGE
          </p>
          <div className="flex items-center justify-center">
            <Image
              src={puzzleImage}
              width={70}
              height={70}
              alt="Picture of quiz app"
            />
          </div>
          <div className="flex items-center justify-center">
            <Link href="quiz" passHref>
              <div className="flex justify-between space-x-2 outline outline-1 rounded-full py-1 px-2 text-primary hover:font-bold">
                <button>Start Quiz</button>
                <OpenInNewOutlinedIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
