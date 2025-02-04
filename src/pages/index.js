/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Hero from '../components/home/HeroSection'
import InfoSection from '../components/home/InfoSection'
import UpdatesSection from '../components/home/UpdatesSection'
import HomeTopProjects from '../components/home/HomeTopProjects'
import { PopupContext } from '../contextProvider/popupProvider'

const IndexContent = ({
  hideInfo,
  content,
  location,
  topProjects: projects,
  allProject
}) => {
  const popup = React.useContext(PopupContext)
  const [popupShown, setPopupShown] = React.useState(false)

  React.useEffect(() => {
    if (location?.state?.welcome && !popupShown) {
      const extra = location?.state?.flashMessage || false
      popup.triggerPopup('WelcomeLoggedOut', extra)
      setPopupShown(true)
    }
  }, [])

  return (
    <>
      <Hero content={content} />
      <HomeTopProjects
        projects={projects}
        totalCount={allProject?.totalCount}
      />
      {!hideInfo === true ? <InfoSection content={content} /> : null}
      <UpdatesSection content={content} />
    </>
  )
}

const IndexPage = props => {
  console.log(props)
  const { data, location } = props
  const { markdownRemark, topProjects, allProject } = data
  const { frontmatter, html } = markdownRemark
  const content = frontmatter
  const hideInfo = process.env.HIDE_INFO_SECTION
    ? process.env.HIDE_INFO_SECTION
    : false
  console.log({ data })
  return (
    <Layout isHomePage='true'>
      <Seo title='Home' />
      <IndexContent
        hideInfo={hideInfo}
        content={content}
        html={html}
        location={location}
        topProjects={topProjects?.projects}
        allProject={allProject}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($site: String!) {
    markdownRemark: markdownRemark(frontmatter: { slug: { eq: $site } }) {
      html
      frontmatter {
        slug
        mainHead
        headBold
        mainText
        mainButton
        mainButtonText
        infoHead
        infoSubtitle
        infoButtonText
        feature1
        feature1Text
        feature2
        feature2Text
        feature3
        feature3Text
        featureCta
        infoHead2
        infoSubtitle2
        userType1Title
        userType1Cta
        userType2Title
        userType2Cta
      }
    }
    topProjects: giveth {
      projects(take: 3) {
        id
        title
        balance
        image
        slug
        creationDate
        admin
        description
        walletAddress
        impactLocation
        categories {
          name
        }
        reactions {
          reaction
          id
          projectUpdateId
          userId
        }
      }
    }
    allProject {
      edges {
        node {
          id
          title
          balance
          image
          slug
          creationDate
          admin
          description
          walletAddress
          impactLocation
          categories {
            name
          }
          reactions {
            reaction
            id
            projectUpdateId
            userId
          }
        }
      }
      totalCount
    }
  }
`
export default IndexPage
