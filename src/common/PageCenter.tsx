import { Container } from '@mui/material';

export const PageCenter = ({ children, ...props }: any) => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: '100vh',
        backgroundColor: '#e0e0e0',
        ...props,
      }}
      maxWidth={false}
    >
      {children}
    </Container>
  );
};
