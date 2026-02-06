const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) => {
  const classes = `w-full px-4 py-3 ink-bleed font-mono text-lg ${className}`;
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={classes}
    />
  );
};

export default Input;