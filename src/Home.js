import React, { useEffect, useMemo, useState, useCallback } from "react";
import Chart from "./Chart";
import { fetchBook } from "./utils";
import useFetch from "./useFetch";
import useLocalStorage from "./useLocalStorage";

export default function Home() {
  const [books, setBooks] = React.useState(getInitialBooks());

  const [loading, setLoading] = React.useState(() => {
    console.log("loading init");
    return true;
  });
  const [id, setId] = React.useState("9781451648546");
  const [digit, setDigit] = React.useState(0);

  const [themeColor, setThemeColor] = useState("red");

  const [name, setName] = useState("Default");
  const [duplicate, setDuplicate] = useState(0);

  // const numb = slowFunction(digit);

  const numbMemoized = useMemo(() => {
    return slowFunction(digit);
  }, [digit]);

  const numbCb = useCallback(
    (number) => {
      return number * slowFunction(digit);
    },
    [digit]
  );

  // const theme = { color: themeColor };

  const theme = useMemo(() => {
    return { color: themeColor };
  }, [themeColor]);

  useEffect(() => {
    console.log("theme changed");
  }, [theme]);

  useEffect(() => {
    setDuplicate(numbCb(2));
  }, [numbCb]);

  function getInitialBooks() {
    console.log("get init books");
    return [];
  }

  function slowFunction(number) {
    for (var i = 0; i < 1000000000; i++) {}

    console.log("slow function");

    return 2 * number;
  }

  const inputElement = React.useRef();

  const focusInput = () => {
    inputElement.current.focus();
  };

  const updateName = () => {
    setName("Rand" + Math.floor(Math.random() * 10));
  };

  const updateNumber = () => {
    setDigit((prevDigit) => prevDigit + 1);
  };

  React.useEffect(() => {
    console.count("In useEffect, after render");

    fetchBook(id).then((books) => {
      setBooks(books);
      setLoading((prevLoading) => !prevLoading);
    });

    return () => {
      setLoading(true);
      console.log("useEffect Clean Up Triggered");
    };
  }, [id]);

  console.count("Rendering");

  if (loading === true) {
    return "...Loading...";
  }

  return (
    <>
      <h1>
        Theme : {theme.color} {name}
      </h1>
      <h2>Number : {numbMemoized}</h2>
      <h2> Number CB : {duplicate}</h2>
      <button
        onClick={() => {
          setId("9781491924464");
          setThemeColor("black");
        }}
      >
        Set ISBN : 9781491924464 YDKJS
      </button>
      <button
        onClick={() => {
          setId("9781451648546");
          setThemeColor("white");
        }}
      >
        Set ISBN : 9781451648546 Steve Jobs
      </button>
      <input type="text" ref={inputElement} />
      <button onClick={focusInput}>Focus Input</button>
      <div></div>
      <button onClick={updateName}>Set Name</button>
      <button onClick={updateNumber}>Double Number</button>

      <ul>
        {books.items.map(({ volumeInfo }, index) => (
          <li key={index}>
            <span>Book Title{volumeInfo.title}</span>
          </li>
        ))}
      </ul>
      <Chart />
    </>
  );
}
