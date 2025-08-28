import { GetServerSideProps } from 'next';
import { useCallback, useMemo, useState } from 'react';

import {
  Stack,
  Button,
  Divider,
  Typography,
  CircularProgress,
} from '@mui/material';
import { getProducts } from 'src/backend/database';
import { Product, ProductLabel } from 'src/constants/types';
import { Filters, ProductCard } from 'src/frontend/components';
import { useIsNextLoading } from 'src/frontend/hooks';
import { getProductLabel } from 'src/utils';

type Props = {
  products: Product[];
};

const Index = ({ products }: Props) => {
  const isLoading = useIsNextLoading();
  const [filteredLabel, setFilteredLabel] = useState<ProductLabel | null>(null);
  const onFilterChange = useCallback(
    (label: ProductLabel) => {
      if (label === filteredLabel) setFilteredLabel(null);
      else setFilteredLabel(label);
    },
    [filteredLabel]
  );
  const filteredProducts = useMemo(
    () =>
      filteredLabel !== null
        ? products.filter((product) => product.label === filteredLabel)
        : products,
    [filteredLabel, products]
  );

  return (
    <Stack spacing={8}>
      <Stack spacing={4}>
        <Typography variant="hero-sm">Chamone frios</Typography>
        <Typography>Confira todos os nossos produtos!🧀</Typography>
        <Stack direction="row" justifyContent="end" gap={2}>
          <Filters
            isCompact
            items={[
              ProductLabel.DAIRY,
              ProductLabel.MEATS,
              ProductLabel.PROCESSED,
              ProductLabel.HAMBURGERS,
            ].map((label) => ({
              value: label,
              label: getProductLabel(label),
              active: filteredLabel === label,
            }))}
            onChange={onFilterChange}
          />
        </Stack>
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
        ) : filteredProducts.length === 0 ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={4}
            height="300px"
          >
            <Typography>Nenhum produto encontrado 😭</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onFilterChange(null)}
            >
              Limpar filtros
            </Button>
          </Stack>
        ) : (
          <Stack
            sx={(theme) => ({
              gap: theme.spacing(8),
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            })}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Stack>
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
