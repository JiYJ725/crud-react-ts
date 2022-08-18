import React, {Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


import {ThemeProvider} from "styled-components";
import BackGround from "./style/background";
import {useDarkMode} from "./hooks/useDarkMode";
import {dark, light, fontSizes, fontWeights} from "./style/theme";
import Header from "./components/Header";
import {Text} from "./style/Text";
import {useSelector} from "react-redux";
import {ReducerType} from "./store";
import Nope from "./Nope";

const TodoPage = React.lazy(() => import("./views/TodoPage"));
const CounterPage = React.lazy(() => import("./views/CounterPage"));


function App() {
  const [themeMode, toggleTheme] = useDarkMode();
  const isAuth = useSelector((state: ReducerType) => state.auth.isAuthenticated);

  const theme =
    themeMode === "light"
      ? {mode: light, fontSizes, fontWeights}
      : {mode: dark, fontSizes, fontWeights};


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <BackGround>
          <Header themeMode={themeMode} toggleTheme={toggleTheme}></Header>
          {!isAuth && <div style={{textAlign: "center", margin: "2rem"}}>
            <Text>DEMO Version <br></br><br></br>
              - 바로 로그인 버튼을 누르거나 <br></br><br></br>
              - 아무 이메일과 비번을 입력해 로그인 해보세요!
            </Text>
          </div>}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/crud-react-ts" element={<TodoPage/>}/>
              <Route path="/crud-react-ts/counter" element={<CounterPage/>}/>
              <Route path="/crud-react-ts/Nope" element={<Nope/>}/>
            </Routes>
          </Suspense>
        </BackGround>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
