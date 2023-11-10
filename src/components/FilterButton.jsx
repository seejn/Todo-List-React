import React from "react";
export default function (props) {
    /*
        FilterButton component

        parameter:
            props: all properties pass on to <FilterButton /> component
        returns:
            template: template of filter button    
    */
    return (
        <button
            type='button'
            className='btn toggle-btn'
            aria-pressed={props.isPressed}
            // onClick setFilter state to passed on name
            onClick={() => props.setFilter(props.name)}>
            <span className='visually-hidden'>Show </span>
            <span>{props.name}</span>
            <span className='visually-hidden'> tasks</span>
        </button>
    );
}
