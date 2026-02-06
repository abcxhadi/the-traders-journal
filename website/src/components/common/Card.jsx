const Card = ({ children, className = "", rotation = 0 }) => {
  const classes = `torn-card p-8 ${className} rotate-${rotation}`;
  return <div className={classes}>{children}</div>;
};

export default Card;