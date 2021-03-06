import React from 'react'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import PostTemplateDetails from '../components/PostTemplateDetails'

function PostTemplate(props) {
	const {title, subtitle} = props.data.site.siteMetadata
	const post = props.data.markdownRemark
	const {title: postTitle, description: postDescription} = post.frontmatter
	const description = postDescription || subtitle

	return (
		<Layout>
			<div>
				<Helmet>
					<title>{`${postTitle} - ${title}`}</title>
					<meta name="description" content={description} />
				</Helmet>
				<PostTemplateDetails {...props} />
			</div>
		</Layout>
	)
}


export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        author {
          name
        }
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
        slug
      }
      frontmatter {
        title
        tags
        date
        description
      }
    }
  }
`
