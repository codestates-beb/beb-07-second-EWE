// css
import "../assets/css/dropdown.css";

const Dropdown = ({children, isDropdownview})=>{

    return (
        <ul 
            className="dropdown_wrapper" 
            style={isDropdownview? 
                {visibility:"visible"}:
                {visibility:"collapse"}
            }
        >
            {children.map((child, idx)=>{
                return (
                    <li key={idx} className="dropdown_item">
                        {child}
                    </li>
                )
            })}
        </ul>
    )
}

export default Dropdown;