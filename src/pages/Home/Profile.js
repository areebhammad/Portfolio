import { Fragment } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import Link from 'components/Link';
import { Button } from 'components/Button';
import DecoderText from 'components/DecoderText';
import Divider from 'components/Divider';
import Image from 'components/Image';
import Section from 'components/Section';
import ProfileImg from 'assets/profile.jpg';
import ProfileImgLarge from 'assets/profile-large.jpg';
import ProfileImgPlaceholder from 'assets/profile-placeholder.jpg';
import { reflow } from 'utils/transition';
import { media } from 'utils/style';
//import { ReactComponent as KatakanaProfile } from 'assets/katakana-profile.svg';
import Heading from 'components/Heading';
import Text from 'components/Text';
import './Profile.css';

const ProfileText = ({ status, titleId }) => (
  <Fragment>
    <Heading
      className={classNames('profile__title', `profile__title--${status}`)}
      level={3}
      id={titleId}
    >
      <DecoderText text="Hi there" start={status !== 'exited'} delay={500} />
    </Heading>
    <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      I’m Areeb Hammad, currently pursuing computer science and engineering at{' '}
      <Link href="https://www.aalimec.ac.in">AMS Engineering College</Link>. My project
      include UX design, development and data analytics.{' '}
      {/*Being comfortable with code allows me to rapidly
      prototype and validate experiences. If you're interested in the tools and software I
      use check out my <Link href="/uses">uses page</Link>.*/}
    </Text>
    <Text
      className={classNames('profile__description', `profile__description--${status}`)}
      size="l"
    >
      An computer enthusiast from the age of 5, Got into web development in the 5th grade,
      Now looking for designing user centred and empathy based design and solve real-time
      problem using technology
    </Text>
  </Fragment>
);

const Profile = ({ id, visible, sectionRef }) => {
  const titleId = `${id}-title`;

  return (
    <Section
      className="profile"
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0} onEnter={reflow}>
        {status => (
          <div className="profile__content">
            <div className="profile__column">
              <ProfileText status={status} titleId={titleId} />
              <Button
                secondary
                className={classNames('profile__button', `profile__button--${status}`)}
                href="/contact"
                icon="send"
              >
                message me
              </Button>
            </div>
            <div className="profile__column">
              <div className="profile__tag" aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={status !== 'entered'}
                  collapseDelay={1000}
                />
                <div
                  className={classNames(
                    'profile__tag-text',
                    `profile__tag-text--${status}`
                  )}
                >
                  About Me
                </div>
              </div>
              {/*<div className="profile__image-wrapper">
                <Image
                  reveal
                  delay={100}
                  placeholder={ProfileImgPlaceholder}
                  srcSet={`${ProfileImg} 480w, ${ProfileImgLarge} 960w`}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Me standing"
                />
                  </div>*/}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};

export default Profile;
