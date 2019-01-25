import React from "react";
import Helmet from "react-helmet";
import Navbar from "../components/Navbar";
import Tag from "../components/Tag";
import AuthorCard from "../components/AuthorCard";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import BgImage from "./../components/BgImage";

const Template = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <div>
        <Navbar />
        <Helmet title={`Blog | ${post.frontmatter.title}`} />
        {/* <div
          className="blog-post-header"
          style={{
            backgroundImage: `url(${post.frontmatter.image.childImageSharp.fluid
              .srcSet})`
          }}
        > */}
        <div className="blog-post-header" style={{ position: `relative` }}>
          <Img
            fluid={post.frontmatter.image.childImageSharp.fluid}
            css={{ top: 0, left: 0, right: 0, bottom: 0 }}
            style={{
              position: `absolute`,
              zIndex: -1
            }}
          />
          {post.frontmatter.tags.map((n, i) => {
            return <Tag key={i} tag={n} />;
          })}
        </div>
        <main id="site-main" className="site-main outer bg-white" role="main">
          <div className="inner">
            <article className="post-full">
              <div className="blog-content">
                <h1 className="post-full-title">{post.frontmatter.title}</h1>
                <div className="date-meta">
                  <p>{post.frontmatter.date}</p>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.html
                  }}
                />
                <hr />
                <AuthorCard
                  image={post.frontmatter.authorImage}
                  name={post.frontmatter.author}
                  twitter={post.frontmatter.authorTwitter}
                />
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </Layout>
  );
};

export default Template;

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        author
        authorImage
        authorTwitter
        date(formatString: "MMMM DD, YYYY")
        image {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        path
        tags
        title
      }
    }
  }
`;
