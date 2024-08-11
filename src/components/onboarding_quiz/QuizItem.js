/* eslint-disable react/prop-types */
import React, { useState } from "react";

/**
 * Renders a quiz item component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.question - The question to be displayed.
 * @param {string} props.isFinalQuestion - A flag to indicate if the question is the final question.
 * @param {function} props.onNextQuestion - The callback function to be called when the next question button is clicked.
 * @param {Array<string>} props.choices - The array of choices for the question.
 * @param {boolean} props.isCustomChoice - A flag to indicate if the question is a custom text input instead of a discrete set of choices.
 * @returns {JSX.Element} The rendered quiz item component.
 */
function QuizItem({
  question,
  isFinalQuestion,
  onNextQuestion,
  choices,
  isCustomChoice,
}) {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [customChoice, setCustomChoice] = useState("");

  const INPUT_TYPES = {
    TEXT: "text",
    RADIO: "radio",
  };

  const handleChange = (inputType) => (event) => {
    switch (inputType) {
      case INPUT_TYPES.TEXT:
        return setCustomChoice(event.target.value);
      case INPUT_TYPES.RADIO:
        return setSelectedChoice(event.target.value);
    }
  };

  // Use the question as part of the name attribute to ensure uniqueness
  const uniqueName = `onboarding_quiz_${question.replace(/\s+/g, "_")}`;

  return (
    <div
      style={{
        marginBottom: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <fieldset>
        <legend>
          <i>{question}</i>
        </legend>
        {isCustomChoice ? (
          <div>
            <input
              type={"text"}
              id={`${uniqueName}_custom`}
              name={uniqueName}
              onChange={handleChange(INPUT_TYPES.TEXT)}
              value={customChoice}
            />
          </div>
        ) : (
          choices.map((choice, index) => (
            <div
              key={index}
              style={{
                display: "block",
                margin: "5px",
              }}
            >
              <input
                type="radio"
                id={`${uniqueName}_${choice}`}
                name={uniqueName}
                value={choice}
                key={index}
                onChange={handleChange(INPUT_TYPES.RADIO)}
                checked={selectedChoice === choice}
              />
              <label
                key={index * 10}
                htmlFor={`${uniqueName}_${choice}`}
                style={{
                  paddingLeft: "4px",
                  paddingRight: "8px",
                }}
              >
                {choice}
              </label>
            </div>
          ))
        )}
      </fieldset>
      <button
        style={{
          backgroundColor: "rgb(0, 123, 255)",
          color: "white",
          padding: "4px 8px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "5px",
          fontWeight: "bold",
          display: "block",
          justifyContent: "center",
          margin: "0 auto",
        }}
        disabled={selectedChoice === null || customChoice === ""}
        onClick={(event) => {
          event.stopPropagation();

          if (isCustomChoice) {
            if (customChoice !== "") {
              onNextQuestion(customChoice);
              setCustomChoice("");
            } else {
              if (selectedChoice !== null) {
                onNextQuestion(selectedChoice);
                setSelectedChoice(null);
              }
            }
          }
        }}
      >
        Next Question
      </button>
    </div>
  );
}

export default QuizItem;
