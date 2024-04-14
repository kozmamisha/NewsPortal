import { FC, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Container, Typography, Grid, Pagination } from '@mui/material';
import { toast } from 'react-toastify';

import NewsForm from '../components/NewsForm';
import NewsItem from '../components/NewsItem';
import { ICategory, INews, IResponseNewsLoader } from '../types/types';
import { instance } from '../api/axios.api';

export const newsLoader = async () => {
  const categories = await instance.get<ICategory[]>('/categories');
  const news = await instance.get('/news');

  const data = {
    categories: categories.data,
    news: news.data,
  };
  return data;
};

export const newsAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const newNews = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
      };

      await instance.post('/news', newNews);
      toast.success('A new was added!');
      return null;
    }

    case 'DELETE': {
      const formData = await request.formData();
      const newsId = formData.get('id');
      await instance.delete(`/news/news/${newsId}`);
      toast.success('This new deleted!');
      return null;
    }

    default:
      break;
  }
};

interface INewsPagination {
  limit: number;
}

const News: FC<INewsPagination> = ({ limit = 4 }) => {
  const { news } = useLoaderData() as IResponseNewsLoader;

  const [data, setData] = useState<INews[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchNews = async (page: number) => {
    const response = await instance.get(`/news/pagination?page=${page}&limit=${limit}`);
    setData(response.data);
    setTotalPages(Math.ceil(news.length / limit));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, news]);

  return (
    <Container maxWidth="md">
      <NewsForm />
      <Typography mt={4} variant="h4" gutterBottom>
        Your News
      </Typography>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        size="large"
        sx={{ mb: 3 }}
      />
      <Grid container spacing={2} mb={10}>
        <NewsItem data={data} />
      </Grid>
    </Container>
  );
};

export default News;
