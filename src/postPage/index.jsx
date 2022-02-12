import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PageEditor } from "../components/editor";
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  Editor as ReadOnly,
} from "draft-js";

import styles from "./postPage.module.css";

export const PostPage = ({ state, updateState }) => {
  const { postId } = useParams();

  const [editorState] = useState(EditorState.createEmpty());

  let post = state.posts[postId];

  var arrayBufferView = new Uint8Array(post.image.data.data);
  var blob = new Blob([arrayBufferView], { type: "image/jpeg" });

  let img = URL.createObjectURL(blob);

  console.log(
    EditorState.createWithContent(convertFromRaw(JSON.parse(post.body)))
  );

  post = post
    ? {
        ...post,
        body: EditorState.createWithContent(
          convertFromRaw(JSON.parse(post.body))
        ),
      }
    : { body: EditorState.createEmpty() };

  return (
    <div className={styles.postPage}>
      <div className={styles.leftSpace}>
        <div></div>
      </div>
      <div className={styles.body}>
        <div className={styles.userDetails}>
          <div className={styles.userName}>{post.name}</div>
          <div className={styles.time}>{post.time}</div>
        </div>
        <div className={styles.postMainDetails}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.subtitle}>{post.description}</div>
          <div className={styles.headImg}>
            <div className={styles.imgCont}>
              <img src={img} alt="" className={styles.img} />
            </div>
          </div>
          <PageEditor editorState={post.body} readOnly={true} />
        </div>{" "}
      </div>
      <div className={styles.rightSpace}>
        <div></div>
      </div>

      {/* <div>
          <input type="text" />
      </div> */}
    </div>
  );
};
