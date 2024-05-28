import React from 'react'
import styles from '../styles.module.css'
import PropTypes from 'prop-types'
import { getRegExp, getSentenceFromCamelCase } from './Helpers'

const Radio = ({
  checked,
  disabled,
  error,
  fixLength,
  required,
  label,
  minLength,
  maxLength,
  name,
  onChange,
  data,
  reqType,
  validationHandler,
  value,
  size,
  labelClassName,
  filter
}) => {
  const onChangeHandler = (event) => {
    const { name, value, type, checked } = event.target
    const inputValue = type === 'checkbox' ? checked : value
    // Convert the inputValue to a boolean if it's a checkbox
    const finalValue = type === 'checkbox' ? Boolean(inputValue) : inputValue
    onChange && onChange(name, finalValue)
  }

  const onValidationChange = (event) => {
    if (!validationHandler) return
    const { value } = event.target
    let errorMessage = ''
    if (!value && required) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`
    } else if (minLength && value.length < minLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be at least ${minLength} characters long.`
    } else if (maxLength && value.length > maxLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be ${minLength} characters long.`
    } else if (fixLength && value.length !== fixLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be ${fixLength} characters.`
    } else if (value && reqType && !getRegExp(reqType).test(value)) {
      errorMessage = `Please enter valid ${getSentenceFromCamelCase(name)}.`
    }
    validationHandler(name, errorMessage)
  }
  return (
    <div className={`${styles.radioFlex} ${styles[size]}`}>
      <label htmlFor={name} className={labelClassName}>
        {label}
        {required && <span className={styles.required}>&nbsp;*</span>}
        {error ? (
          <span className={`${styles.required} ${styles.textSmall}`}>
            {error}
          </span>
        ) : null}
      </label>
      <div className={styles.Radiooptions}>
        {data.map((item, i) => (
          <span key={i}>
            <input
              id={name[i]}
              type='radio'
              onChange={onChangeHandler}
              value={filter ? item[filter] : item.value}
              name={name}
              // defaultChecked={value === item.value}
              checked={filter ? value === item[filter] : value === item.value}
              required={required}
              onBlur={onValidationChange}
              disabled={disabled}
            />
            {filter ? item[filter] : item.value}
          </span>
        ))}
      </div>
    </div>
  )
}

Radio.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  error: '',
  fixLength: 0,
  required: false,
  label: '',
  minLength: 0,
  maxLength: 0,
  placeholder: '',
  reqType: '',
  style: {},
  type: 'text',
  validationHandler: () => {},
  size: 'medium',
  labelClassName: styles.labelBlack,
  value: '',
  data: [],
  filter: ''
}

Radio.propTypes = {
  filter: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  fixLength: PropTypes.number,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  reqType: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  validationHandler: PropTypes.func,
  value: PropTypes.any.isRequired,
  size: PropTypes.string,
  labelClassName: PropTypes.string,
  data: PropTypes.array
}

export default Radio
