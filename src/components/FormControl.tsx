
type FormControlProps = {
  className?: string,
  name: string,
  label?: string,
  value: string,
  type?: "text" | "textarea" | "password" | "select",
  options?: { value: string, label: string }[],
  rows?: number,
  setValue: (value: string) => void,
}


const FormControl = ({
  className = "",
  value, setValue,
  label,
  name,
  type = "text",
  options = [],
  rows = 2,
}: FormControlProps) => {

  if (!label) label = name.charAt(0).toUpperCase() + name.slice(1);


  return (
    <div className={`mt-4 ${className}`}>
      <label htmlFor="title" className="block text-md font-medium text-gray-700">
        {label}
      </label>
      {["text", "password"].includes(type) && (
        <input
          type={type}
          name={name}
          id={`input-${name}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      {["textarea"].includes(type) && (
        <textarea
          id={`textarea-${name}`}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={rows}
          className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      {["select"].includes(type) && (
        <select
          id={`select-${name}`}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FormControl;
