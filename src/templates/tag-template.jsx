import React from 'react'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import TagTemplateDetails from '../components/TagTemplateDetails'

function TagTemplate(props) {
	const {title} = props.data.site.siteMetadata
	const {tag} = props.pageContext

	return (
		<Layout>
			<div>
				<Helmet title={`All Posts tagged as "${tag}" - ${title}`} />
				<Sidebar {...props} />
				<TagTemplateDetails {...props} />
			</div>
		</Layout>
	)
}


export default TagTemplate

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          telegram
          twitter
          github
          rss
          vk
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
          layout: { eq: "post" }
          draft: { ne: true }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`
