import { useParams } from "react-router-dom";
import client from "../../../utils/client";
import { useQuery } from "@tanstack/react-query";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
} from "@mui/material";

function ProductDetail() {
  const { productId } = useParams();

  const {
    data: product,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await client.get(`${productId}`);
      const data = response.data;
      return data;
    },
    staleTime: 10000,
  });

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>Error loading data!!!</h1>;

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            alt={product.title}
            image={product.thumbnail}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {`$${product.price}`}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
