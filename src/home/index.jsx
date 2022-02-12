import React, { useEffect, useState } from "react";

import styles from "./home.module.css";

import { ReactComponent as Logo } from "../asset/logo.svg";
import { Button } from "../components/button";
import { Post } from "../components/post";
import { getPosts } from "../services/apiCalls";
import { Modal } from "../components/modal";
import { SignIn, SignUp } from "../auth";
import { useNavigate } from "react-router-dom";

export const Home = ({ state, updateState }) => {
  const [posts, setPosts] = useState([]);

  const [isSignIn, setSignIn] = useState(false);
  const [isSignUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then((data) => {
      console.log(data);
      setPosts(data);
      let postObj = {};
      data.map((value) => {
        postObj[value._id] = value;
      });
      updateState({ posts: postObj });
    });
  }, []);

  const onStartWriting = () => {
    if (!state.authenticated) {
      setSignIn(true);
      return;
    }
    navigate("/post/create");
  };

  return (
    <>
      <div>
        <TopNav
          onSignIn={() => {
            setSignIn(true);
          }}
          onSignUp={() => {
            setSignUp(true);
          }}
          state={state}
        />
        <div className={styles.homeBody}>
          <div>
            <div className={styles.homeText}>
              Medium is a place to write, read, and connect
            </div>
            <div className={styles.subText}>
              It's easy and free to post your thinking on any topic and connect
              with millions of readers.
            </div>
            <div className={styles.buttonCont}>
              <Button
                onClick={onStartWriting}
                style={{
                  backgroundColor: "#fff",
                  color: "#000000",
                  border: "1px solid black",
                }}
              >
                Start Writing
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.homePostBody}>
          {posts.map((post) => {
            return (
              <>
                <Post
                  onClick={() => {
                    navigate(`/post/${post._id}`);
                  }}
                  key={post._id}
                  post={post}
                />
                <div
                  onClick={() => {
                    navigate(`/${post._id}/edit`);
                  }}
                  className={styles.edit}
                >
                  Edit
                </div>
              </>
            );
          })}
        </div>
      </div>
      {isSignIn && (
        <Modal
          onClose={() => {
            setSignIn(false);
          }}
        >
          <SignIn
            state={(state, updateState)}
            updateState={(state, updateState)}
          />
        </Modal>
      )}
      {isSignUp && (
        <Modal
          onClose={() => {
            setSignUp(false);
          }}
        >
          <SignUp />
        </Modal>
      )}
    </>
  );
};

const TopNav = ({ state, onSignIn, onSignUp }) => {
  return (
    <div className={styles.topNav}>
      <div className={styles.logoHead}>
        <Logo className={styles.logo} />
      </div>
      {!state.authenticated && (
        <div className={styles.navOption}>
          <div>
            <Button onClick={onSignIn} buttonType={"PLAIN"}>
              Sign In
            </Button>
          </div>
          <div>
            <Button onClick={onSignUp}>Get Started</Button>
          </div>
        </div>
      )}
    </div>
  );
};
