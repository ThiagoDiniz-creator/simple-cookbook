import { useContext, useState } from "react";
import {
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import { CookbookContext } from "../../context/cookbookContext";
import RecipeSteps from "../recipeSteps/recipeSteps";
import {
  AddCircleOutline,
  EditNotificationsOutlined,
  EditOutlined,
  RemoveCircleOutline,
} from "@mui/icons-material";

const CookbookActions = () => {
  const { cookbook, setCookbook } = useContext(CookbookContext);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [recipeData, setRecipeData] = useState({
    id: "",
    title: "",
    description: "",
    author: "",
    steps: [],
  });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    setRecipeData({
      id: "",
      title: "",
      description: "",
      author: "",
      steps: [],
    });
  };

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedRecipeId("");
    setRecipeData({
      id: "",
      title: "",
      description: "",
      author: "",
      steps: [],
    });
  };

  const handleOpenDeleteModal = () => {
    setRecipeData({
      id: "",
      title: "",
      description: "",
      author: "",
      steps: [],
    });
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setRecipeData({
      id: "",
      title: "",
      description: "",
      author: "",
      steps: [],
    });
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleAddRecipe = () => {
    if (
      recipeData.title.trim() === "" ||
      recipeData.description.trim() === "" ||
      recipeData.author.trim() === "" ||
      recipeData.steps.length === 0
    ) {
      setIsSnackbarOpen(true);
      return;
    }

    const newRecipeId = Math.max(...cookbook.map(recipe => recipe.id)) + 1;

    const newRecipe = {
      id: newRecipeId,
      title: recipeData.title,
      description: recipeData.description,
      author: recipeData.author,
      steps: recipeData.steps,
    };

    setCookbook(prevCookbook => [...prevCookbook, newRecipe]);
    handleCloseAddModal();
  };

  const handleEditRecipe = () => {
    if (
      selectedRecipeId === "" ||
      recipeData.title.trim() === "" ||
      recipeData.description.trim() === "" ||
      recipeData.author.trim() === "" ||
      recipeData.steps.length === 0
    ) {
      setIsSnackbarOpen(true);
      return;
    }

    const updatedCookbook = cookbook.map(recipe =>
      recipe.id === selectedRecipeId
        ? { ...recipeData, steps: recipeData.steps }
        : recipe
    );
    setCookbook(updatedCookbook);
    handleCloseEditModal();
  };

  const handleDeleteRecipe = () => {
    if (recipeData.id === "") {
      setIsSnackbarOpen(true);
      return;
    }

    const updatedCookbook = cookbook.filter(
      recipe => recipe.id !== recipeData.id
    );
    setCookbook(updatedCookbook);
    handleCloseDeleteModal();
  };

  const handleRecipeSelectChange = event => {
    const selectedId = event.target.value;
    const selectedRecipe = cookbook.find(recipe => recipe.id === selectedId);
    setSelectedRecipeId(selectedId);
    setRecipeData(selectedRecipe);
  };

  const handleRecipeDataChange = event => {
    setRecipeData({
      ...recipeData,
      [event.target.name]: event.target.value,
    });
  };

  const handleStepChange = updatedSteps => {
    setRecipeData(prevRecipeData => ({
      ...prevRecipeData,
      steps: updatedSteps,
    }));
  };

  return (
    <>
      <SpeedDial
        ariaLabel='Ações'
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<AddCircleOutline />}
          tooltipTitle='Adicionar receita'
          onClick={handleOpenAddModal}
        />
        <SpeedDialAction
          icon={<EditOutlined />}
          tooltipTitle='Alterar receita'
          onClick={handleOpenEditModal}
        />
        <SpeedDialAction
          icon={<RemoveCircleOutline />}
          tooltipTitle='Excluir receita'
          onClick={handleOpenDeleteModal}
        />
      </SpeedDial>

      <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            maxHeight: "90vh",
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
            disabled={
              recipeData.title.trim() === "" ||
              recipeData.description.trim() === "" ||
              recipeData.author.trim() === "" ||
              recipeData.steps.length === 0
            }
          >
            Confirmar Adição
          </Button>
        </Box>
      </Modal>

      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
          <Typography variant='h5' gutterBottom>
            Editar Receita
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
            disabled={
              selectedRecipeId === "" ||
              recipeData.title.trim() === "" ||
              recipeData.description.trim() === "" ||
              recipeData.author.trim() === "" ||
              recipeData.steps.length === 0
            }
          >
            Confirmar Edição
          </Button>
        </Box>
      </Modal>

      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Typography variant='h5' gutterBottom>
            Excluir Receita
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

      <Snackbar
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
        message='Preencha todos os campos'
      />
    </>
  );
};

export default CookbookActions;
