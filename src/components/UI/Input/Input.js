import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
	let inputElement = null;

	/* And now to handle the case that we also have different attributes, 
    I expect to get the attributes I
    want to set on input as {...props} for our input wrapper.
    This then allows me to simply distribute them on the input element.
    So for any default html attributes I want to set on my input,
    I will only need to set the 'inputtype' prop 
    and then pass the normal attributes */
	switch (props.elementType) {
		case ('input'):
			inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} />;
			break;
		case ('textarea'):
			inputElement = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value} />; // selfclosing element in React
			break;
		case ('select'):
			inputElement = <select className={classes.InputElement} value={props.value}> 
					{props.elementConfig.options.map(option => (
						<option key={option.value} defaultValue={option.value}>{option.displayValue}</option>
					))}
				</select> ; 
			break;
		default:
			inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} />;
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default input;
