import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

const DeleteRecipeModal = ({
  open,
  onClose,
  cookbook,
  selectedRecipeId,
  handleRecipeSelectChange,
  recipeData,
  handleDeleteRecipe,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "900px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Typography variant='h5' gutterBottom>
          Excluir Receita
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Selecione a receita que deseja excluir
        </Typography>
        <Select
          value={selectedRecipeId}
          onChange={handleRecipeSelectChange}
          fullWidth
          margin='normal'
          sx={{mb: 2}}
        >
          {cookbook.map(recipe => (
            <MenuItem key={recipe.id} value={recipe.id}>
              {recipe.title}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant='contained'
          onClick={handleDeleteRecipe}
          fullWidth
          disabled={recipeData.id === ""}
        >
          Confirmar Exclusão
        </Button>
      </Box>
    </Modal>
  );
};

DeleteRecipeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cookbook: PropTypes.array.isRequired,
  selectedRecipeId: PropTypes.string.isRequired,
  handleRecipeSelectChange: PropTypes.func.isRequired,
  recipeData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    steps: PropTypes.array.isRequired,
  }).isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
};

export default DeleteRecipeModal;
