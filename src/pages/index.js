import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import StyledLink from "../components/StyledLink"
import { graphql } from "gatsby"

const MainHeader = styled.h1`
  width: 100%;
  text-align: center;
  margin: ${rhythm(2)};
  color: ${props => props.color};
`

const index = ({ data, location }) => {
  return (
    <Layout full location={location}>
      <SEO title="All posts" />
      <MainHeader className="index__mainHeader">
        {data.site.siteMetadata.title}
      </MainHeader>
      <StyledLink className="index__linkToBlog" to="/blog">
        Blog
      </StyledLink>
    </Layout>
  )
}

export default index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            featuredImage {
              src {
                name
              }
            }
          }
        }
      }
    }
  }
`
