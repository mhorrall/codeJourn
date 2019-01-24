import React from 'react'
import {StaticQuery, graphql} from 'gatsby'
// import link from 'gatsby-link'
import Img from 'gatsby-image'
import HomeNav from './HomeNav'

const Header = ({image, title, tagline}) => (
    <StaticQuery
        query={query}
        render={data => (
        <header
            className="site-header outer"
            style={{
            backgroundImage: 'url(' + image + ')'
        }}>
            <div className="inner">
                <div className="site-header-content">
                <Img className="header-logo" fluid={data.logo.childImageSharp.fluid}/>
                    <h1 className="site-title">
                    </h1>
                    <h2 className="site-description">
                        {tagline}
                    </h2>
                </div>
                <HomeNav/>
            </div>
        </header>
    )}/>
)

const query = graphql `
  query {
    logo: file(relativePath: { eq: "codejournTrans.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Header;