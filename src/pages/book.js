import React from "react";


const Book = (props) =>{
    return(
        <div className="card">
<a href={"book/" + props.link}>
<img className="cardImg" src={props.img} alt="" />
          <br />
          <p>Read ME<br /> {props.ID}</p>
        </a>
      </div>

    );
}

export default Book