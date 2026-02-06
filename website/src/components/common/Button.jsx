const Button = ({
  onClick,
  children,
  className = "",
  disabled = false,
  variant = "primary",
}) => {
  const baseClasses = "px-6 py-3 font-bold";
  const variants = {
    primary: "btn-marker",
    secondary: "btn-secondary",
    green: "btn-green",
  };

  const classes = `${baseClasses} ${
    variants[variant]
  } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;