import React from 'react'
import Link from 'gatsby-link'
import githubLogo from '../img/github-icon-white.svg'
import youtubeLogo from '../img/youtube-logo.svg'
import twitterLogo from '../img/twitter-icon.svg'

const HomeNav = ({isHome}) => <nav className="site-nav">
    <div className="site-nav-left">
        <ul className="nav" role="menu">
            <li role="menuitem">
                <Link to="/">
                    Home
                </Link>
            </li>
            <li role="menuitem">
                <Link to="/about">
                    About
                </Link>
            </li>
            <li role="menuitem">
                <Link to="/tags">
                    Tags
                </Link>
            </li>
        </ul>
    </div>
    <div className="site-nav-right">
        <a className="social-logo" href="https://twitter.com/MattHorrall">
            <img src={twitterLogo} alt="twitter logo"/>
        </a>
        <a className="social-logo" href="https://github.com/mhorrall">
            <img src={githubLogo} alt="github logo"/>
        </a>
    </div>
</nav>

export default HomeNav