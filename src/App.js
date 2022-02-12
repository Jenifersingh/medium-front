import logo from "./logo.svg";
import "./App.css";
import { Main } from "./main";
import { PostPage } from "./postPage";
import { PageEditor } from "./components/editor";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Main />
      {/* <PostPage /> */}
      {/* <PageEditor /> */}
    </BrowserRouter>
  );
}

export default App;
