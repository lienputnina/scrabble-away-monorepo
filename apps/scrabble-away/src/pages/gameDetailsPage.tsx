import { type NextPage } from "next";
import Head from "next/head";

import { WithHeader } from "~/components/WithHeader";
import { GameDetailsForm } from "~/components/GameDetailsForm";

const GameDetailsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Game details</title>
      </Head>
      <WithHeader headerTitle="Game details form">
        <div>
          <GameDetailsForm />
        </div>
      </WithHeader>
    </>
  );
};

export default GameDetailsPage;
