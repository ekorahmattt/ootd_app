function Garment(props: {fileName: string}){

    return (
        <div className="card w-1/4 hover:border-4 hover:border-blue-500">
            <figure>
                <img src={`/img/${props.fileName}.jpg`} alt="tshirt" className="rounded-t-2xl" />
            </figure>
         </div>
    )
}

export default Garment