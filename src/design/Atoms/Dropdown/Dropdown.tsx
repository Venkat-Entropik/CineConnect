import React, { FC } from "react";
import Select, {
  MultiValue,
  SingleValue,
  MenuPlacement,
  StylesConfig,
  GroupBase,
  OptionProps,
  SingleValueProps,
  DropdownIndicatorProps,
} from "react-select";

export interface DropdownOption {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  isMulti?: boolean;
  isSearchable?: boolean;
  className?: string;
  placeholder?: string;
  value?: MultiValue<DropdownOption> | SingleValue<DropdownOption>;
  onChange?: (value: MultiValue<DropdownOption> | SingleValue<DropdownOption>) => void;
  size?: string;
  getOptionLabel?: (option: DropdownOption) => string;
  getOptionValue?: (option: DropdownOption) => string;
  customComponents?: {
    Option?: React.ComponentType<OptionProps<DropdownOption, boolean, GroupBase<DropdownOption>>>;
    SingleValue?: React.ComponentType<
      SingleValueProps<DropdownOption, boolean, GroupBase<DropdownOption>>
    >;
    DropdownIndicator?: React.ComponentType<
      DropdownIndicatorProps<DropdownOption, boolean, GroupBase<DropdownOption>>
    >;
  };
  hideSelectedOptions?: boolean;
  isClearable?: boolean;
  closeMenuOnSelect?: boolean;
  styles?: StylesConfig<DropdownOption, boolean, GroupBase<DropdownOption>>;
  disabled?: boolean;
  menuPlacement?: MenuPlacement;
  isFormControl?: boolean;
}

const Dropdown: FC<DropdownProps> = ({
  options,
  isMulti,
  isClearable,
  isSearchable,
  placeholder,
  value,
  getOptionLabel,
  getOptionValue,
  hideSelectedOptions,
  closeMenuOnSelect,
  className,
  onChange,
  styles,
  menuPlacement,
  ...rest
}) => {
  return (
    <Select
      options={options}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isMulti={isMulti}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      value={value}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      hideSelectedOptions={hideSelectedOptions}
      closeMenuOnScroll={closeMenuOnSelect}
      menuPlacement={menuPlacement}
      styles={styles}
      {...rest}
    />
  );
};

Dropdown.defaultProps = {
  options: [],
  isMulti: false,
  isSearchable: false,
  placeholder: "Select...",
  value: null,
  onChange: () => {},
  getOptionLabel: (option: DropdownOption) => option.label,
  getOptionValue: (option: DropdownOption) => String(option.value),
  hideSelectedOptions: false,
  isClearable: false,
  closeMenuOnSelect: true,
  className: "",
  isFormControl: false,
};

export default Dropdown;
