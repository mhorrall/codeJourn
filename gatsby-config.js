const config = require("./data/SiteConfig");

module.exports = {
  siteMetadata: {
    title: `CodeJourn`,
    siteUrl: config.siteUrl,
    disqus: config.disqusId,
    rssMetadata: {
      site_url: config.siteUrl,
      feed_url: config.siteUrl + config.siteRss,
      title: config.siteTitle,
      description: config.siteDescription,
      author: config.userName,
      copyright: config.copyright
    }
  },
  plugins: [
    'gatsby-plugin-remove-serviceworker',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`, {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    }, {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    `gatsby-remark-copy-linked-files`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`, {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 1400
      }
    }, {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-responsive-iframe`, {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-"
            }
          }
        ]
      }
    }, {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.googleAnalyticsID
      }
    }, {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor
      }
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-catch-links`, {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icons: [
          {
            src: "/logos/codejournBlackWhite192.png",
            sizes: "129x29",
            type: "image/png"
          }, {
            src: "/logos/codejournBlackWhite512.png",
            sizes: "512x78",
            type: "image/png"
          }
        ]
      }
    }, {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon-16x16.png",
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    }
  ]
};
