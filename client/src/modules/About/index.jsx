import React from "react";
import Layout from "./../../layout/index";
import styles from "./index.module.css";

const About = () => {
  return (
    <Layout name="About Us">
      <div className={styles.container}>
        <h1>About the application</h1>
        <div className={styles.imgCont}></div>
        <div className={styles.aboutText}>
          <div>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
              quod.
            </h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
              accusantium, minus aliquam nihil hic quod consectetur voluptate
              pariatur ducimus quibusdam magni fugiat doloribus illum quam aut
              voluptatibus, possimus ipsa molestias dignissimos odio
              consequuntur! Consequuntur quaerat maxime molestias itaque, amet
              error quia iure voluptatum voluptatem ullam! Reprehenderit
              veritatis facilis voluptatem fugiat!
            </p>
          </div>
          <div>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
              quod.
            </h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
              accusantium, minus aliquam nihil hic quod consectetur voluptate
              pariatur ducimus quibusdam magni fugiat doloribus illum quam aut
              voluptatibus, possimus ipsa molestias dignissimos odio
              consequuntur! Consequuntur quaerat maxime molestias itaque, amet
              error quia iure voluptatum voluptatem ullam! Reprehenderit
              veritatis facilis voluptatem fugiat!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
