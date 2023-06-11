import { useState, useContext } from "react";
import { CookbookContext } from "../../context/cookbookContext";
import { Card, CardContent, Typography, TextField, Grid } from "@mui/material";
import ReadRecipe from "../readRecipe/readRecipe";

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    margin: 0,
    padding: 0,
    "&:hover": {
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      transform: "scale(1.02)",
      cursor: "pointer",
    },
  },
  cardTitle: {
    marginBottom: "1rem",
  },
  cardDescription: {
    marginTop: "1rem",
  },
  cardAuthor: {
    marginTop: "2rem",
  },
};

const Cookbook = () => {
  const { cookbook } = useContext(CookbookContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredCookbook = cookbook.filter(
    recipe =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleRecipeClick = recipe => {
    setSelectedRecipe(recipe);
  };

  return (
    <div
      style={{
        maxWidth: "100vw",
        maxHeight: "90vh",
        height: "90vh",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <TextField
        label='Pesquisar receitas por nome, descrição ou autor'
        variant='outlined'
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        sx={{ mb: 2, width: "80vw" }}
      />
      <Grid container spacing={2}>
        {filteredCookbook.map(recipe => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id} sx={{ padding: 0 }}>
            <Card sx={styles.card} onClick={() => handleRecipeClick(recipe)}>
              <CardContent>
                <Typography variant='h6' component='div' sx={styles.cardTitle}>
                  {recipe.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={styles.cardDescription}
                >
                  {recipe.description}
                </Typography>
                <Typography variant='caption' sx={styles.cardAuthor}>
                  Por {recipe.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedRecipe && (
        <ReadRecipe
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default Cookbook;
