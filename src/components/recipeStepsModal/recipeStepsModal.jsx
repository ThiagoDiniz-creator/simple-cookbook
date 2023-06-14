import PropTypes from "prop-types";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const RecipeStepsModal = ({
  open,
  handleCloseModal,
  newStep,
  handleStepInputChange,
  handleAddStep,
}) => {
  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          bgcolor: "background.paper",
          maxWidth: "900px",
          boxShadow: 24,
          p: 2,
          overflowY: "scroll",
          maxHeight: "90vh",
        }}
      >
        <Typography variant='h5' gutterBottom>
          Etapas da receita
        </Typography>
        <TextField
          label='Nome da etapa'
          name='name'
          value={newStep.name}
          onChange={handleStepInputChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Duração da etapa'
          name='duration'
          value={newStep.duration}
          onChange={handleStepInputChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Ingredientes da Etapa'
          name='ingredients'
          value={newStep.ingredients}
          onChange={handleStepInputChange}
          fullWidth
          margin='normal'
        />
        <Button
          color='primary'
          variant='contained'
          onClick={handleAddStep}
          disabled={
            newStep.name.trim() === "" ||
            newStep.duration.trim() === "" ||
            newStep.ingredients.trim() === ""
          }
          sx={{ width: "100%", mb: 4 }}
        >
          <AddCircleOutlineOutlined />
          <Typography variant='body2'>Adicionar etapa</Typography>
        </Button>
        <Button
          variant='contained'
          color='info'
          onClick={handleCloseModal}
          fullWidth
        >
          Sair
        </Button>
      </Box>
    </Modal>
  );
};

RecipeStepsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  newStep: PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
  }).isRequired,
  handleStepInputChange: PropTypes.func.isRequired,
  handleAddStep: PropTypes.func.isRequired,
};

export default RecipeStepsModal;
