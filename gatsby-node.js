const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post-template.js`)

  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
                author
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges

  posts.forEach(post => {
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        tags: post.node.frontmatter.tags,
        author: post.node.frontmatter.author,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx` || node.sourceInstanceName === "pages") {
    const fileNode = getNode(node.parent)
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value:
        node.internal.type === `Mdx`
          ? `/${fileNode.sourceInstanceName}${value}`
          : value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      updatedDate: Date! @dateformat(formatString: "DD-MM-YYYY")
    }
  `
  createTypes(typeDefs)
}
