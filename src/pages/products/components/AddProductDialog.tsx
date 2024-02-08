import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useAddProducts } from "../../../services/mutation";

function AddProductDialog() {
  const { mutation } = useAddProducts();
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProduct = () => {
    mutation.mutate({
      title: productName,
      description: productDescription,
    });
    setProductName("");
    setProductDescription("");
    setOpen(false);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button
          variant="contained"
          size="large"
          sx={{ marginLeft: "20px", marginTop: "5px" }}
          onClick={handleClickOpen}
        >
          Add Product
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {" "}
            <TextField
              autoFocus
              margin="dense"
              id="productName"
              label="Product Name"
              type="text"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="productDescription"
              label="Product Description"
              type="text"
              fullWidth
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          ></Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleAddProduct}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddProductDialog;
