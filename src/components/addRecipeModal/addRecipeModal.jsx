import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import RecipeSteps from "../recipeSteps/recipeSteps";

const AddRecipeModal = ({
  open,
  onClose,
  recipeData,
  handleRecipeDataChange,
  handleStepChange,
  handleAddRecipe,
  isDisabled,
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
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          maxWidth: "900px",
          maxHeight: "90vh",
          overflow: "scroll",
        }}
      >
        <Typography variant='h5' gutterBottom>
          Adicionar Receita
        </Typography>
        <TextField
          label='Título'
          name='title'
          value={recipeData.title}
          onChange={handleRecipeDataChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Descrição'
          name='description'
          value={recipeData.description}
          onChange={handleRecipeDataChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Autor'
          name='author'
          value={recipeData.author}
          onChange={handleRecipeDataChange}
          fullWidth
          margin='normal'
          required
        />
        <RecipeSteps onChange={handleStepChange} steps={recipeData.steps} />
        <Button
          variant='contained'
          onClick={handleAddRecipe}
          fullWidth
          disabled={isDisabled}
        >
          Confirmar Adição
        </Button>
      </Box>
    </Modal>
  );
};

AddRecipeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  recipeData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    steps: PropTypes.array.isRequired,
  }).isRequired,
  handleRecipeDataChange: PropTypes.func.isRequired,
  handleStepChange: PropTypes.func.isRequired,
  handleAddRecipe: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default AddRecipeModal;
