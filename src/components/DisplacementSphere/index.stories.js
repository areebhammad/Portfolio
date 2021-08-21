import DisplacementSphere from 'components/DisplacementSphere';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Displacement Sphere',
};

export const displacementSphere = () => (
  <StoryContainer padding={0}>
    <DisplacementSphere />
  </StoryContainer>
);
