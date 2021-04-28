import REACT, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { debounceTime } from 'rxjs/operators';
import { ErrorMessage } from '@hookform/error-message';
import './deterninantes.css';

export const Determinante = () => {

  // const onSearch$ = new rxjs.Subject().pipe(
  //   debounceTime(300)
  // );

  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  let watchRows = watch('rowsAndColumns');

  const ticketNumbers = (value: number = 0) => {
    // @ts-ignore
    return [...Array(parseInt(watchRows || value)).keys()]
  }

  const [ value, setValue ] = useState([{}]);

  const verifyValue = (event: React.FormEvent<HTMLInputElement>): any => {
    setValue([
      {
        ...value,
        [event.currentTarget.name]: event.currentTarget.value
      }
    ]);
  }

  const calculateResult = (data: any) => {
    console.log(data);
  }
  
  return (
    <div className="container">
      <h1>Derminantes</h1>  
      <form action="" className="row mt-3"
        onSubmit={handleSubmit(calculateResult)}>

        <div className="col-6">
          <select {...register('rowsAndColumns')} className="form-select">
            {[2,3,4,5].map(i => 
                <option key={i} value={i*i}>
                  {i}x{i}
                </option>
            )}
          </select>
          <hr/>
          <button className="btn btn-success w-100" type="submit">
            Calcular
          </button>
        </div>

        <div className="col-6 cell">
          {
            ticketNumbers(4).map(i => (
              <div key={i}
              className={watchRows ? 'col-'+(12/(Math.ceil(watchRows/2))).toString() : 'col-6'}>
                <input type="number"
                  placeholder="0"
                  className="form-control input-value"
                  {...register(`input_${i}`, { 
                    required: 'Ingrese un valor',
                    valueAsNumber: true
                  })}
                  onChange={verifyValue}/>

                  <ErrorMessage errors={errors}
                    name={`input_${i}`}
                    render={
                      ({ message }) => 
                      <p className="alert alert-danger">
                        {message}
                      </p>
                    }
                  />
              </div>
            ))
          }
        </div>
      </form>
    </div>
  )
}

