import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Intro from 'pages/Home/Intro';
import ProjectSummary from 'pages/Home/ProjectSummary';
import Profile from 'pages/Home/Profile';
import Footer from 'components/Footer';
import { usePrefersReducedMotion, useRouteTransition } from 'hooks';
import { useLocation } from 'react-router-dom';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from 'assets/spr-lesson-builder-dark.jpg';
import sprTextureLarge from 'assets/spr-lesson-builder-dark-large.jpg';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import gamestackTexture from 'assets/gamestack-login.png';
import gamestackTextureLarge from 'assets/gamestack-login-large.png';
import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from 'assets/gamestack-list.png';
import gamestackTexture2Large from 'assets/gamestack-list-large.png';
import sliceTexture from 'assets/slice-app.jpg';
import sliceTextureLarge from 'assets/slice-app-large.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import iphone11 from 'assets/iphone-11.glb';
import macbookPro from 'assets/macbook-pro.glb';
import './index.css';

/* Home Page content change here*/
const disciplines = ['Data Scientist', 'Developer', 'Illustrator'];

const Home = () => {
  const { status } = useRouteTransition();
  const { hash, state } = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [intro, projectOne, details];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            scrollTimeout = setTimeout(
              () => {
                element.current.focus();
              },
              prefersReducedMotion ? 0 : 400
            );
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '-20% 0px -20% 0px' }
      );

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, prefersReducedMotion, status]);

  return (
    <div className="home">
      <Helmet>
        <title>Areeb Hammad | Designer + Developer</title>
        <meta
          name="description"
          content="Portfolio of Areeb Hammad – a designer and developer &amp; 
           with a focus on equity based design."
        />
        <link rel="prefetch" href={iphone11} as="fetch" crossorigin="" />
        <link rel="prefetch" href={macbookPro} as="fetch" crossorigin="" />
      </Helmet>
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />

      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Face mask detection"
        description="Developed using machine learning for covid crisis"
        buttonText="View Website"
        buttonLink="https://github.com/areebhammad/Face-Mask-Detection-"
        model={{
          type: 'laptop',
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              src: sprTexture,
              srcSet: `${sprTexture} 980w, ${sprTextureLarge} 1376w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Sandwich customization app"
        description="Designing a platform to help people order sandwiches to their taste "
        buttonText="View Project"
        buttonLink="https://github.com/areebhammad/Face-Mask-Detection-"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              src: gamestackTexture,
              srcSet: `${gamestackTexture} 254w, ${gamestackTextureLarge} 508w`,
              placeholder: gamestackTexturePlaceholder,
            },
            {
              src: gamestackTexture2,
              srcSet: `${gamestackTexture2} 254w, ${gamestackTexture2Large} 508w`,
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Heart disease Prediction system"
        description="Developed using machine learning for accurate analysis"
        buttonText="View Website"
        buttonLink="https://github.com/areebhammad/Heart-Disease-Prediction-System"
        /*buttonLink="/projects/slice"*/
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              src: sliceTexture,
              srcSet: `${sliceTexture} 980w, ${sliceTextureLarge} 1376w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};

export default Home;
