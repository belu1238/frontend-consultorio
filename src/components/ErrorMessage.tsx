export default function ErrorMessage({children} : {children: React.ReactNode}) {
    return ( 
        <div className="bg-red-100 text-center text-red-600 uppercase font-bold p-3 text-sm">
            {children}
        </div>
    );
}