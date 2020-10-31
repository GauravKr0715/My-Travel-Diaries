import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/formStyle.css";

import { createLogEntryNew } from './API';

const LogEntryForm = ({ token, location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntryNew(data, token);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="card box_shw2 border-0 px-3 rounded-2 mb-1 w_500 py-4 mx-auto mt-1">
    <div className="card-header bg-white f_20_22 border-0 text-center">Add A New Entry</div>
    <div className="card-body">
       {error}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="position-relative form-group">
          <input name="title" type="text" className="text-field form-control mb-3 bg_grey border-0 py-3" placeholder="Title" required ref={register}/>
        </div>
        <div className="position-relative form-group">
          <input name="description" type="text" className="text-field form-control mb-3 bg_grey border-0 py-1" placeholder="Description" required ref={register}  />
        </div>
        <div className="position-relative form-group">
          <input name="image" type="text" className="text-field form-control mb-3 bg_grey border-0 py-1" placeholder="Image URL" ref={register} />
        </div>
            <div className="position-relative form-group">
          <input name="rating" type="number" className="text-field form-control mb-3 bg_grey border-0 py-1" placeholder="Rating" min="1" max="5" required ref={register} />
        </div>
          <div className="position-relative form-group">
          <input name="visitDate" type="date" className="text-field form-control mb-3 bg_grey border-0 py-1" placeholder="Visit Date"  required ref={register}/>
        </div>
          <p className="text-center mb-0">
            <button disabled={loading} className="btn btn-primary px-5 text-uppercase py-3 f_12_14 border-0 d-inline-block">{loading ? 'Loading...' : 'Create Entry'}</button>
            </p>
      </form>
      
    </div>
  </div>
  );

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
  //     { error ? <h3 className="error">{error}</h3> : null}
  //     <label htmlFor="title">Title</label>
  //     <input name="title" required ref={register} />
  //     <label htmlFor="description">Description</label>
  //     <textarea name="description" rows={3} ref={register}></textarea>
  //     <label htmlFor="image">Image</label>
  //     <input name="image" ref={register} />
  //     <label htmlFor="rating">Rating</label>
  //     <input type="number" name="rating" required ref={register} />
  //     <label htmlFor="visitDate">Visit Date</label>
  //     <input name="visitDate" type="date" required ref={register} />
  //     <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
  //   </form>
  // );
};

export default LogEntryForm;