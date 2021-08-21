import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Image from 'components/Image';
import Footer from 'components/Footer';
import {
  ProjectContainer,
  ProjectBackground,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectImage,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectSectionColumns,
  ProjectTextRow,
} from 'components/ProjectLayout';
import { useScrollRestore } from 'hooks';
import { media } from 'utils/style';
import prerender from 'utils/prerender';
import dttBackground from 'assets/dtt-background.jpg';
import dttBackgroundLarge from 'assets/dtt-background-large.jpg';
import dttBackgroundPlaceholder from 'assets/dtt-background-placeholder.jpg';
import dtt from 'assets/dtt.jpg';
import dttLarge from 'assets/dtt-large.jpg';
import dttPlaceholder from 'assets/dtt-placeholder.jpg';
import dttBranding from 'assets/dtt-branding.png';
import dttBrandingLarge from 'assets/dtt-branding-large.png';
import dttBrandingPlaceholder from 'assets/dtt-branding-placeholder.png';
import dttTool from 'assets/dtt-tool.jpg';
import dttToolLarge from 'assets/dtt-tool-large.jpg';
import dttToolPlaceholder from 'assets/dtt-tool-placeholder.jpg';
import dttLanding from 'assets/dtt-landing.jpg';
import dttLandingLarge from 'assets/dtt-landing-large.jpg';
import dttLandingPlaceholder from 'assets/dtt-landing-placeholder.jpg';

const title = 'A Tool for Everything';
const description =
  'I lead the design and development of DevTech Tools. We focused on creating the best platform for developers to build better software.';
const roles = ['Art Direction', 'UX and UI Design', 'API & Full Stack Development'];

const ProjectDTT = () => {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet>
        <title>Projects | {title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${dttBackground} 1080w, ${dttBackgroundLarge} 2160w`}
          placeholder={dttBackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader title={title} description={description} roles={roles} />
        <ProjectSection first>
          <ProjectSectionContent>
            <ProjectImage
              raised
              srcSet={`${dtt} 1280w, ${dttLarge} 2560w`}
              placeholder={dttPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Landing screen of the DevTech Tools website."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionHeading>Visual Identity</ProjectSectionHeading>
              <ProjectSectionText>
                We represented the technology aspect of DevTech Tools with a bundle of
                traces, accompanied with fresh colors and a crisp typeface to portray its
                modernity.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${dttBranding} 400w, ${dttBrandingLarge} 898w`}
              placeholder={dttBrandingPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="The DevTech Tools color palette and logo, featuring pipelines as electronic traces."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns alternate>
            <Image
              srcSet={`${dttTool} 400w, ${dttToolLarge} 898w`}
              placeholder={dttToolPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="The tool wrapper of the JSON to CSV data converter."
            />
            <ProjectTextRow noMargin>
              <ProjectSectionHeading>Expanding the Workflow</ProjectSectionHeading>
              <ProjectSectionText>
                DevTech Tools launched with a comprehensive set of tools that expanded
                into convenience tools for maintaining and migrating large databases and
                datasets.
              </ProjectSectionText>
              <ProjectSectionText>
                I designed a simple, intuitive interface for users to cut down menial
                development time to a single click.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Going Online</ProjectSectionHeading>
              <ProjectSectionText>
                We needed a place for DevTech Tools and its users to call home.
              </ProjectSectionText>
              <ProjectSectionText>
                I designed and developed the DevTech Tools website, featuring a blog with
                weekly tutorials, comprehensive and interactive documentation for the
                DevTech Tools API, and a web application to put everything together.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${dttLanding} 1280w, ${dttLandingLarge} 2560w`}
              placeholder={dttLandingPlaceholder}
              alt="A screenshot of the DevTech Tools landing page."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default ProjectDTT;
