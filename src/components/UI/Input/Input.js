import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
	let inputElement = null;
	let errorMessage = null;
	const inputClasses = [classes.InputElement];

	if (props.inValid && props.touched) {
		inputClasses.push(classes.Invalid)
		 errorMessage = <p>Please enter a valid {props.elementConfig.placeholder} </p>
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig} // very interesting!!!
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'checkbox':
			inputElement = (
				<div>
					<input
						className={inputClasses.join(' ')}
						value={props.value}
						onChange={props.changed}
					/> 
					{props.elementConfig.options.map(option => (
						 <label key={option.id} for={option.id}>{option.displayValue}</label>
					))}
				</div>
			);
			break;	
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			); // selfclosing element in React
			break;
		case 'select':
			inputElement = ( // or maybe just: classes.InputElement
				<select className={classes.InputElement} value={props.value} onChange={props.changed}>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} defaultValue={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')} 
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
			{errorMessage}
		</div>
	);
};

export default input;
