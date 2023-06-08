import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Box, Button, List, ListItem, ListItemText, TextField } from "@mui/material";

const IndexPage = () => {
  const [memos, setMemos] = useState([]);
  const [content, setContent] = useState("");

  const fetchMemos = async () => {
    const response = await axios.get("http://localhost:4000/memo");
    setMemos(response.data);
  };

  const createMemo = async () => {
    await axios.post("http://localhost:4000/memo", { content });
    fetchMemos();
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  return (
    <div>
      <h1>Memos</h1>
      <Box display='flex' gap={2}>
        <TextField
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          size="small"
          placeholder="メモを記入して"
        />
        <Button onClick={createMemo} variant="contained">メモの作成</Button>
      </Box>
      <List>
        {memos.map((memo) => (
          <ListItem key={memo.id} button component={Link} href={`/memo/${memo.id}`} sx={{ backgroundColor: "#DFF2FC", my: 2}}>
            <ListItemText primary={memo.content} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default IndexPage;
