module.exports = {
  siteMetadata: {
    title: 'codeJourn',
    author: 'mhorrall',
    authorLink: 'https://github.com/mhorrall',
    disqus: 'codejourn' // put your disqus ID here
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/examples`,
        name: 'examples'
      }
    }, {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-prismjs', 'gatsby-remark-copy-linked-files']
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet', {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [
          `${__dirname}/node_modules`, `${__dirname}/src/`
        ],
        precision: 8
      }
    }
  ]
}
