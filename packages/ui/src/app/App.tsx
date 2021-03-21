import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Element>
        <Main>
          Hello world
        </Main>
      </Element>
    </>
  );
};

export default App;

const Element = styled.div`
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
  height: 100%;
`;

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
  }
`;
