import React, { useState } from "react";
import Cookies from "universal-cookie";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import { PageEditor } from "../components/editor";
import { Home } from "../home";
import { EditPage } from "../editPage";
import { PostPage } from "../postPage";
import { Route, Routes } from "react-router-dom";

export const Main = () => {
  const cookies = new Cookies();

  const [state, setState] = useState({
    authenticated: !!cookies.get("token"),
    token: cookies.get("token"),
  });

  const updateState = (updatedState) => {
    setState({
      ...state,
      ...updatedState,
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home state={state} updateState={updateState} />}
      />
      <Route
        path="/post/:postId"
        element={<PostPage state={state} updateState={updateState} />}
      />
      <Route
        path=":postId/edit"
        element={<EditPage state={state} updateState={updateState} />}
      />
      <Route
        path="/post/create"
        element={<EditPage state={state} updateState={updateState} />}
      />

      {/* <PageEditor readOnly={false} /> */}
      {/* <EditPage /> */}
      {/* <PostPage /> */}
    </Routes>
  );
};
