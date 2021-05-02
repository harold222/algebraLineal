import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Matriz } from '../shared/Matriz';
import { Loading } from '../shared/utils/Loading';

export const Determinante = () => {

  const { register, watch } = useForm();
  let watchRows = watch('rowsAndColumns');

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number>();

  const calculateResult = (data: any) => {
    if(!data) return;
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setResult(determinant(data));
    }, 1500);
    
  };

  const determinant = (matriz: number[][]): number => {
    let result = 0;  

    if (matriz.length == 1) return matriz[0][0];
    else{
      for (let j = 0; j < matriz.length; j++) {
        result = result + matriz[0][j] * coofactor(matriz, 0, j);
      }
    }
    
    return result;
  }

  const coofactor = (matriz: number[][], row: number, column: number): number => {
    let subMatriz: number[][] = [];

    for(let i = 0; i < matriz.length-1; i++) {
      subMatriz[i] = new Array(matriz.length-1);
    }

    let n = matriz.length - 1,
        x = 0, y= 0;

    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz.length; j++) {
        if(i != row && j != column){
          subMatriz[x][y] = matriz[i][j];
          y++;
          if (y >= n) {
            x++;
            y = 0;
          }
        }
      }
    }
    return Math.pow(-1.0, row + column) * determinant(subMatriz);
  };
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h2>¡Derminante por coofactores!</h2>
          <select {...register('rowsAndColumns')} className="form-select">
            {[2,3,4,5,6,7].map(i => 
                <option key={i} value={i*i}>
                  {i}x{i}
                </option>
            )}
          </select>
          
          {result && 
            <div className="container-fluid">
              <hr/>
              <p className="alert alert-success text-center">
                El resultado es: <strong>{result}</strong>
              </p>
            </div>
          }

        </div>

        <div className="col-12  col-md-7">
          <Matriz rowsAndColumns={(watchRows) ? watchRows : 4} result={calculateResult} />
        </div>

        {loading && <Loading/>}
      </div>
    </div>
  )
}