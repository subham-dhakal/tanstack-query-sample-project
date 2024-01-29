import { ProductsType } from "../../../@types/product";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import debounce from "lodash.debounce";
import {
  CardActionArea,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Button,
  Box,
  TextField,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useProductContext } from "../../../context/ProductContext";

function ProductList() {
  const {
    searchParams,
    categories,
    data,
    isError,
    isPending,
    handleCategoryChange,
    handlePage,
    setSearchParams,
  } = useProductContext();

  const skip: number = parseInt(searchParams.get("skip") || "0");
  const limit: number = parseInt(searchParams.get("limit") || "8");
  const q: string = searchParams.get("q") || "";
  const category: string = searchParams.get("category") || "";

  if (isPending) return <h1>Loading...</h1>;
  if (isError)
    return (
      <>
        <Box display="flex" justifyContent="center" alignItems="center">
          <h1 style={{ margin: "auto" }}>
            The product catalog is temporarily unavailable. Please try again
            later
          </h1>
        </Box>
      </>
    );

  return (
    <div>
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h3" sx={{ marginBottom: "10px" }}>
            Products
          </Typography>
        </div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            variant="outlined"
            sx={{ width: "650px", marginRight: "10px" }}
            placeholder="Search Products"
            onChange={debounce((e) => {
              setSearchParams((prev) => {
                prev.set("q", e.target.value);
                prev.delete("category");
                prev.set("skip", "0");
                return prev;
              });
            }, 1000)}
          />
          <Box sx={{ width: "200px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                {categories?.map((item: string, key: number) => (
                  <MenuItem key={key} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
          {data?.total > 0 ? (
            <>
              {data?.products?.map((item: ProductsType) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ maxWidth: 345, height: "100%" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="150"
                        image={item.thumbnail}
                        alt="image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.title}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          {`$${item.price}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxHeight: 60,
                          }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </>
          ) : (
            <h2 style={{ margin: "auto" }}>0 products found for "{q}"</h2>
          )}
        </Grid>
        {data?.total > 0 && (
          <Box
            m={2}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button
              variant="contained"
              sx={{ marginRight: 2 }}
              onClick={() => handlePage(-limit)}
              disabled={skip < limit}
            >
              Previous
            </Button>

            <Button
              variant="contained"
              onClick={() => handlePage(limit)}
              disabled={limit + skip >= data?.total}
            >
              Next
            </Button>
          </Box>
        )}
      </>
    </div>
  );
}

export default ProductList;
