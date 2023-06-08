import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const MemoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [memo, setMemo] = useState(null);
  const [content, setContent] = useState('');

  const fetchMemo = async () => {
    const response = await axios.get(`http://localhost:4000/memo/${id}`);
    setMemo(response.data);
    setContent(response.data.content);
  };

  const updateMemo = async () => {
    await axios.put(`http://localhost:4000/memo/${id}`, { content });
    fetchMemo();
  };

  const deleteMemo = async () => {
    await axios.delete(`http://localhost:4000/memo/${id}`);
    router.push('/');
  };

  useEffect(() => {
    if (id) {
      fetchMemo();
    }
  }, [id]);

  if (!memo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Memo {memo.id}</h1>
      <TextField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        size='small'
      />
      <Button onClick={updateMemo} variant='contained' color='success' sx={{mx: 2}}>Update Memo</Button>
      <Button onClick={deleteMemo} variant='contained' color='error'>Delete Memo</Button>
    </div>
  );
};

export default MemoPage;