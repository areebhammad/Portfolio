import { Table, TableRow, TableCell } from 'components/Table';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Table',
};

export const table = () => (
  <StoryContainer>
    <Table>
      {new Array(10).fill().map((_, i) => (
        <TableRow>
          <TableCell>
            <strong>Label {i + 1}</strong>
          </TableCell>
          <TableCell>Content {i + 1}</TableCell>
        </TableRow>
      ))}
    </Table>
  </StoryContainer>
);
