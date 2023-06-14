import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import RecipeSteps from "../recipeSteps/recipeSteps";

const EditRecipeModal = ({
  open,
  onClose,
  cookbook,
  selectedRecipeId,
  handleRecipeSelectChange,
  recipeData,
  handleRecipeDataChange,
  handleStepChange,
  handleEditRecipe,
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
          maxWidth: "900px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          maxHeight: "90vh",
          overflow: "scroll",
        }}
      >
        <Typography variant='h5' gutterBottom>
          Editar Receita
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Selecione a receita que deseja alterar
        </Typography>
        <Select
          value={selectedRecipeId}
          onChange={handleRecipeSelectChange}
          fullWidth
          margin='normal'
        >
          {cookbook.map(recipe => (
            <MenuItem key={recipe.id} value={recipe.id}>
              {recipe.title}
            </MenuItem>
          ))}
        </Select>
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
          onClick={handleEditRecipe}
          fullWidth
          disabled={isDisabled}
        >
          Confirmar Edição
        </Button>
      </Box>
    </Modal>
  );
};

EditRecipeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cookbook: PropTypes.array.isRequired,
  selectedRecipeId: PropTypes.string.isRequired,
  handleRecipeSelectChange: PropTypes.func.isRequired,
  recipeData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    steps: PropTypes.array.isRequired,
  }).isRequired,
  handleRecipeDataChange: PropTypes.func.isRequired,
  handleStepChange: PropTypes.func.isRequired,
  handleEditRecipe: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default EditRecipeModal;
