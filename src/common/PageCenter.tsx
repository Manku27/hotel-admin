import { Container } from '@mui/material';

export const PageCenter = ({ children, ...sx }: any) => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: '100%',
        backgroundColor: '#e0e0e0',
        ...sx,
      }}
      maxWidth={false}
    >
      {children}
    </Container>
  );
};
