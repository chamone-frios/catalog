import Image from 'next/image';

import { Divider, Stack, Typography } from '@mui/material';

const Index = () => {
  return (
    <Stack spacing={8}>
      <Stack spacing={4}>
        <Typography variant="hero-sm">Chamone frios</Typography>
        <Typography>A distribuidora mais pica de BH 🤙</Typography>
      </Stack>
      <Divider />
      <Stack alignItems="center" justifyContent="center" height="300px">
        <Image
          alt="Chamone Frios"
          src="/assets/logo.png"
          width={150}
          height={150}
          style={{ borderRadius: '50%' }}
        />
        <Typography
          variant="h4"
          mt={2}
          sx={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => window.open('https://wa.me/+5531984197265', '_blank')}
        >
          Entre em contato conosco via WhatsApp!
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Index;
