import { ReactNode } from 'react';

import { Email, Phone, WhatsApp } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

const CONTACTS: {
  name: string;
  text: string;
  icon: ReactNode;
  href: string;
}[] = [
  {
    name: 'WhatsApp',
    text: 'Mande uma mensagem agora mesmo!',
    icon: <WhatsApp />,
    href: 'https://wa.me/+5531984197265?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20produtos.',
  },
  {
    name: 'Telefone',
    text: 'Ligue agora para 31 98419-7265',
    icon: <Phone />,
    href: 'tel:+5531984197265',
  },
  {
    name: 'Email',
    text: 'Envie um email para contato@chamonefrios.com.br',
    icon: <Email />,
    href: 'mailto:chamonefrios@gmail.com',
  },
];

const Index = () => {
  return (
    <Stack spacing={8}>
      <Stack spacing={4}>
        <Typography variant="hero-sm">Chamone frios</Typography>
        <Typography>Entre em contato com nossa equipe! 📞</Typography>
      </Stack>
      <Divider />
      <Typography variant="body1">
        Estamos prontos para ajudar você com pedidos, prazos, orçamento e
        suporte. 😉
      </Typography>
      <List>
        {CONTACTS.map((contact) => (
          <ListItem key={contact.name}>
            <ListItemButton
              sx={(theme) => ({ borderRadius: theme.spacing(3) })}
              onClick={() => window.open(contact.href, '_blank')}
            >
              <ListItemIcon>
                <IconButton>{contact.icon}</IconButton>
              </ListItemIcon>
              <ListItemText primary={contact.name} secondary={contact.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default Index;
