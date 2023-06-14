import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import RecipeStepsRow from "../recipeStepsRow/recipeStepsRow";

const RecipeStepsTable = ({ steps, handleEditStep, handleDeleteStep }) => {
  return (
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
            <RecipeStepsRow
              key={index}
              index={index}
              step={step}
              handleEditStep={() => handleEditStep(index)}
              handleDeleteStep={() => handleDeleteStep(index)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

RecipeStepsTable.propTypes = {
  steps: PropTypes.array.isRequired,
  handleEditStep: PropTypes.func.isRequired,
  handleDeleteStep: PropTypes.func.isRequired,
};

export default RecipeStepsTable;
