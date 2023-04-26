import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import * as styles from "../styles/project-details.module.css"

const ProjectDetails = ({ data }) => {
  console.log(data)
  const { title, stack, featuredImg } = data.markdownRemark.frontmatter
  const { html } = data.markdownRemark
  return (
    <Layout>
      <div className={styles.details}>
        <h2>{title}</h2>
        <h3>{stack}</h3>
        <div>
          <Img
            className={styles.featured}
            fluid={featuredImg.childImageSharp.fluid}
          />
        </div>
        <div
          className={styles.html}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export default ProjectDetails

export const query = graphql`
  query ProjectDetails($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        stack
        featuredImg {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
