import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";

const RecipeStepRow = ({ index, step, handleEditStep, handleDeleteStep }) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{step.name}</TableCell>
      <TableCell>{step.duration}</TableCell>
      <TableCell>{step.ingredients}</TableCell>
      <TableCell>
        <IconButton aria-label='edit' size='small' onClick={handleEditStep}>
          <EditOutlined />
        </IconButton>
        <IconButton aria-label='delete' size='small' onClick={handleDeleteStep}>
          <DeleteOutlineOutlined />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

RecipeStepRow.propTypes = {
  index: PropTypes.number.isRequired,
  step: PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
  }).isRequired,
  handleEditStep: PropTypes.func.isRequired,
  handleDeleteStep: PropTypes.func.isRequired,
};

export default RecipeStepRow;
