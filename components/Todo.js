export function Todo ({bg,border,children}) {

    return (
        <p 
        className={`flex justify-between text-gray-200 text-xl bg-${bg}-600 border-2 border-${border}-500 p-4`}>
          {children}
        </p>
    )
}

