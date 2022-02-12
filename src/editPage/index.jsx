import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  Editor as ReadOnly,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import { Button } from "../components/button";

import { PageEditor } from "../components/editor";
import { createPost, putPost } from "../services/apiCalls";
import styles from "./editPage.module.css";

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const parseDate = (date) => {
  return months[date.getMonth()];
};

export const EditPage = ({ state, updateState }) => {
  const { postId } = useParams();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const navigate = useNavigate();

  const [currentPost, setCurrentPost] = useState({
    title: "",
    description: "",
    image: "",
    userId: "",
    time: "",
    formData: new FormData(),
  });

  useEffect(() => {
    console.log(state.posts[postId]);
    if (postId) {
      setCurrentPost({ ...currentPost, ...state.posts[postId] });
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(state.posts[postId].body))
        )
      );
      // setEditorState(state.posts[postId].body);
    }
  }, []);

  const onPost = (e) => {
    e.preventDefault();
    if (postId) {
      putPost(state.posts[postId], postId, state.token).then(() => {
        updateState({
          posts: {
            ...state.posts,
            [postId]: {
              ...currentPost,
              body: JSON.stringify(
                convertToRaw(editorState.getCurrentContent())
              ),
            },
          },
        });
        navigate("/");
      });
      return;
    }

    let date = new Date();

    // let formData = currentPost.formData;

    currentPost.formData.set("time", `${date.getDate()} ${parseDate(date)}`);
    // console.log(formData);

    // for (var key of currentPost.formData.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }

    // currentPost.formData.set("userId", state.userId);

    createPost(currentPost.formData, state.token).then((data) => {
      console.log(data);
      updateState({
        posts: {
          ...state.posts,
          [data._id]: { ...data },
        },
      });
      navigate("/");
    });
    // createPost({
    //   ...currentPost,
    //   body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    //   time: `${date.getDate()} ${parseDate(date)}`,
    // }).then((data) => {
    //   console.log(data);
    //   updateState({
    //     posts: {
    //       ...state.posts,
    //       [data._id]: { ...data },
    //     },
    //   });
    //   // navigate("/");
    // });
  };

  const onEditorStateChange = (editor) => {
    console.log(editor);
    setEditorState(editor);
    currentPost.formData.set(
      "body",
      JSON.stringify(convertToRaw(editor.getCurrentContent()))
    );
    setCurrentPost({
      ...currentPost,
    });
  };

  const handleChange = (e, name) => {
    if (name === "image") {
      console.log(e.target.files[0]);
      currentPost.formData.set(name, e.target.files[0]);
      setCurrentPost({
        ...currentPost,
        [name]: e.target.files[0],
      });
    } else {
      currentPost.formData.set(name, e.target.value);

      setCurrentPost({
        ...currentPost,
        [name]: e.target.value,
      });
    }
  };

  return (
    <form>
      <div className={styles.editPageCont}>
        <div className={styles.title}>Title</div>
        <div>
          <input
            // onChange={(e) => {
            //   setCurrentPost({ ...currentPost, title: e.target.value });
            // }}
            onChange={(e) => {
              handleChange(e, "title");
            }}
            className={styles.titleInput}
            placeholder="Enter the title"
            type="text"
            value={currentPost.title}
          />
        </div>
        <div className={styles.description}>Description</div>
        <div>
          <input
            // onChange={(e) => {
            //   setCurrentPost({ ...currentPost, description: e.target.value });
            // }}
            onChange={(e) => {
              handleChange(e, "description");
            }}
            placeholder="Enter the description"
            className={styles.descInput}
            type="text"
            value={currentPost.description}
          />
        </div>
        <div className={styles.headImage}>Head Image</div>
        <div>
          <input
            type="file"
            onChange={(e) => {
              handleChange(e, "image");
            }}
          />
        </div>
        <div className={styles.editBody}>Edit Body</div>
        <div>
          <PageEditor
            onEditorStateChange={onEditorStateChange}
            editorState={editorState}
          />
        </div>
        <div className={styles.postButton}>
          <Button onClick={onPost}>Post</Button>
        </div>
      </div>
    </form>
  );
};
