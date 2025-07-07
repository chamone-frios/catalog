import { GetServerSideProps } from 'next';

import {
  Stack,
  Button,
  Divider,
  Typography,
  CircularProgress,
} from '@mui/material';
import { getProducts } from 'src/backend/database';
import { Product } from 'src/constants/types';
import { ProductCard } from 'src/frontend/components';
import { useIsNextLoading } from 'src/frontend/hooks';

type Props = {
  products: Product[];
};

const Index = ({ products }: Props) => {
  const isLoading = useIsNextLoading();

  return (
    <Stack spacing={8}>
      <Stack spacing={4}>
        <Typography variant="hero-sm">Produtos</Typography>
        <Typography>Esses são nossos produtos! 🧀</Typography>
      </Stack>
      <Divider />
      <Stack height="100%" gap={4}>
        {isLoading ? (
          <Stack alignItems="center" justifyContent="center" height="300px">
            <CircularProgress />
          </Stack>
        ) : !products || products.length === 0 ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={4}
            height="300px"
          >
            <Typography>Nenhum produto cadastrado 😭</Typography>
            <Button
              variant="contained"
              color="primary"
              href="https://admin.chamonefrios.com/products"
            >
              Novo produto
            </Button>
          </Stack>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Stack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const products = await getProducts();
    return { props: { products } };
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return { props: { products: [] } };
  }
};

export default Index;
