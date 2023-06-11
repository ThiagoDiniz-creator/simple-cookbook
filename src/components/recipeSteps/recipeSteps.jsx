import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { array, func } from "prop-types";

const RecipeSteps = ({ steps: propsSteps, onChange }) => {
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState(propsSteps);
  const [newStep, setNewStep] = useState({
    name: "",
    duration: "",
    ingredients: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setSteps(propsSteps);
  }, [propsSteps]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 320);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Etapa</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Duração</TableCell>
                <TableCell>Ingredientes</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {steps.map((step, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{step.name}</TableCell>
                  <TableCell>{step.duration}</TableCell>
                  <TableCell>{step.ingredients}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label='edit'
                      size='small'
                      onClick={() => handleEditStep(index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label='delete'
                      size='small'
                      onClick={() => handleDeleteStep(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant='subtitle1'>Sem etapas definidas</Typography>
      )}
      <Button
        variant='contained'
        color='secondary'
        onClick={handleOpenModal}
        sx={{ mb: 1, width: "100%" }}
      >
        Modificar as etapas da receita
      </Button>
      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={
            isSmallScreen
              ? {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 2,
                  overflowY: "scroll",
                  maxHeight: "90vh",
                }
              : {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }
          }
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
            <AddIcon />
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
    </Box>
  );
};

RecipeSteps.propTypes = {
  steps: array,
  onChange: func,
};

export default RecipeSteps;
