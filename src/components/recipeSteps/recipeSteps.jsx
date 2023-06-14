import { Button, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import RecipeStepsModal from "../recipeStepsModal/recipeStepsModal";
import RecipeStepsTable from "../recipeStepsTable/recipeStepsTable";
import { useEffect, useState } from "react";

const RecipeSteps = ({ steps: propsSteps, onChange }) => {
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState(propsSteps);
  const [newStep, setNewStep] = useState({
    name: "",
    duration: "",
    ingredients: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setSteps(propsSteps);
  }, [propsSteps]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setNewStep({
      name: "",
      duration: "",
      ingredients: "",
    });
    setEditIndex(null);
  };

  const handleStepInputChange = event => {
    const { name, value } = event.target;
    setNewStep(prevStep => ({
      ...prevStep,
      [name]: value,
    }));
  };

  const handleAddStep = () => {
    if (
      newStep.name.trim() === "" ||
      newStep.duration.trim() === "" ||
      newStep.ingredients.trim() === ""
    ) {
      return;
    }
    let updatedSteps;
    if (editIndex !== null) {
      updatedSteps = [...steps];
      updatedSteps[editIndex] = newStep;
    } else {
      updatedSteps = [...steps, newStep];
    }
    setSteps(updatedSteps);
    setNewStep({
      name: "",
      duration: "",
      ingredients: "",
    });
    onChange(updatedSteps);
  };

  const handleEditStep = index => {
    const editedStep = steps[index];
    setNewStep({
      name: editedStep.name,
      duration: editedStep.duration,
      ingredients: editedStep.ingredients,
    });
    setEditIndex(index);
    setOpen(true);
  };

  const handleDeleteStep = index => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
    onChange(updatedSteps);
  };

  return (
    <Box
      sx={{
        padding: "6px",
        border: "1px solid #ced4da",
        borderRadius: "4px",
        mb: 4,
        overflowX: "auto",
        maxWidth: "100%",
      }}
    >
      <Typography sx={{ textAlign: "center" }}>Etapas da receita</Typography>
      {steps.length > 0 ? (
        <RecipeStepsTable
          steps={steps}
          handleEditStep={handleEditStep}
          handleDeleteStep={handleDeleteStep}
        />
      ) : (
        <Typography sx={{ padding: 1 }} variant='subtitle1'>
          Sem etapas definidas
        </Typography>
      )}
      <Button
        variant='contained'
        color='secondary'
        onClick={handleOpenModal}
        sx={{ mb: 1, width: "100%" }}
      >
        Modificar as etapas da receita
      </Button>
      <RecipeStepsModal
        open={open}
        handleCloseModal={handleCloseModal}
        newStep={newStep}
        handleStepInputChange={handleStepInputChange}
        handleAddStep={handleAddStep}
      />
    </Box>
  );
};

RecipeSteps.propTypes = {
  steps: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RecipeSteps;
