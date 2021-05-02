
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import './shared.styles.css';

interface props {
    rowsAndColumns: number;
    result: (data: any) => void;
}

export const Matriz: React.FC<props> = (props) => {
    
    const ticketNumbers = (value: number = 0) => {
        // @ts-ignore
        return [...Array(parseInt(props.rowsAndColumns || value)).keys()]
    }
    
    const style = {
        area: {
            gridTemplateColumns: `repeat(${Math.sqrt(props.rowsAndColumns)}, 1fr)`
        },
        buttonArea: {
            gridColumn: `1/${Math.sqrt(props.rowsAndColumns)+1}`
        }
    };

    const { register, formState: { errors }, handleSubmit } = useForm();
    const result = (data: any) => {
        const rows = Math.sqrt(props.rowsAndColumns ? props.rowsAndColumns : 4);
        data = listToMatrix(Object.values(data), rows);
        props.result(data);
    };

    const listToMatrix = (list: number[], row: number) => {
        let matrix: any = [], i, k;
    
        for (i = 0, k = -1; i < list.length; i++) {
            if (i % row === 0) {
                k++;
                matrix[k] = [];
            }
            matrix[k].push(list[i]);
        }
        return matrix;
    }
  
    return (
       <>
       <form onSubmit={handleSubmit(result)}>
            <div className="cell-container">
                <div className="cell" style={style.area}>
                {
                    ticketNumbers(4).map(i => (
                        <div key={i}>
                            <ErrorMessage errors={errors}
                                name={`input_${i}`}
                                render={
                                    ({ message }) => 
                                    <p className="input-value-error">
                                    {message}
                                    </p>
                                }
                            />

                            <input type="number"
                                placeholder="0"
                                className="form-control input-value"
                                {...register(`input_${i}`, { 
                                    required: 'Ingrese un valor',
                                    valueAsNumber: true,
                                    maxLength: 10
                                })}
                            />

                        </div>

                        
                    ))
                }

                <button className="btn btn-success w-100" type="submit"
                    style={style.buttonArea}>
                    Calcular
                </button>
          
                </div>
            </div>
        </form>
       </>
    )
}