import React, { useState } from 'react'
import styles from './CheckBox.module.css'
import Image from 'next/image'

type Props = {
  title?: string,
  defaultChecked?: boolean,
  disabled?: boolean,
  onChange: (value: boolean) => void
}

export default function  CheckBox({title, defaultChecked, disabled, onChange}: Props) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleClick = () => {
    if (!disabled) {
      setChecked(!checked);
      if (onChange) {
        onChange(!checked);
      }
    }
  };

  return (
    <div className={`${styles.checkboxWrapper} ${disabled ? styles.disabled : ''}`}>
      <div
        className={`${styles.customCheckbox} ${checked ? styles.checked : ''}`}
        onClick={handleClick}
      >
        {checked && (
          <Image
            src="checkBox.svg" // Укажите путь к вашей SVG
            alt="Check icon"
            width={10}
            height={10}
          />
        )}
      </div>
      {title && (
        <span className={styles.checkboxTitle} onClick={handleClick}>
          {title}
        </span>
      )}
    </div>
  );
}
