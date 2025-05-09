interface Props {
    name:string,
    onClick: () => void
}

const Dropdown = ({
    data
}:{
    data:Props[]
}) => {
    return (
        <div className=" absolute top-3 right-0 mt-2 w-20 bg-white border border-gray-200 rounded shadow-lg z-10 text-center">
            <ul className="py-1 text-sm text-gray-700">
                {data.map(({
                    name, onClick
                }, i:number) => (
                <li key={`dropdown-${name}-${i}`}>
                    <button key={`dropdown-${i}`} className="block w-full px-4 py-2 hover:bg-gray-100" onClick={onClick}>{name}</button>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Dropdown;