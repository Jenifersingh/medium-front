import React from "react";

import styles from "./post.module.css";

export const Post = ({ post, ...props }) => {
  if (post?.image?.data?.data) {
    var arrayBufferView = new Uint8Array(post.image.data.data);
    var blob = new Blob([arrayBufferView], { type: "image/jpeg" });

    var img = URL.createObjectURL(blob);
  } else {
    var img = "";
  }

  return (
    <div className={styles.post} {...props}>
      <div className={styles.contentCont}>
        <div className={styles.userName}>{post.userId}</div>
        <div className={styles.postTitle}>{post.title}</div>
        <div className={styles.postDesc}>{post.description}</div>
        <div className={styles.time}>{post.time}</div>
      </div>
      <div className={styles.imageCont}>
        <img className={styles.img} src={img} alt="" />
      </div>
    </div>
  );
};
