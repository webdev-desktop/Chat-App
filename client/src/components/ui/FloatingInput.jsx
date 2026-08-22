export default function FloatingInput({
  label,
  name,
  type = "text",
  placeholder = " ",
  value,
  onChange,
  rows = 4,
  icon: Icon, // Dynamic Icon prop
  ...props
}) {
  const isTextarea = type === "textarea";

  return (
    <div className="relative w-full pt-5 group flex items-center">
      {/* 1. Left Icon Container */}
      {Icon && (
        <div className="absolute left-2 top-[32px] -translate-y-1/2 text-text-muted/60 group-hover:text-brand-cyan transition-colors duration-300">
          {/* <Icon size={18} /> */}
          {Icon}
        </div>
      )}

      {isTextarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
          {...props}
          // Icon होने पर left padding (pl-9) दी गई है
          className={`peer w-full bg-transparent border-b-2 border-white/10 py-2 ${
            Icon ? "pl-9" : "pl-1"
          } text-text-main font-mono text-[clamp(13px,1.5vw,15px)] focus:outline-none focus:border-brand-cyan resize-none transition-all duration-300 dynamic-scrollbar`}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
          // Icon होने पर left padding (pl-9) दी गई है
          className={`peer w-full bg-transparent border-b-2 border-white/10 py-2 ${
            Icon ? "pl-9" : "pl-1"
          } text-text-main font-mono text-[clamp(13px,1.5vw,15px)] focus:outline-none focus:border-brand-cyan shadow-[0_1px_0_rgba(25,25,25,0)] transition-all duration-300`}
        />
      )}

      {/* 2. Floating Label */}
      {/* Icon होने पर डिफ़ॉल्ट रूप से label left-9 पर रहेगा, लेकिन focus/value होने पर left-0 पर आ जाएगा */}
      <label
        className={`absolute top-7 font-mono text-[clamp(13px,1.5vw,15px)] text-text-muted/40 tracking-wide pointer-events-none transition-all duration-300 ease-out 
          ${Icon ? "left-9" : "left-1"}
          group-hover:text-[rgba(18,247,214,0.8)] 
          
          /* When Input/Textarea is focused */ 
          peer-focus:top-0 
          peer-focus:left-0 
          peer-focus:text-[clamp(11px,1.3vw,13px)] 
          peer-focus:text-brand-cyan 
          peer-focus:font-normal 
          
          /* When Input/Textarea has value inside */ 
          peer-not-placeholder-shown:top-0 
          peer-not-placeholder-shown:left-0 
          peer-not-placeholder-shown:text-[clamp(11px,1.3vw,13px)] 
          peer-not-placeholder-shown:text-brand-cyan 
          peer-not-placeholder-shown:font-bold`}
      >
        {Icon} {label}
      </label>
    </div>
  );
}
