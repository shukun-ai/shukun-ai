import { Avatar, Box } from '@mantine/core';
import logo from '../../../assets/dark-logo@4x.png';
import mockFace from '../../../assets/mock-face.png';

export type DialogCardProps = {
  avatarRole: 'system' | 'user' | 'assistant';
  children: JSX.Element | JSX.Element[];
};

export const DialogCard = ({ avatarRole, children }: DialogCardProps) => {
  return (
    <Box style={{ display: 'flex' }}>
      <Box style={{ width: 38, marginRight: 20 }}>
        {avatarRole === 'system' && assistantAvatar()}
        {avatarRole === 'user' && userAvatar()}
        {avatarRole === 'assistant' && assistantAvatar()}
      </Box>
      <Box style={{ flex: 1 }}>{children}</Box>
    </Box>
  );
};

const assistantAvatar = () => (
  <Avatar radius="lg" color="blue">
    <img src={logo} alt="SHUKUN AI" style={{ width: 38, height: 38 }} />
  </Avatar>
);

const userAvatar = () => (
  <Avatar radius="lg" color="blue">
    <img
      src={mockFace}
      alt="Davy Chen"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: 20,
      }}
    />
  </Avatar>
);
