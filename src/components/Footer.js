import React from 'react'
import Link from 'gatsby-link'
import githubLogo from '../img/github-icon-white.svg'
import youtubeLogo from '../img/youtube-logo.svg'
import twitterLogo from '../img/twitter-icon.svg'

const Footer = () =>
    <footer className="site-footer outer">
        <div className="site-footer-content inner">
            <section className="copyright">
                <Link to="/">CodeJourn</Link> &copy; { (new Date()).getFullYear() }
            </section>
            <nav>
                <a className="social-logo" href="https://twitter.com/MattHorrall" >
                    <img src={ twitterLogo } alt="twitter logo" />
                </a>
                <a className="social-logo" href="https://github.com/mhorrall" >
                    <img src={ githubLogo } alt="github logo" />
                </a>
            </nav>
        </div>
    </footer>

export default Footer;

