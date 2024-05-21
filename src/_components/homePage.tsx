import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Authentication, getUsername } from "../../services/firebase";
import Link from "next/link";

const HomePage = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const fetchedUsername = await getUsername(user.uid);
        if (fetchedUsername) {
          setUsername(fetchedUsername);
        } else {
          setUsername("");
        }
      }
    };

    fetchUsername();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await Authentication().signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <div>HOME {username ? `- Welcome, ${username}` : ""}</div>
      <button onClick={handleSignOut}>Sign Out</button> <br />
      <Link href="quiz" passHref>
        <button>Kuis Easy</button>
      </Link>
      <br />
      <Link href="leaderboard" passHref>
        <button>Leaderboard</button>
      </Link>
    </div>
  );
};

export default HomePage;
