import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { Masrcme, Navbar, WallPaper } from './page-wrapper.styles';

const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <WallPaper>
      <Navbar>
        <Link href="/">Nossos produtos</Link>
        <Link href="/contato">Contato</Link>
      </Navbar>
      <Masrcme>{children}</Masrcme>
    </WallPaper>
  );
};

export { PageWrapper };
