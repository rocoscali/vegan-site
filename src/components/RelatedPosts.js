import React from "react"
import StyledLink from "./StyledLink"

const RelatedPosts = ({ relatedPosts }) => {
  return (
    <div>
      <h4>Related:</h4>
      {relatedPosts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <React.Fragment key={node.fields.slug}>
            <StyledLink to={node.fields.slug}>{title}</StyledLink>
            <hr />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default RelatedPosts
