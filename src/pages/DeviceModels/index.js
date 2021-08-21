import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Image from 'components/Image';
import Link from 'components/Link';
import { Button } from 'components/Button';
import Footer from 'components/Footer';
import {
  ProjectContainer,
  ProjectBackground,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectImage,
  ProjectSectionHeading,
  ProjectSectionColumns,
  ProjectTextRow,
  ProjectSectionText,
} from 'components/ProjectLayout';
import SegmentedControl, { SegmentedControlOption } from 'components/SegmentedControl';
import { useTheme } from 'components/ThemeProvider';
import { useAppContext, useScrollRestore } from 'hooks';
import { media } from 'utils/style';
import prerender from 'utils/prerender';
import deviceModelsBackground from 'assets/device-models-background.jpg';
import deviceModelsBackgroundLarge from 'assets/device-models-background-large.jpg';
import deviceModelsBackgroundPlaceholder from 'assets/device-models-background-placeholder.jpg';
import deviceModels from 'assets/device-models.jpg';
import deviceModelsLarge from 'assets/device-models-large.jpg';
import deviceModelsPlaceholder from 'assets/device-models-placeholder.jpg';
import deviceModelsBranding from 'assets/device-models-branding.png';
import deviceModelsBrandingLarge from 'assets/device-models-branding-large.png';
import deviceModelsBrandingPlaceholder from 'assets/device-models-branding-placeholder.png';
import deviceModelsBanner from 'assets/device-models-banner.jpg';
import deviceModelsBannerLarge from 'assets/device-models-banner-large.jpg';
import deviceModelsBannerPlaceholder from 'assets/device-models-banner-placeholder.jpg';
import deviceModelsComponentsDark from 'assets/device-models-components-dark.jpg';
import deviceModelsComponentsDarkLarge from 'assets/device-models-components-dark-large.jpg';
import deviceModelsComponentsDarkPlaceholder from 'assets/device-models-components-dark-placeholder.jpg';
import deviceModelsComponentsLight from 'assets/device-models-components-light.jpg';
import deviceModelsComponentsLightLarge from 'assets/device-models-components-light-large.jpg';
import deviceModelsComponentsLightPlaceholder from 'assets/device-models-components-light-placeholder.jpg';
import deviceModelsLogo from 'assets/device-models-logo.png';
import deviceModelsLogoLarge from 'assets/device-models-logo-large.png';
import deviceModelsLogoPlaceholder from 'assets/device-models-logo-placeholder.png';

const title = 'Device Models';
const description =
  'Design and development of a Figma plugin to create mockups with 3D device models.';
const roles = [
  'Creative Direction',
  'UX and UI Design',
  'Front End & App Development',
  'Motion Design',
];

const ProjectDM = () => {
  const { themeId } = useTheme();
  const { dispatch } = useAppContext();
  useScrollRestore();

  const isDark = themeId === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    dispatch({ type: 'setTheme', value: themes[index] });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Projects | {title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${deviceModelsBackground} 1080w, ${deviceModelsBackgroundLarge} 2160w`}
          placeholder={deviceModelsBackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://devicemodels.com"
          roles={roles}
        />
        <ProjectSection first>
          <ProjectSectionContent>
            <ProjectImage
              raised
              srcSet={`${deviceModels} 1280w, ${deviceModelsLarge} 2560w`}
              placeholder={deviceModelsPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Device Models plugin interface."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The Problem</ProjectSectionHeading>
            <ProjectSectionText>
              After complimenting <Link href="/uses">my arsenal</Link> with Figma as my
              weapon of choice for UI design in 2019, I noticed that working with 3D and
              interactive content was not possible within Figma, especially when using
              grid systems.
            </ProjectSectionText>
            <ProjectSectionText>
              In early 2019, I found that designers were growing increasingly interested
              in 3D and immersive art direction, yet lacked the tools to do so without
              hiring a developer or modeler. I decided to change that and, with it,
              created Device Models.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionHeading>Visual Identity</ProjectSectionHeading>
              <ProjectSectionText>
                With a clear mission and audience in mind, it was time to create a name
                for itself. Branding was critical to stand out in the Figma catalog, where
                identity in a small 64x64 pixel square was the first thing a user sees.
              </ProjectSectionText>
              <ProjectSectionText>
                I complimented the 3D feel of Device Models with a low poly monogram and
                bright, modern colors to portray its classy modernism. This included a
                matching typeface and color scheme that kept true to the feel of Figma.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${deviceModelsBranding} 400w, ${deviceModelsBrandingLarge} 898w`}
              placeholder={deviceModelsBrandingPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="The Device Models color palette and logo, featuring a low poly monogram to convey its 3D allure."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              key={themeId}
              srcSet={`${
                isDark ? deviceModelsComponentsDark : deviceModelsComponentsLight
              } 800w, ${
                isDark
                  ? deviceModelsComponentsDarkLarge
                  : deviceModelsComponentsLightLarge
              } 1000w`}
              placeholder={
                isDark
                  ? deviceModelsComponentsDarkPlaceholder
                  : deviceModelsComponentsLightPlaceholder
              }
              alt={`A set of ${themeId} themed components for the Device Models design system`}
              sizes="100vw"
            />
            <ProjectTextRow>
              <SegmentedControl
                currentIndex={themes.indexOf(themeId)}
                onChange={handleThemeChange}
              >
                <SegmentedControlOption>Dark theme</SegmentedControlOption>
                <SegmentedControlOption>Light theme</SegmentedControlOption>
              </SegmentedControl>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionHeading>Design and Development</ProjectSectionHeading>
              <ProjectSectionText>
                Keeping the look and feel of Device Models consistent across its online
                presence was a difficult challenge. It was critical to remain consistent
                in both messaging and appearance while curating to different platforms.
              </ProjectSectionText>
              <ProjectSectionText>
                Keeping to a universal,{' '}
                <Link href="https://storybook.devicemodels.com">
                  component-based design
                </Link>
                , the "look and feel" remained nice and tidy, and both the aesthetics and
                user experience were well-informed across the board.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Show, not Tell</ProjectSectionHeading>
              <ProjectSectionText>
                I embrace the idea of "show, not tell" when marketing innovative products.
                Wide-spread adoption is momentum-based, and you have to give users a
                reason to jump onboard, hype or not. I like putting the product in front
                of them and letting its productivity powers speak for itself.
              </ProjectSectionText>
              <ProjectSectionText>
                With a bold show of identity, I included the very 3D components used on
                the plugin both within marketing material and online, featuring its
                variations to communicate its flexibility (using Device Models, of
                course).
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${deviceModelsBanner} 1280w, ${deviceModelsBannerLarge} 2560w`}
              placeholder={deviceModelsBannerPlaceholder}
              alt="A promotional banner for Device Models, displaying a variety of devices and bright colors."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <Image
                srcSet={`${deviceModelsLogo} 180w, ${deviceModelsLogoLarge} 320w`}
                placeholder={deviceModelsLogoPlaceholder}
                alt="The Device Models logo."
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 220px`}
                style={{ maxWidth: 220, width: '100%', marginBottom: 30 }}
              />
              <ProjectSectionHeading>The Result</ProjectSectionHeading>
              <ProjectSectionText>
                Within 48 hours of release, Device Models became a popular tool, reaching
                1,000 downloads. You can find the plugin on Figma's featured plugins
                collection to render 3D mockups all across designer spaces.
              </ProjectSectionText>
              <Button
                secondary
                iconHoverShift
                icon="chevronRight"
                href="https://devicemodels.com"
              >
                View on Figma
              </Button>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default ProjectDM;
