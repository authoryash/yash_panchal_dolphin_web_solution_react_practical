import {
  Card,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

const ProductCard = ({ image, name, price }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={2} sx={{ margin: "auto" }}>
      <Card sx={{ minHeight: "320px" }}>
        <CardActionArea>
          <CardMedia component="img" image={image} alt={name} loading="lazy" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Price: ${price}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductCard;
