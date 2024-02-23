import type { NextPage } from "next";
import Head from "next/head";

import { Title, TitleLevel } from "@liene-putnina/react-components-for-you";
import type { Option } from "@liene-putnina/react-components-for-you";

import { WithHeader } from "~/components/WithHeader";

import type { GameDetails } from "~/components/GameDetailsForm";
import { useEffect, useState } from "react";

const Game: NextPage = () => {
  const [gameDetails, setGameDetails] = useState<GameDetails>({});

  useEffect(() => {
    const storedGameDuration = sessionStorage.getItem("GameDuration");
    const storedNumberOfOpponents = sessionStorage.getItem("NumberOfOpponents");
    const storedTurnTimeLimit = sessionStorage.getItem("TurnTimeLimit");
    const storedDifficultyLevel = sessionStorage.getItem("DifficultyLevel");

    setGameDetails({
      gameDuration: storedGameDuration
        ? Number(JSON.parse(storedGameDuration))
        : undefined,
      numberOfOpponents: storedNumberOfOpponents
        ? Number(JSON.parse(storedNumberOfOpponents))
        : undefined,
      turnTimeLimit: storedTurnTimeLimit
        ? Number(JSON.parse(storedTurnTimeLimit))
        : undefined,
      selectedOption: storedDifficultyLevel
        ? (JSON.parse(storedDifficultyLevel) as Option)
        : undefined,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Game </title>
      </Head>
      <WithHeader headerTitle="Game">
        <div>
          <Title level={TitleLevel.FOUR}>Info board</Title>
          <div className="info-board">
            <p>Game duration: {gameDetails.gameDuration}</p>
            <p>Number of opponents:{gameDetails.numberOfOpponents}</p>
            <p>Turn time: {gameDetails.turnTimeLimit} minutes</p>
            <p>Difficulty: {gameDetails.selectedOption?.value}</p>
          </div>
        </div>
      </WithHeader>
    </>
  );
};

export default Game;
