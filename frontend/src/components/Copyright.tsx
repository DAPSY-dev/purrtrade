type CopyrightProps = {
  className?: string;
};

function Copyright({ className }: CopyrightProps) {
  return (
    <span className={className}>
      <small>&copy; {import.meta.env.VITE_APP_NAME}</small>
    </span>
  );
}

export default Copyright;
