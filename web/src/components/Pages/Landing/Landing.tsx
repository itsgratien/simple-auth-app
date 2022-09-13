import React from 'react';
import style from './Landing.module.scss';
import classname from 'classnames';
import { useFormik } from 'formik';
import axios from 'src/utils/AxiosSetup';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const Landing = () => {
  const navigate = useNavigate();
  const mutation = useMutation(async (values: any)=> axios.post('/users/login', values, {withCredentials: true}));

  const { error, data }: any = mutation;

  const formik = useFormik({initialValues: {username: '', password: ''}, onSubmit: async (values)=> {
    await mutation.mutate(values);
  }});

  const { values } = formik;

  React.useEffect(()=> {
    if(error && error.response){
     console.log('error', error.response.data);
    }
  }, [error])

  React.useEffect(()=> {
    if(data){
      navigate('/me');
    }
  }, [data]);

  console.log('data', Cookie.get('data'));

  return (
    <div
      className={classname(
        'relative flex items-center justify-center flex-col pt-10',
        style.landing,
      )}
    >
      <form action="" onSubmit={formik.handleSubmit}>
        <input type="text" placeholder='username' name='username' value={values.username} onChange={formik.handleChange}/>
        <input type="password" placeholder='password' name='password' value={values.password} onChange={formik.handleChange}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Landing;
