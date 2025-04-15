import React from 'react';


type IconPropsType = {
    iconId?: string
    width?: string
    heigth?: string
    viewBox?: string
    fill?: string
}

export const Icon = (props: IconPropsType) =>{
    return(
        <svg width={props.width || "100"}   height={props.heigth ||"100" } viewBox={props.viewBox ||"0 0 100 100"} fill={props.fill} style ={{color:'green'}}xmlns="http://www.w3.org/2000/svg">
            <use href = {`/icons-spite.svg#${props.iconId}`}/>
        </svg>
    )
}