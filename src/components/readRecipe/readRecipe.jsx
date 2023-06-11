import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TimerIcon from "@mui/icons-material/Timer";

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    transition: "opacity 0.3s ease-in-out",
    borderRadius: "8px",
    overflowY: "scroll",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timerContainer: {
    display: "flex",
    alignItems: "center",
    mt: 2,
    borderTop: "1px solid #ccc",
    paddingTop: 2,
  },
};

const ReadRecipe = ({ recipe, onClose }) => {
  const [open, setOpen] = useState(true);
  const [contentVisible, setContentVisible] = useState(true);

  const handleCloseModal = () => {
    onClose();
    setContentVisible(false);
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  const calcularTempoTotal = () => {
    let tempoTotal = 0;
    recipe.steps.forEach(step => {
      if (step.duration && isNaN(step.duration.split()[0])) {
        tempoTotal += parseInt(step.duration.split()[0]);
      }
    });
    return tempoTotal;
  };

  const tempoTotal = calcularTempoTotal();

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={styles.modal}>
        {contentVisible && (
          <>
            <Box sx={styles.header}>
              <Typography variant='h5' gutterBottom>
                {recipe.title}
              </Typography>
              <IconButton
                aria-label='close'
                onClick={handleCloseModal}
                sx={{ ml: 1 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant='subtitle1'>Autor: {recipe.author}</Typography>
            <Typography variant='subtitle1'>
              Descrição: {recipe.description}
            </Typography>
            <Box sx={styles.timerContainer}>
              <TimerIcon sx={{ mr: 1, color: "#888" }} />
              <Typography variant='subtitle1'>
                Tempo Total: {tempoTotal} minutos
              </Typography>
            </Box>
            <TableContainer sx={{ marginTop: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Etapa</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Duração</TableCell>
                    <TableCell>Ingredientes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipe.steps.map((step, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{step.name}</TableCell>
                      <TableCell>{step.duration}</TableCell>
                      <TableCell>{step.ingredients}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Modal>
  );
};

ReadRecipe.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        ingredients: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReadRecipe;
