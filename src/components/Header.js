import React from 'react'
import {StaticQuery, graphql} from 'gatsby'
// import link from 'gatsby-link'
import Img from 'gatsby-image'
import HomeNav from './HomeNav'


const Header = ({title, tagline}) => (
    <StaticQuery
        query={query}
        render={data => (
            <header className="site-header outer">
                <Img
                    fluid={data.header.childImageSharp.fluid}
                    css={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    style={{
                    position: `absolute`,
                    zIndex: 0
                    }}
                />
  

                <div className="inner">
                    <div className="site-header-content">
                    <Img className="header-logo" fluid={data.logo.childImageSharp.fluid}/>
                        {/* <h1 className="site-title">
                        </h1>
                        <h2 className="site-description">
                            {tagline}
                        </h2> */}
                    </div>
                    <HomeNav/>
                </div>
            </ header>
        )
        
    }/>
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
    header: file(relativePath: { eq: "blogheader1.png" }) {
        childImageSharp {
            fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
            }
        }
    }
  }
`;

export default Header;