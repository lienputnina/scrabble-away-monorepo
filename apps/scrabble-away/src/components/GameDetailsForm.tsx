import { useState, type FC, useEffect } from "react";
import { useRouter } from "next/router";

import {
  Button,
  ButtonVariant,
  Dropdown,
  NumberInput,
  Title,
  TitleLevel,
} from "@liene-putnina/react-components-for-you";
import type { Option } from "@liene-putnina/react-components-for-you";
import colors from "@liene-putnina/react-components-for-you/dist/styles/scss/colors.module.scss";

import { z } from "zod";

export interface GameDetails {
  gameDuration?: number;
  numberOfOpponents?: number;
  turnTimeLimit?: number;
  options?: Option[];
  selectedOption?: Option;
}

const SelectedOptionType = z
  .object({
    id: z.string(),
    value: z.string(),
  })
  .optional()
  .refine((value) => value !== undefined, {
    message: "Please, choose the game difficulty level",
    path: ["selectedOption"],
  });

const gameDetailsFormSchema = z.object({
  gameDuration: z
    .number()
    .min(40, { message: "Minimum game duration time is 40 minutes" }),
  numberOfOpponents: z
    .number()
    .min(1, { message: "You must have at least 1 opponent" })
    .max(1, { message: "Number of opponents cannot be greater than 1" }),
  turnTimeLimit: z
    .number()
    .min(1, { message: "Turn-time limit must be at least 1 minute" })
    .max(5, { message: "Turn-time limit cannot exceed 5 minutes" }),
  selectedOption: SelectedOptionType,
});

export const GameDetailsForm: FC<GameDetails> = () => {
  const DropdownOptions: Option[] = [
    { id: "level-easy", value: "Easy" },
    { id: "level-medium", value: "Medium" },
    { id: "level-hard", value: "Hard" },
  ];

  const router = useRouter();

  const [gameDuration, setGameDuration] = useState(0);
  const [numberOfOpponents, setNumberOfOpponents] = useState(0);
  const [turnTimeLimit, setTurnTimeLimit] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option>();
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {} as Record<string, string>
  );

  useEffect(() => {
    sessionStorage.setItem("GameDuration", JSON.stringify(gameDuration));
    sessionStorage.setItem(
      "NumberOfOpponents",
      JSON.stringify(numberOfOpponents)
    );
    sessionStorage.setItem("TurnTimeLimit", JSON.stringify(turnTimeLimit));
    sessionStorage.setItem("DifficultyLevel", JSON.stringify(selectedOption));
  }, [gameDuration, numberOfOpponents, turnTimeLimit, selectedOption]);

  const handleSubmit = async () => {
    const formValues = {
      gameDuration,
      numberOfOpponents,
      turnTimeLimit,
      selectedOption,
    };

    try {
      gameDetailsFormSchema.parse(formValues);
      await router.push("/game");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages: Record<string, string> = {};
        error.errors.forEach((err) => {
          messages[err.path[0]!] = err.message;
        });
        setErrorMessages(messages);
      } else {
        console.error("Non-Zod Error during form submission:", error);
      }
    }
  };

  const handleButtonClick = () => {
    void handleSubmit();
  };

  const clearForm = () => {
    setGameDuration(0);
    setNumberOfOpponents(0);
    setTurnTimeLimit(0);
    setSelectedOption(undefined);
  };

  return (
    <div className="mt-7">
      <Title
        level={TitleLevel.TWO}
        style={{ fontSize: "34px", lineHeight: "34px" }}
      >
        Provide the game details
      </Title>
      <form className="w-full">
        <NumberInput
          id="game-duration-id"
          label="Game duration (in minutes)"
          name="game-duration"
          value={gameDuration}
          min={40}
          max={90}
          onChange={(newValue) => {
            setGameDuration(newValue);
          }}
        />
        {errorMessages["gameDuration"] && (
          <div
            key={`error-gameDuration`}
            className="text-sm "
            style={{ color: colors.danger }}
          >
            {errorMessages["gameDuration"]}
          </div>
        )}
        <NumberInput
          id="number-opponents-id"
          label="Number of opponents"
          name="number of opponents"
          value={numberOfOpponents}
          min={1}
          max={1}
          onChange={(newValue) => {
            setNumberOfOpponents(newValue);
          }}
        />
        {errorMessages["numberOfOpponents"] && (
          <div
            key={`error-numberOfOpponents`}
            className="text-sm"
            style={{ color: colors.danger }}
          >
            {errorMessages["numberOfOpponents"]}
          </div>
        )}
        <NumberInput
          id="turn-time-limit-id"
          name="turn time limit"
          label="Turn-time limit (in minutes)"
          value={turnTimeLimit}
          min={1}
          max={5}
          onChange={(newValue) => setTurnTimeLimit(newValue)}
        />
        {errorMessages["turnTimeLimit"] && (
          <div
            key={`error-turnTimeLimit`}
            className="text-sm"
            style={{ color: colors.danger }}
          >
            {errorMessages["turnTimeLimit"]}
          </div>
        )}

        <Dropdown
          id="difficulty-dropdown-id"
          label="Difficulty level"
          placeholderText="Choose difficulty level"
          options={DropdownOptions}
          selectedOptionId={selectedOption?.id}
          onChange={(id) =>
            setSelectedOption(
              DropdownOptions.find((option) => option.id === id)
            )
          }
        />
        {errorMessages["selectedOption"] && (
          <div
            key={`error-selectedOption`}
            className="text-sm"
            style={{ color: colors.danger }}
          >
            {errorMessages["selectedOption"]}
          </div>
        )}

        <div className="flex justify-start">
          <Button variant={ButtonVariant.PRIMARY} onClick={handleButtonClick}>
            Submit
          </Button>
          <Button variant={ButtonVariant.SECONDARY} onClick={clearForm}>
            Clear form
          </Button>
        </div>
      </form>
    </div>
  );
};
