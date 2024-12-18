import { Chip, Box } from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

export default function FiltersButtons({ items, checked, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState<string[]>(checked || []);

  // Funkcija za rukovanje selektovanjem/odabiranjem chip-ova
  const handleChipClick = (value: string) => {
    const currentIndex = checkedItems.findIndex(item => item === value);
    let newChecked: string[] = [];
    
    if (currentIndex === -1) {
      // Dodaj stavku ako nije već selektovana
      newChecked = [...checkedItems, value];
    } else {
      // Ukloni stavku ako je već selektovana
      newChecked = checkedItems.filter(item => item !== value);
    }

    setCheckedItems(newChecked);
    onChange(newChecked);  // Poziv funkcije za obaveštavanje roditeljske komponente
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        gap: 3,
        overflow: "auto",
        mb:2
      }}
    >
      {items.map((name, index) => (
        <Chip
          key={index}
          onClick={() => handleChipClick(name)}
          size="medium"
          label={name}
          sx={{
            backgroundColor: checkedItems.indexOf(name) !== -1 ? "background.paper" : "transparent", // Promeni boju kad je selektovan
            border: "none",
            cursor: "pointer",
          }}
        />
      ))}
    </Box>
  );
}

