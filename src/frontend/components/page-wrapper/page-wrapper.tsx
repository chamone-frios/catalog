import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { LocalPhoneOutlined, LunchDiningOutlined } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

import { Footer, Main, Navbar, WallPaper } from './page-wrapper.styles';

const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <WallPaper>
      <Navbar>
        <Stack height="100%">
          <Image
            alt="Chamone Frios"
            src="/assets/logo.png"
            width={64}
            height={64}
            style={{ borderRadius: '50%' }}
          />
        </Stack>
        <Link href="/">
          <Stack alignItems="center">
            <IconButton sx={{ width: 'fit-content' }}>
              <LunchDiningOutlined />
            </IconButton>
            <Typography>Produtos</Typography>
          </Stack>
        </Link>
        <Link href="/contato">
          <Stack alignItems="center">
            <IconButton sx={{ width: 'fit-content' }}>
              <LocalPhoneOutlined />
            </IconButton>
            <Typography>Contato</Typography>
          </Stack>
        </Link>
      </Navbar>
      <Main>
        {children}
        <Footer>
          <Typography variant="body2" color="text.secondary">
            © 2025 Chamone Frios. Todos os direitos reservados. (31) 98419-7265
          </Typography>
        </Footer>
      </Main>
    </WallPaper>
  );
};

export { PageWrapper };
