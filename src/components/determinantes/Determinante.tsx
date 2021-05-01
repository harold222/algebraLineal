import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Matriz } from '../shared/Matriz';
import { Loading } from '../shared/utils/Loading';

export const Determinante = () => {

  const { register, watch } = useForm();
  let watchRows = watch('rowsAndColumns');

  const [loading, setLoading] = useState(false);

  const calculateResult = (data: any) => {
    setLoading(true);
    console.log(data);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-5">
          <h1>¡Hallar derminante!</h1>
          <hr/>
          <select {...register('rowsAndColumns')} className="form-select">
            {[2,3,4,5,6].map(i => 
                <option key={i} value={i*i}>
                  {i}x{i}
                </option>
            )}
          </select>
        </div>

        <div className="col-7">
          <Matriz rowsAndColumns={(watchRows) ? watchRows : 4} result={calculateResult} />
        </div>

        {loading && <Loading/>}

      </div>
    </div>
  )

}

