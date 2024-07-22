

export const increment=()=>(
    {
        type:'increment'
    }
)


export const decrement=()=>(
    {
        type:'decrement'
    }
)

export const addtodo=(data)=>(
    {
        type:'addtodo',
        payload:data
    }
)

export const toggle=(id)=>(
    {
        type:'toggle',
        payload:id
    }
)

export const remove=(id)=>(
    {
        type:'remove',
        payload:id
    }
)

