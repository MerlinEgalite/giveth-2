/** @jsx jsx */
import React from 'react'
import { Link } from 'gatsby'
import ProjectCard from '../projectListing'
import styled from '@emotion/styled'
import theme from '../../gatsby-plugin-theme-ui'
import { Box, Grid, Text, jsx } from 'theme-ui'
import DarkClouds from '../../images/svg/general/decorators/dark-clouds.svg'
import RaisedHand from '../../images/decorator-raised-one-hand.png'

const SpecialCard = styled(Link)`
  display: flex;
  width: 100%;
  height: 240px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background-color: ${theme.colors.secondary};
  border: 1px solid ${theme.colors.muted};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0.5rem 0;
`

const RaisedHandImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 12px;

  @media (max-width: 800px) {
    display: none;
    align-items: flex-start;
  }
`

const MyProjects = props => {
  const { projects } = props
  return (
    <>
      <Grid p={4} columns={[1, 2]} style={{ justifyItems: 'center' }}>
        {projects?.map((item, index) => {
          return (
            <ProjectCard
              name={item?.title}
              image={item?.image}
              raised={111}
              categories={item?.categories}
              listingId={index}
              key={index}
            />
          )
        })}
        <SpecialCard to='/create' sx={{ cursor: 'pointer' }}>
          {' '}
          <DarkClouds
            style={{ position: 'absolute', top: '41px', right: '34px' }}
          />
          <Box
            sx={{
              width: '60%',
              pb: 2,
              pt: 4,
              textAlign: 'center',
              alignSelf: 'center'
            }}
          >
            <Text
              sx={{
                variant: 'text.default',
                color: 'bodyLight'
              }}
            >
              Start raising funds
            </Text>
            <Text sx={{ variant: 'headings.h4', color: 'background' }}>
              Create a Project
            </Text>
          </Box>
          <RaisedHandImg src={RaisedHand} />
        </SpecialCard>
      </Grid>
    </>
  )
}

export default MyProjects
