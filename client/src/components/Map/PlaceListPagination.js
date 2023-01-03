//module

const PlaceListPagination = ({pagination})=>{
    const current = pagination.current;
    const pageNums = [];
    if (current.hasPrevPage) pageNums.push(current - 1);
    pageNums.push(current);
    if (current.hasNextPage) pageNums.push(current + 1);

    return (
        <ul>
            {pageNums.map(num=>{return <li keys={num}>{num}</li>})}
        </ul>
    )
}

export default PlaceListPagination
