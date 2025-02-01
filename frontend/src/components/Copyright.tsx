type CopyrightProps = {
  className?: string;
};

function Copyright({ className }: CopyrightProps) {
  return (
    <span className={className}>
      <small>&copy; Purrtrade</small>
    </span>
  );
}

export default Copyright;
