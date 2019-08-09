import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="post-feed">
        {posts &&
        posts.map(({ node: post }) => (
          <article
            key={post.fields.slug}
            className={`post-card ${
              post.frontmatter.featuredpost ? 'is-featured' : ''
              }`}
          >
            <Link
              className="post-card-image-link"
              to={post.fields.slug}
            >
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${
                    post.title
                    }`,
                }}
              />
            </Link>
            <div className="post-card-content">
              <Link
                className="post-card-content-link"
                to={post.fields.slug}
              >
                <header className="post-card-header">
                  <span className="post-card-tags">Getting Started</span>
                  <h2 className="post-card-title">{post.frontmatter.title}</h2>
                </header>
                <section className="post-card-excerpt">
                  <p>{post.frontmatter.description}</p>
                </section>
              </Link>
              <footer className="post-card-meta">
                <ul className="author-list">
                  <li className="author-list-item">
                    <div className="author-name-tooltip">
                      Ghost
                    </div>
                    <a href="/author/ghost" className="static-avatar ember-view">
                      <img className="author-profile-image" src="/images/ghost-icon.png" alt="Ghost" />
                    </a>
                  </li>
                </ul>
                <span className="reading-time">3 min read</span>
              </footer>
            </div>
          </article>
        ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
