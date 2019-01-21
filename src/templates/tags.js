import React from "react"
import Link from "gatsby-link"
import Header from '../components/Header'
import HomeNav from '../components/HomeNav'
import BlogCard from '../components/BlogCard'
import Footer from '../components/Footer'
import TagList from '../components/TagList'
import Layout from "../components/layout"

export default function Tags({pathContext}) {

    const {posts, post, tag} = pathContext
    const sortedTags = Object
        .keys(posts)
        .sort();

    if (tag) {
        return (
            <Layout>
                <div className="home-template">

                    <header
                        className="site-header outer"
                        style={{
                        backgroundImage: 'url(https://casper.ghost.org/v1.0.0/images/blog-cover.jpg)'
                    }}>
                        <div className="inner">
                            <div className="site-header-content">
                                <h1 className="site-title">
                                    {post.length}
                                    post{post.length === 1
                                        ? ""
                                        : "s"}
                                    tagged with{" "}
                                    <span
                                        style={{
                                        fontStyle: 'italic'
                                    }}>{tag}</span>
                                </h1>
                            </div>
                            <HomeNav/>
                        </div>
                    </header>

                    <main id="site-main" className="site-main outer" role="main">

                        <div className="inner">

                            <div className="post-feed">

                                {post.map(post => (<BlogCard
                                    key={post.id}
                                    path={post.frontmatter.path}
                                    image={post.frontmatter.image}
                                    tag={post.frontmatter.tags[0]}
                                    title={post.frontmatter.title}
                                    date
                                    ={post.frontmatter.date}
                                    description={post.frontmatter.description}
                                    authorImage={post.frontmatter.authorImage}
                                    authorName={post.frontmatter.author}/>))}

                            </div>

                        </div>
                    </main>

                    <Footer/>

                </div>
            </Layout>
        )
    }
    return (
        <Layout>
            <div>

                <div className="home-template">

                    <Header
                        image='https://casper.ghost.org/v1.0.0/images/blog-cover.jpg'
                        title="Tags"/>

                    <main id="site-main" className="site-main outer" role="main">

                        <div className="inner">

                            <div className="post-feed">

                                <div className="tag-container">

                                    {sortedTags.map((n, i) => (<TagList tag={n} key={i}/>))}

                                </div>

                            </div>

                        </div>
                    </main>

                    <Footer/>

                </div>

            </div>
        </Layout>
    );
}