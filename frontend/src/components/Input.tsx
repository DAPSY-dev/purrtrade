import { useId, InputHTMLAttributes } from "react";
import { classNames } from "@/utils/helpers";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "search"
    | "number"
    | "url"
    | "date"
    | "datetime-local"
    | "month"
    | "week"
    | "time"
    | "tel"
    | "hidden";
  id?: string;
  className?: string;
};

function Input({ label, type = "text", id, className, ...rest }: InputProps) {
  const uniqueId = useId();
  const inputId = id ? id : uniqueId;
  const classes = classNames(["flex flex-col gap-2", className]);

  return (
    <div className={classes}>
      {label ? (
        <label htmlFor={inputId} className="self-start text-base">
          {label}
        </label>
      ) : null}

      <input
        type={type}
        id={inputId}
        className="block w-full rounded-md border border-primary bg-white p-3 text-base transition hover:border-secondary focus:border-secondary"
        {...(rest as InputHTMLAttributes<HTMLInputElement>)}
      />
    </div>
  );
}

export default Input;
