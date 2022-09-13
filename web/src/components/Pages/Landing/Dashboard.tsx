import React from 'react';
import style from './Landing.module.scss';
import classname from 'classnames';
import axios from 'src/utils/AxiosSetup';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

  const query = useQuery(['me'], async ()=> {
    return axios.get('/users/me');
  });

  const logoutMutation = useMutation(async ()=> axios.post('/users/logout'));

  const { error, data }: any = query;

  const handleLogout = ()=> {
    logoutMutation.mutateAsync();
  }

  React.useEffect(()=> {
    if(error && error.response){
     console.log('error', error.response.data);
    }
  }, [error])

  React.useEffect(()=> {
    if(logoutMutation.data){
        navigate('/');
    }
  }, [logoutMutation])

  return (
    <div
      className={classname(
        'relative flex items-center justify-center flex-col pt-10',
        style.landing,
      )}
    >
      {data && data.data && <h1>Welcome {data.data.data.username}</h1>}
      <button type='button' className='bg-black text-white rounded outline-none focus:outline-none p-3 mt-5' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
