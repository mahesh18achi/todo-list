

const initialState={
    count:0,
    todo:[]
}

export const counterReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'increment':
        return{
         ...state,count:state.count+1
        };
        case 'decrement':
            return{
                ...state,count:state.count-1
            };

  case 'addtodo':
    return{
        ...state,
        todo:[...state.todo,{id:Date.now(),text:action.payload,completed:false}]
    }

    case 'toggle':
        const updatedTodo = state.todo.map(todo =>
            todo.id === action.payload? { ...todo, completed: !todo.completed } : todo
          );
          return {
            ...state,
            todo: updatedTodo

        }

        case 'remove':
        const newTodo=state.todo.filter(todo=>todo.id!==action.payload)

        return{
         ...state,
         todo:newTodo

        }
         
        default:
            return{
                count:state.count,
                todo:[...state.todo]
            };

    }
};

