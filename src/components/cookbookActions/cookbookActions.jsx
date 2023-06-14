import { useContext, useState } from "react";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import { CookbookContext } from "../../context/cookbookContext";
import {
  AddCircleOutline,
  EditOutlined,
  RemoveCircleOutline,
} from "@mui/icons-material";
import DeleteRecipeModal from "../deleteRecipeModal/deleteRecipeModal";
import EditRecipeModal from "../editRecipeModal/editRecipeModal";
import AddRecipeModal from "../addRecipeModal/addRecipeModal";

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

  const handleAddRecipe = () => {
    if (
      recipeData.title.trim() === "" ||
      recipeData.description.trim() === "" ||
      recipeData.author.trim() === "" ||
      recipeData.steps.length === 0
    ) {
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

      <AddRecipeModal
        open={addModalOpen}
        onClose={handleCloseAddModal}
        recipeData={recipeData}
        handleRecipeDataChange={handleRecipeDataChange}
        handleStepChange={handleStepChange}
        handleAddRecipe={handleAddRecipe}
        isDisabled={
          recipeData.title.trim() === "" ||
          recipeData.description.trim() === "" ||
          recipeData.author.trim() === "" ||
          recipeData.steps.length === 0
        }
      />

      <EditRecipeModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        cookbook={cookbook}
        selectedRecipeId={selectedRecipeId}
        handleRecipeSelectChange={handleRecipeSelectChange}
        recipeData={recipeData}
        handleRecipeDataChange={handleRecipeDataChange}
        handleStepChange={handleStepChange}
        handleEditRecipe={handleEditRecipe}
        isDisabled={
          selectedRecipeId === "" ||
          recipeData.title.trim() === "" ||
          recipeData.description.trim() === "" ||
          recipeData.author.trim() === "" ||
          recipeData.steps.length === 0
        }
      />

      <DeleteRecipeModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        cookbook={cookbook}
        selectedRecipeId={selectedRecipeId}
        handleRecipeSelectChange={handleRecipeSelectChange}
        recipeData={recipeData}
        handleDeleteRecipe={handleDeleteRecipe}
      />
    </>
  );
};

export default CookbookActions;
