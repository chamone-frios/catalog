import Image from 'next/image';

import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Product, ProductMetric } from 'src/constants/types';
import { numberToCurrency } from 'src/utils/number';

import { CardFields } from './card-fields';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const normalizedImg = product.img
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const imgSrc = `/assets/products/${normalizedImg}.png`;
  const getMetricLabel = (metric: ProductMetric): string => {
    switch (metric) {
      case ProductMetric.UNIT:
        return 'caixa';
      case ProductMetric.KG:
        return 'quilo';
      case ProductMetric.G:
        return 'grama';
      case ProductMetric.L:
        return 'litro';
      default:
        return '';
    }
  };

  return (
    <Card key={product.id}>
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack>
          <Image
            src={imgSrc}
            alt={product.name}
            width={200}
            height={200}
            layout="responsive"
            style={{
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '4px',
            }}
          />
          <Typography variant="caption" color="textSecondary" mb={3}>
            * Imagens meramente ilustrativas geradas por IA
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>
        </Stack>
        <Stack>
          <CardFields label="Fabricante:" value={product.maker} />
          <Box
            sx={(theme) => ({
              width: '100%',
              marginTop: theme.spacing(4),
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'flex-end',
            })}
          >
            <Typography variant="h6" fontWeight={600}>
              {numberToCurrency({ number: product.price })}
            </Typography>
            <Typography variant="body1">
              {`/ ${getMetricLabel(product.metric)}`}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export { ProductCard };
