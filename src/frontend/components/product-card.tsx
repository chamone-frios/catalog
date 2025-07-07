import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Product, ProductMetric } from 'src/constants/types';
import { numberToCurrency } from 'src/utils/number';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const getMetricLabel = (metric: ProductMetric): string => {
    switch (metric) {
      case ProductMetric.UNIT:
        return 'unidade';
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
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fabricante: {product.maker}
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {numberToCurrency({ number: product.price })}
          </Typography>
          <Typography variant="body1">
            {`/ ${getMetricLabel(product.metric)}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export { ProductCard };
