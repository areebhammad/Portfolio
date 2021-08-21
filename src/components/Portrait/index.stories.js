import Portrait from 'components/Portrait';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Portrait',
};

export const portrait = () => (
  <StoryContainer padding={0}>
    <Portrait style={{ width: '100%', height: '100%' }} />
  </StoryContainer>
);
