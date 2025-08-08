import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import {
  LocalPhoneOutlined,
  LunchDiningOutlined,
  WhatsApp,
} from '@mui/icons-material';
import { Fab, IconButton, Stack, Tooltip, Typography } from '@mui/material';

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
          <Typography variant="body2" color="text.secondary" textAlign="center">
            © 2025 Chamone Frios | (31) 98419-7265
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Todos os direitos reservados.
          </Typography>
        </Footer>
      </Main>
      <Tooltip title="Fale conosco no WhatsApp">
        <Fab
          component="a"
          href="https://wa.me/5531984197265?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos."
          target="_blank"
          rel="noopener noreferrer"
          color="success"
          aria-label="WhatsApp"
          sx={{
            position: 'fixed',
            right: (theme) => `max(${theme.spacing(8)}, 10%)`,
            bottom: (theme) => theme.spacing(12),
            zIndex: (theme) => theme.zIndex.tooltip + 1,
            boxShadow: 6,
          }}
        >
          <WhatsApp />
        </Fab>
      </Tooltip>
    </WallPaper>
  );
};

export { PageWrapper };
